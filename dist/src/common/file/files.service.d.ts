/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export interface UploadedIdentityFile {
    buffer: Buffer;
    mimetype: string;
    originalname: string;
    size: number;
}
export declare class FilesService {
    private configService;
    private s3;
    private identityDocumentsS3;
    private readonly identityDocumentsBucket;
    private logger;
    constructor(configService: ConfigService);
    getImage(res: any, name: string): Promise<void>;
    getEmail(name: string): Promise<string>;
    uploadToAWS(props: any): Promise<unknown>;
    sharpify(originalFile: any, resize: boolean): Promise<any[]>;
    fileupload(res: any, afterUpload: Function, file: any, folder?: string): Promise<any>;
    uploadIdentityDocument(file: UploadedIdentityFile, userId: string, documentType: string): Promise<string>;
    getPrivateDocumentUrl(key: string): string;
    private uploadIdentityDocumentToAWS;
    uploadImages(images: any, folder?: string, resize?: boolean): Promise<{
        imagesUrls: any[];
        ratios: number[];
    }>;
}
