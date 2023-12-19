import { Controller } from '@models';
import createHttpError from 'http-errors';
export const authUser: Controller = (req, res) => {
  console.log(req);
  if (!req.user) throw new createHttpError[401]('unauthorize');
};
