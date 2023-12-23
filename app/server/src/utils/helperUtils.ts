import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { Controller, MyRequest } from '@models';
// eslint-disable-next-line import/no-unresolved
import * as core from 'express-serve-static-core';
import { ZodError } from 'zod';

type basicFun<P extends core.ParamsDictionary = {}, Q extends core.Query = {}> = (
  // eslint-disable-next-line no-unused-vars
  req: Request<P, any, any, Q>,
  // eslint-disable-next-line no-unused-vars
  res: Response<any>,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction
) => any;
export function asyncErrorHandler<B, P extends core.ParamsDictionary, Q extends core.Query>(
  fn: Controller<B, P, Q>
): basicFun<P, Q> {
  return (req, res, next) => {
    fn(req as MyRequest<B, P, Q>, res, next).catch(next);
  };
}
export const errorHandler = async <T>(fn: (..._args: any[]) => T, msg?: string): Promise<T | void> => {
  try {
    return fn();
  } catch (error) {
    throw createHttpError(500, msg ?? 'internal server Error', { cause: error });
  }
};
export const routeErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  if (err instanceof ZodError) {
    res.status(400);
    return res.json(err.issues);
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(401).send('Invalid token');
  }
  res.status(err?.statusCode ?? err?.code ?? 500);
  return res.json({
    success: false,
    message: err.message ?? 'failed',
  });
};
