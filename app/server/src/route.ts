import { authRoute, userRoute } from '@routes';
import { routeErrorHandler } from '@utils';
import { Application, NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

export default function routes(app: Application) {
  app.use('/auth', authRoute);
  app.use('/user', userRoute);
  app.use('*', (req: Request, res: Response, next: NextFunction) => {
    next(new createHttpError.NotFound());
  });
  app.use(routeErrorHandler);
}
