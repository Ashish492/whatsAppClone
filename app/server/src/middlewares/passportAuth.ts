import { JWTPayload } from '@models';
import createHttpError from 'http-errors';
import passport from 'passport';
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv-safe';
dotenv.config();
const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
  algorithms: ['RS256'],
};
passport.use(
  new Strategy(options, async (payload: JWTPayload, done) => {
    try {
      //   const session = await SessionModel.findOne({
      //     _id: payload.session,
      //     valid: true,
      //   });
      let user = true;
      if (user) {
        return done(null, payload);
      }
      throw new Error();
    } catch (error) {
      return done(new createHttpError[401]('unauthorize'), false);
    }
  })
);
export function initializePassport() {
  return passport.initialize();
}
export function auth() {
  return passport.authenticate('jwt', { session: false });
}
export default passport;
