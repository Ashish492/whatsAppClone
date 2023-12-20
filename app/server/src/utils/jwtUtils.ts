import { JWTPayload } from '@models';
import jwt from 'jsonwebtoken';
export const signJWT = async (object: Object, options?: jwt.SignOptions) => {
  return jwt.sign(object, process.env.JWT_SECRET, {
    ...options,
    algorithm: 'RS256',
  });
};
export const verifyJwt = async (token: string) => {
  try {
    const decoded = (await jwt.verify(token, process.env.JWT_SECRET, { algorithms: ['RS256'] })) as JWTPayload;
    return { decoded, expired: false, valid: true };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
};
