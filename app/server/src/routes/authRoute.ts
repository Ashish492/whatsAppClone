import { loginFailed, loginSuccess } from '@controllers';
import { auth, authUser } from '@middlewares';
import { controller } from '@utils';
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
authRoute.get('/login/success', authUser, controller(loginSuccess));
authRoute.get('/login/failure', controller(loginFailed));
export default authRoute;
