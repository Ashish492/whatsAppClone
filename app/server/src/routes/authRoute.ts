import { AuthController } from '@controllers';
import { AuthMiddleware, auth } from '@middlewares';
import { Router } from 'express';
import passport from 'passport';

const authRoute = Router();
authRoute.get('/', (req, res) => res.send('hello'));
authRoute.get('/login/google', auth());
const successLoginUrl = 'http://localhost:5173';
authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: successLoginUrl,
    failureRedirect: '/auth/login/failure',
  })
);
authRoute.get('/login/success', AuthMiddleware.authUser, AuthController.loginSuccess);
authRoute.get('/login/failure', AuthController.loginFailed);
export default authRoute;
