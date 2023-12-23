import User from '@controllers/UserController';
import { Router } from 'express';

const userRouter = Router();
userRouter.get('/', User.postUser);
export default userRouter;
