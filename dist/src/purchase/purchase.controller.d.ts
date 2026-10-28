import { PurchaseService } from './purchase.service';
import { PurchaseDto } from './dto/create-purchase.dto';
import { HelpersService } from 'src/helpers/helpers.service';
export declare class PurchaseController {
    private readonly purchaseService;
    private readonly helpersService;
    private logger;
    constructor(purchaseService: PurchaseService, helpersService: HelpersService);
    create(createPurchaseDto: PurchaseDto, res: any, req: any): Promise<import("../app-type").AppResponse>;
    findAll(res: any, req: any): Promise<import("../app-type").AppResponse>;
    findOne(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    update(id: string, updatePurchaseDto: PurchaseDto, res: any, req: any): Promise<import("../app-type").AppResponse>;
    remove(id: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
}
