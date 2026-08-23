import { VendorService } from './vendor.service';
import { VendorDTO } from './vendor.dto';
import { HelpersService } from 'src/helpers/helpers.service';
export declare class AdminVendorController {
    private readonly vendorService;
    private readonly appService;
    private readonly logger;
    constructor(vendorService: VendorService, appService: HelpersService);
    search(search: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    getVendors(req: any, res: any, filter: string, rowsPerPage: number, page: number): Promise<import("../app-type").AppResponse>;
    getUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    deleteUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    updateUsers(req: any, res: any, payload: {
        ids: string[];
        status: string;
    }): Promise<import("../app-type").AppResponse>;
    create(req: any, res: any, vendor: VendorDTO): Promise<import("../app-type").AppResponse>;
    update(req: any, res: any, vendor: VendorDTO): Promise<import("../app-type").AppResponse>;
}
