import { UsersService } from './users.service';
import { HelpersService } from 'src/helpers/helpers.service';
import { FilesService } from 'src/common/file/files.service';
import { UserDTO } from './user.dto';
export declare class AdminUserController {
    private readonly userService;
    private readonly appService;
    private readonly fileService;
    private readonly logger;
    constructor(userService: UsersService, appService: HelpersService, fileService: FilesService);
    search(search: string, res: any, req: any): Promise<import("../app-type").AppResponse>;
    getUsers(req: any, res: any, filter: string, isCustomer: boolean, rowsPerPage: number, page: number): Promise<import("../app-type").AppResponse>;
    getUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    getUserVerification(req: any, res: any): Promise<import("../app-type").AppResponse>;
    verifyUser(req: any, res: any, user: any): Promise<import("../app-type").AppResponse>;
    uploadItem(req: any, res: any, file: any): Promise<any>;
    deleteUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    deleteUsers(req: any, res: any, payload: {
        ids: string[];
    }): Promise<import("../app-type").AppResponse>;
    updateUsers(req: any, res: any, payload: {
        ids: string[];
        status: string;
    }): Promise<import("../app-type").AppResponse>;
    create(req: any, res: any, user: UserDTO): Promise<import("../app-type").AppResponse>;
    update(req: any, res: any, user: UserDTO): Promise<import("../app-type").AppResponse>;
}
