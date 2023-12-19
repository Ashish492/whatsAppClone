import passport from 'passport';
import { Strategy, StrategyOptionsWithRequest } from 'passport-google-oauth20';
import { User } from '@prisma/client';
import { db } from '@db';
const options: StrategyOptionsWithRequest = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email'],
  passReqToCallback: true,
};
passport.use(
  new Strategy(options, async (_req, _accessToken, _refreshToken, profile, done) => {
    try {
      const defaultUser: Omit<User, 'id'> = {
        email: profile.emails![0].value,
        name: `${profile.name?.givenName} ${profile.name?.familyName}`,
        googleId: profile.id,
        profilePic: profile.photos![0].value,
      };
      const user = await db.user.upsert({
        create: defaultUser,
        update: defaultUser,
        where: {
          googleId: defaultUser.googleId,
        },
      });
      done(null, user);
    } catch (error) {
      done(error as Error);
    }
  })
);
passport.serializeUser((user, done) => {
  done(null, (user as User).id);
});

passport.deserializeUser((id, done) => {
  console.log('called', id);
  db.user
    .findUnique({
      where: {
        id: id as number,
      },
    })
    .then(user => done(null, user))
    .catch(err => done(err));
});
export function initializePassport() {
  return passport.initialize();
}
export function auth() {
  return passport.authenticate('google', {
    scope: ['profile', 'email'],
  });
}
export default passport;
