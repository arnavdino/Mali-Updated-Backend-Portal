import { BadRequestException, Injectable, Logger, Req, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3, SharedIniFileCredentials } from 'aws-sdk';
import * as sharp from 'sharp';

import { v4 as uuidv4 } from 'uuid';

export interface UploadedIdentityFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;
  size: number;
}

@Injectable()
export class FilesService {
  private s3: S3;
  private identityDocumentsS3: S3;
  private readonly identityDocumentsBucket: string;
  private logger = new Logger(FilesService.name);
  constructor(private configService: ConfigService) {
    const accessKeyId =
      this.configService.get('AWS_ACCESS_KEY_ID') || this.configService.get('ACCESS_KEY');
    const secretAccessKey =
      this.configService.get('AWS_SECRET_ACCESS_KEY') ||
      this.configService.get('AWS_SECRET_KEY');
    const sessionToken = this.configService.get('AWS_SESSION_TOKEN');
    const profile = this.configService.get('AWS_PROFILE');
    const credentials =
      accessKeyId && secretAccessKey
        ? undefined
        : profile
        ? new SharedIniFileCredentials({ profile })
        : undefined;

    const credentialsConfig = {
      accessKeyId,
      secretAccessKey,
      sessionToken,
      credentials,
    };

    this.s3 = new S3({ ...credentialsConfig, region: 'ca-central-1' });
    this.identityDocumentsS3 = new S3({
      ...credentialsConfig,
      region: this.configService.get('IDENTITY_DOCUMENTS_REGION') || 'af-south-1',
    });
    this.identityDocumentsBucket =
      this.configService.get('IDENTITY_DOCUMENTS_BUCKET') ||
      'finex-mali-private-documents';
  }

  async getImage(res, name: string) {
    try {
      var options = {
        Bucket: 'halal-buket',
        Key: `images/${name}`,
      };

      var fileStream = this.s3
        .getObject(options)
        .createReadStream()
        .on('error', (error) => {
          res.status(500).json(`Failed to get image file: ${error.message}`);
        });
      fileStream.pipe(res);
    } catch (error) {
      res.status(500).json(`Failed to get image file: ${error.message}`);
    }
  }

  async getEmail(name: string): Promise<string> {
    try {
      var options = {
        Bucket: 'halal-buket',
        Key: `emails/${name}.html`,
      };
      this.logger.log('getting email');
      var fileStream = await this.s3.getObject(options).createReadStream();
      const chunks = [];
      await new Promise((resolve, reject) => {
        fileStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        fileStream.on('error', (err) => reject(err));
        fileStream.on('end', () =>
          resolve(Buffer.concat(chunks).toString('utf8')),
        );
      });
      return chunks.join('');
    } catch (error) {
      this.logger.error('error getting email', error);
      return '<h1>hi</h1>';
    }
  }

  uploadToAWS(props) {
    return new Promise((resolve, reject) => {
      this.s3.upload(props, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
  async sharpify(originalFile, resize: boolean) {
    try {
      const image = sharp(originalFile.buffer);
      const meta = await image.metadata();
      const { format } = meta;
      if (!format || !(typeof format == 'function')) {
        return [originalFile, 0, 0];
      }

      const newFile = resize
        ? await image[format]({ quality: 80 })
            .resize({
              width: 500,

              fit: 'contain',
            })
            .withMetadata()
        : await await image[format]({ quality: 90 })
            .resize({
              width: 500,

              fit: 'contain',
            })
            .withMetadata();
      const { width, height } = await newFile.metadata();

      return [newFile, width, height];
    } catch (err) {
      throw new Error(err);
    }
  }

  async fileupload(@Res() res, afterUpload: Function, file, folder = 'images') {
    if (file) {
      try {
        const originalFile = file;

        const newFile = (await this.sharpify(originalFile, true))[0];
        let random = uuidv4();
        let newName = `${folder}/${random}_${originalFile.originalname}`;
        newName = newName
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/ /g, '');
        await this.uploadToAWS({
          Body: newFile.buffer,
          Bucket: 'halal-buket',
          ACL: 'private',
          ContentType: originalFile.mimetype,
          Key: newName,
        });

        return afterUpload(`${process.env.SERVER_URL}/${newName}`)
          .then((a) =>
            res.status(201).json(`${process.env.SERVER_URL}/${newName}`),
          )
          .catch((error) =>
            res.status(500).json(`Failed to run after upload: ${error}`),
          );
      } catch (error) {
        console.log(error);
        return res.status(500).json(`Failed to upload image file: ${error}`);
      }
    } else {
      return res.status(500).json(`Failed to  upload file`);
    }
  }

  async uploadIdentityDocument(
    file: UploadedIdentityFile,
    userId: string,
    documentType: string,
  ): Promise<string> {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    const maxFileSize = 10 * 1024 * 1024;

    if (!file || !allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPG, PNG, and PDF identity documents are allowed');
    }
    if (file.size > maxFileSize) {
      throw new BadRequestException('Identity documents must be 10 MB or smaller');
    }

    const extension = file.mimetype === 'application/pdf' ? 'pdf' : file.mimetype.split('/')[1];
    const key = `identity-documents/${userId}/${documentType}-${uuidv4()}.${extension}`;
    await this.uploadIdentityDocumentToAWS({
      Body: file.buffer,
      Bucket: this.identityDocumentsBucket,
      ContentType: file.mimetype,
      Key: key,
      ServerSideEncryption: 'AES256',
    });
    return key;
  }

  getPrivateDocumentUrl(key: string): string {
    return this.identityDocumentsS3.getSignedUrl('getObject', {
      Bucket: this.identityDocumentsBucket,
      Key: key,
      Expires: 300,
    });
  }

  async deletePrivateDocument(key: string): Promise<void> {
    await this.identityDocumentsS3
      .deleteObject({ Bucket: this.identityDocumentsBucket, Key: key })
      .promise();
  }

  private uploadIdentityDocumentToAWS(props: S3.PutObjectRequest) {
    return this.identityDocumentsS3.upload(props).promise();
  }

  async uploadImages(images, folder = 'images', resize = true) {
    let imagesUrls = [];
    let ratios: number[] = [];
    for (let image of images) {
      try {
        const originalFile = image;

        const [newFile, width, height] = await this.sharpify(
          originalFile,
          resize,
        );

        let random = uuidv4();
        let newName = `${folder}/${random}_${originalFile.originalname}`;
        await this.uploadToAWS({
          Body: newFile,
          Bucket: 'halal-buket',
          ACL: 'private',
          ContentType: originalFile.mimetype,
          Key: newName,
        });
        imagesUrls.push(`${this.configService.get('SERVER_URL')}/${newName}`);
        ratios.push(Math.ceil(height / width));
      } catch (error) {
        this.logger.error('Couldnt load image', error);
        throw Error(`Couldnt load image`);
      }
    }

    return { imagesUrls, ratios };
  }
}
