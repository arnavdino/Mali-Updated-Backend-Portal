"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const typeorm_1 = require("@nestjs/typeorm");
const otp_entity_1 = require("./otp.entity");
const typeorm_2 = require("typeorm");
const permissions_1 = require("../permissions/permissions");
let AuthService = class AuthService {
    constructor(userService, jwtService, otpRepository) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.otpRepository = otpRepository;
    }
    async validateUser(username, pass) {
        return await this.userService.checkUser(username, pass);
    }
    async login(user) {
        if (!user.verified) {
            await this.createCode(user.email);
            throw new Error('User not verified!');
        }
        const payload = { username: user.email, role: user.role, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            permissions: permissions_1.permissions,
        };
    }
    async register(user) {
        await this.userService.register(user);
        await this.createCode(user.email);
    }
    async verify(email, code) {
        let otp = await this.verifyCode(email, code);
        let user = await this.userService.verifyUser(email);
        await this.deleteCode(otp);
        return await this.login(user);
    }
    async verifyCode(email, code) {
        let otp = await this.otpRepository.findOne({
            where: { email, code },
        });
        if (!otp || +otp.created + 300000 < new Date().valueOf()) {
            throw Error('Invalid validation code!');
        }
        return otp;
    }
    async deleteCode(otp) {
        await this.otpRepository.delete(otp);
    }
    async createCode(email) {
        let otp = await this.otpRepository.findOne({ where: { email } });
        if (!otp) {
            otp = new otp_entity_1.Otp();
        }
        otp.created = new Date().valueOf();
        otp.code = `${Math.floor(Math.random() * 900000) + 100000}`;
        otp.email = email;
        this.otpRepository.save(otp);
    }
    async createCodeForReset(email) {
        let user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw Error('invalid user email');
        }
        await this.createCode(email);
    }
    async resetPassword(email, code, password) {
        let otp = await this.verifyCode(email, code);
        await this.userService.resetPassword(email, password);
        await this.deleteCode(otp);
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(otp_entity_1.Otp)),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        typeorm_2.Repository])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map