import { JwtService } from '@nestjs/jwt';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { UserDTO } from '../users/user.dto';
import { Otp } from './otp.entity';
import { Repository } from 'typeorm';
export declare class AuthService {
    private readonly userService;
    private jwtService;
    private otpRepository;
    constructor(userService: UsersService, jwtService: JwtService, otpRepository: Repository<Otp>);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
        permissions: import("../permissions/permissions").Permission[];
    }>;
    register(user: UserDTO): Promise<void>;
    verify(email: string, code: string): Promise<{
        access_token: string;
        permissions: import("../permissions/permissions").Permission[];
    }>;
    verifyCode(email: string, code: string): Promise<Otp>;
    deleteCode(otp: Otp): Promise<void>;
    createCode(email: string): Promise<void>;
    createCodeForReset(email: string): Promise<void>;
    resetPassword(email: string, code: string, password: string): Promise<void>;
}
