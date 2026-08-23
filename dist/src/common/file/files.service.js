"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var FilesService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const aws_sdk_1 = require("aws-sdk");
const sharp = require("sharp");
const uuid_1 = require("uuid");
let FilesService = FilesService_1 = class FilesService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(FilesService_1.name);
        this.s3 = new aws_sdk_1.S3({
            accessKeyId: this.configService.get('ACCESS_KEY'),
            secretAccessKey: this.configService.get('AWS_SECRET_KEY'),
            region: 'ca-central-1',
        });
    }
    async getImage(res, name) {
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
        }
        catch (error) {
            res.status(500).json(`Failed to get image file: ${error.message}`);
        }
    }
    async getEmail(name) {
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
                fileStream.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
            });
            return chunks.join('');
        }
        catch (error) {
            this.logger.error('error getting email', error);
            return '<h1>hi</h1>';
        }
    }
    uploadToAWS(props) {
        return new Promise((resolve, reject) => {
            this.s3.upload(props, (err, data) => {
                if (err)
                    reject(err);
                resolve(data);
            });
        });
    }
    async sharpify(originalFile, resize) {
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
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async fileupload(res, afterUpload, file, folder = 'images') {
        if (file) {
            try {
                const originalFile = file;
                const newFile = (await this.sharpify(originalFile, true))[0];
                let random = (0, uuid_1.v4)();
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
                    .then((a) => res.status(201).json(`${process.env.SERVER_URL}/${newName}`))
                    .catch((error) => res.status(500).json(`Failed to run after upload: ${error}`));
            }
            catch (error) {
                console.log(error);
                return res.status(500).json(`Failed to upload image file: ${error}`);
            }
        }
        else {
            return res.status(500).json(`Failed to  upload file`);
        }
    }
    async uploadImages(images, folder = 'images', resize = true) {
        let imagesUrls = [];
        let ratios = [];
        for (let image of images) {
            try {
                const originalFile = image;
                const [newFile, width, height] = await this.sharpify(originalFile, resize);
                let random = (0, uuid_1.v4)();
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
            }
            catch (error) {
                this.logger.error('Couldnt load image', error);
                throw Error(`Couldnt load image`);
            }
        }
        return { imagesUrls, ratios };
    }
};
__decorate([
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Function, Object, Object]),
    __metadata("design:returntype", Promise)
], FilesService.prototype, "fileupload", null);
FilesService = FilesService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], FilesService);
exports.FilesService = FilesService;
//# sourceMappingURL=files.service.js.map