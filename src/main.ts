import { Logger, LogLevel, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'source-map-support/register';

async function bootstrap() {
  const port = parseInt(process.env.PORT || '3001', 10);
  const apiPrefix = process.env.API_PREFIX || 'market';
  const logLevel: LogLevel[] =
    process.env.DEBUG == 'true'
      ? ['error', 'warn', 'log', 'debug']
      : ['error', 'warn', 'log'];

  const logger = new Logger('Main');
  const allowedOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction && allowedOrigins.length === 0) {
    throw new Error('CORS_ORIGINS must be configured in production');
  }

  const app = await NestFactory.create(AppModule, {
    logger: 'development' == process.env.NODE_ENV ? new Logger() : console,
    cors: isProduction
      ? { origin: allowedOrigins, methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'] }
      : true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix(apiPrefix);

  await app.listen(port);
  logger.log(`okay we are live on port ${port} with prefix /${apiPrefix}`);
}
bootstrap();
