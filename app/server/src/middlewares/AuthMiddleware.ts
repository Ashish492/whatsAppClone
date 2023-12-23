import { Controller } from '@models';
import createHttpError from 'http-errors';

export default class AuthMiddleware {
  static authUser: Controller = (req, _res, next) => {
    if (req.user) {
      next();
      return;
    }
    throw new createHttpError[401]('unauthorize');
  };
}
