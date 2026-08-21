import { ConfigService } from '@nestjs/config';

const JWT_SECRET_KEYS = ['JWT_SECRET', 'SECRET_KEY', 'JWT_KEY'] as const;

export function getJwtSecret(configService?: ConfigService): string | undefined {
  for (const key of JWT_SECRET_KEYS) {
    const value = configService?.get<string>(key) ?? process.env[key];
    if (value) {
      return value;
    }
  }

  return undefined;
}

export function requireJwtSecret(configService?: ConfigService): string {
  const secret = getJwtSecret(configService);

  if (!secret) {
    throw new Error(
      'Missing JWT secret. Set one of JWT_SECRET, SECRET_KEY, or JWT_KEY before starting the app.',
    );
  }

  return secret;
}
