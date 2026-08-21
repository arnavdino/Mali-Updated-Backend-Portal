import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey:
        configService.get<string>('JWT_SECRET') ||
        configService.get<string>('SECRET_KEY') ||
        configService.get<string>('JWT_KEY'),
    });
  }

  async validate(payload: any) {
    return { role: payload.role, username: payload.username,id: payload.id };
  }
}
