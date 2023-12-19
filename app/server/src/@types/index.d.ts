import { User } from 'shared';
declare module 'express-serve-static-core' {
  export interface Request {
    user?: User;
  }
}
