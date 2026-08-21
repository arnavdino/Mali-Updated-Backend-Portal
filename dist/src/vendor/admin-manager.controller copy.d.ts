import { HelpersService } from 'src/helpers/helpers.service';
import { ManagerService } from './manager.service';
import { WarehouseManagerDTO } from './warehouse-manger.dto';
export declare class AdminManagerController {
    private readonly managerService;
    private readonly appService;
    private readonly logger;
    constructor(managerService: ManagerService, appService: HelpersService);
    getAll(req: any, res: any, filter: string, rowsPerPage: number, page: number): Promise<import("../app-type").AppResponse>;
    getUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    deleteUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    updateStatuses(req: any, res: any, payload: {
        ids: string[];
        status: string;
    }): Promise<import("../app-type").AppResponse>;
    create(req: any, res: any, manager: WarehouseManagerDTO): Promise<import("../app-type").AppResponse>;
    update(req: any, res: any, manager: WarehouseManagerDTO): Promise<import("../app-type").AppResponse>;
}
