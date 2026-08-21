import { ConfigService } from '@nestjs/config';
export declare class FilesService {
    private configService;
    private s3;
    private logger;
    constructor(configService: ConfigService);
    getImage(res: any, name: string): Promise<void>;
    getEmail(name: string): Promise<string>;
    uploadToAWS(props: any): Promise<unknown>;
    sharpify(originalFile: any, resize: boolean): Promise<any[]>;
    fileupload(res: any, afterUpload: Function, file: any, folder?: string): Promise<any>;
    uploadImages(images: any, folder?: string, resize?: boolean): Promise<{
        imagesUrls: any[];
        ratios: number[];
    }>;
}
