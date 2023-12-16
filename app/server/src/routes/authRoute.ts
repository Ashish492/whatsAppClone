import { auth } from '@middlewares';
import { Router } from 'express';
import passport from 'passport';
const authRoute = Router();
authRoute.get('/login/google', auth());
authRoute.get(
  '/google/callback',
  passport.authenticate('google', {
    failureMessage: 'can not login write now try again',
    successRedirect,
  })
);
