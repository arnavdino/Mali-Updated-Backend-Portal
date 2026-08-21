import { HelpersService } from 'src/helpers/helpers.service';
import { UsersService } from './users.service';
import { EditUserDTO } from './edit-user.dto';
import { FilesService } from 'src/common/file/files.service';
export declare class UserController {
    private readonly userService;
    private readonly appService;
    private readonly fileService;
    private readonly logger;
    constructor(userService: UsersService, appService: HelpersService, fileService: FilesService);
    getUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    uploadItem(req: any, res: any, file: any): Promise<any>;
    updateInfo(req: any, res: any, payload: EditUserDTO): Promise<import("../app-type").AppResponse>;
    deleteUser(req: any, res: any): Promise<import("../app-type").AppResponse>;
    deleteCard(req: any, res: any): Promise<import("../app-type").AppResponse>;
}
