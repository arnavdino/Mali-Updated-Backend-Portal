import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/create-purchase.dto';
import { HelpersService } from 'src/helpers/helpers.service';
export declare class PurchaseAdminController {
    private readonly purchaseService;
    private readonly helpersService;
    private logger;
    constructor(purchaseService: PurchaseService, helpersService: HelpersService);
    findAll(res: any, req: any, from: string, to: string, type: string, customer: string, id: string, state: string, page: number, rowsPerPage: number): Promise<import("../app-type").AppResponse>;
    ginfCategories(res: any, req: any): Promise<import("../app-type").AppResponse>;
    getStatuses(res: any, req: any): Promise<import("../app-type").AppResponse>;
    findOne(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    initiateRefund(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    declineRefund(id: string, res: any, req: any, body: {
        notes: string;
    }): Promise<import("../app-type").AppResponse>;
    confirmRefund(id: string, res: any, req: any, body: {
        notes: string;
    }): Promise<import("../app-type").AppResponse>;
    update(id: string, updatePurchaseDto: PurchaseDto, res: any, req: any): Promise<import("../app-type").AppResponse>;
    remove(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
}
