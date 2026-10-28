import { ConfigService } from '@nestjs/config';
export declare function getJwtSecret(configService?: ConfigService): string | undefined;
export declare function requireJwtSecret(configService?: ConfigService): string;
