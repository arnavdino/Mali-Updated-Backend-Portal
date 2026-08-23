import { RoleService } from './role.service';
import { HelpersService } from '../helpers/helpers.service';
import { RoleDto } from './role.dto';
export declare class RoleController {
    private readonly roleService;
    private readonly appService;
    private readonly logger;
    constructor(roleService: RoleService, appService: HelpersService);
    createRole(role: RoleDto, req: any, res: any): Promise<import("../app-type").AppResponse>;
    editRole(role: RoleDto, req: any, res: any): Promise<import("../app-type").AppResponse>;
    deleteRole(req: any, res: any): Promise<import("../app-type").AppResponse>;
    getRole(req: any, res: any): Promise<import("../app-type").AppResponse>;
    getRoles(req: any, res: any): Promise<import("../app-type").AppResponse>;
}
