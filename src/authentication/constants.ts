import { SetMetadata } from '@nestjs/common';
import { getJwtSecret } from './jwt.config';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

// this is used for token secret.
export const jwtConstants = {
  secret: getJwtSecret(),
};
