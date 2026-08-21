import { WarehouseDTO } from './warehouse.dto';
import { HelpersService } from 'src/helpers/helpers.service';
import { WarehouseService } from './warehouse.service';
export declare class AdminWarehouseController {
    private readonly warehouseService;
    private readonly appService;
    private readonly logger;
    constructor(warehouseService: WarehouseService, appService: HelpersService);
    search(search: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    getVendors(req: any, res: any, filter: string, rowsPerPage: number, page: number): Promise<import("../app-type").AppResponse>;
    getUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    deleteUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    updateUsers(req: any, res: any, payload: {
        ids: string[];
        status: string;
    }): Promise<import("../app-type").AppResponse>;
    create(req: any, res: any, warehouse: WarehouseDTO): Promise<import("../app-type").AppResponse>;
    update(req: any, res: any, warehouse: WarehouseDTO): Promise<import("../app-type").AppResponse>;
}
