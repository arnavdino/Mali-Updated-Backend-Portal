"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
require("source-map-support/register");
async function bootstrap() {
    const port = parseInt(process.env.PORT || '3001', 10);
    const apiPrefix = process.env.API_PREFIX || 'market';
    const logLevel = process.env.DEBUG == 'true'
        ? ['error', 'warn', 'log', 'debug']
        : ['error', 'warn', 'log'];
    const logger = new common_1.Logger('Main');
    const allowedOrigins = (process.env.CORS_ORIGINS || '')
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);
    const isProduction = process.env.NODE_ENV === 'production';
    if (isProduction && allowedOrigins.length === 0) {
        throw new Error('CORS_ORIGINS must be configured in production');
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: 'development' == process.env.NODE_ENV ? new common_1.Logger() : console,
        cors: isProduction
            ? { origin: allowedOrigins, methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'] }
            : true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix(apiPrefix);
    await app.listen(port);
    logger.log(`okay we are live on port ${port} with prefix /${apiPrefix}`);
}
bootstrap();
//# sourceMappingURL=main.js.map