import { MyRequest } from '@models';
import { NextFunction, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import { ParamsDictionary, Query } from 'express-serve-static-core';

export type baseFunction<
  B = unknown,
  P extends ParamsDictionary = Record<string, any>,
  Q extends Query = Record<string, any>,
> = (
  // eslint-disable-next-line no-unused-vars
  req: MyRequest<B, P, Q>,
  // eslint-disable-next-line no-unused-vars
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => Promise<any>;
export function AsyncHandler<
  B = unknown,
  P extends ParamsDictionary = Record<string, any>,
  Q extends Query = Record<string, any>,
>() {
  return (target: baseFunction<B, P, Q>, _context: ClassMethodDecoratorContext<unknown, baseFunction<B, P, Q>>) =>
    async function (this: any, req: MyRequest<B, P, Q>, res: Response, next: NextFunction): Promise<any> {
      try {
        await target.call(this, req, res, next);
      } catch (error) {
        next(error);
      }
    };
}
