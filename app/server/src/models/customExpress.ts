import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line import/no-unresolved
import * as core from 'express-serve-static-core';

export interface MyRequest<
  B = unknown,
  P extends core.ParamsDictionary = Record<string, any>,
  Q extends core.Query = Record<string, any>,
> extends Request {
  body: B;
  params: P;
  query: Q;
}
export type Controller<B = unknown, P extends core.ParamsDictionary = {}, Q extends core.Query = {}> = (
  // eslint-disable-next-line no-unused-vars
  req: MyRequest<B, P, Q>,
  // eslint-disable-next-line no-unused-vars
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => any;
