import { HelpersService } from 'src/helpers/helpers.service';
import { UserDTO } from 'src/users/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    private readonly appService;
    constructor(authService: AuthService, appService: HelpersService);
    private readonly logger;
    login(req: any, res: any): Promise<import("../app-type").AppResponse>;
    register(user: UserDTO, res: any): Promise<import("../app-type").AppResponse>;
    verify(payload: {
        email: string;
        code: string;
    }, res: any): Promise<import("../app-type").AppResponse>;
    createReset(req: any, res: any, params: any): Promise<import("../app-type").AppResponse>;
    resetPassword(req: any, res: any, paylod: {
        email: string;
        code: string;
        password: string;
    }): Promise<import("../app-type").AppResponse>;
}
