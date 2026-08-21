import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// this is used for token secret.
export const jwtConstants = {
  secret:
    process.env.JWT_SECRET ||
    process.env.SECRET_KEY ||
    process.env.JWT_KEY,
};
