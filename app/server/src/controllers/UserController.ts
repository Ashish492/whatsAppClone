import { User as UserI } from 'shared';
import { MyRequest } from '@models';
import { NextFunction, Response } from 'express';
import { AsyncHandler } from '@decorators';

function sleep() {
  return new Promise((res, rej) => {
    setTimeout(() => rej(new Error('hello')), 3000);
  });
}
export default class UserController {
  @AsyncHandler<UserI>()
  static async postUser(req: MyRequest<UserI>, res: Response, _next: NextFunction) {
    await sleep();
    res.json({ success: true });
  }
}
