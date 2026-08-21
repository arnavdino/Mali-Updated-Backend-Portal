import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { FilesService } from 'src/common/file/files.service';
export declare enum EmailType {
    RECEIPT = "receipt",
    REJECTED = "rejected",
    CANCELLATION = "cancellation",
    SUBSCRIPTION = "subscription",
    CONFIRMATION = "order-confirm",
    SUBSCRIPTION_OWNER = "subscription-owner",
    INFO = "info",
    SUBSCRIPTION_ACCEPTED = "subsc-accepted",
    SUBSCRIPTION_PICKED = "subsc-picked",
    RECEIPT_PICK = "receipt-pick"
}
export declare class EmailService {
    private readonly configService;
    private readonly fileService;
    private readonly logger;
    constructor(configService: ConfigService, fileService: FilesService);
    typeMapper: {
        cancellation: string;
        receipt: string;
        "receipt-pick": string;
        rejected: string;
        "subsc-picked": string;
        subscription: string;
        "subscription-owner": string;
        "order-confirm": string;
        "subsc-accepted": string;
    };
    send(email: string, type: EmailType, replaceString: {
        [key: string]: string;
    }): Promise<[SendGrid.ClientResponse, {}]>;
}
