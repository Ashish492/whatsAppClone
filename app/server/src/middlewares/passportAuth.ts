import passport from 'passport';
import { Strategy, StrategyOptions } from 'passport-google-oauth20';
import { User } from '@prisma/client';
import { db } from '@db';

const options: StrategyOptions = {
  clientID: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  callbackURL: '/auth/google/callback',
  scope: ['profile', 'email'],
};
passport.use(
  new Strategy(options, async (_accessToken, _refreshToken, profile, done) => {
    try {
      const defaultUser: Omit<User, 'id' | 'isNewUser'> = {
        email: profile.emails![0].value,
        name: `${profile.name?.givenName} ${profile.name?.familyName}`,
        googleId: profile.id,
        profilePic: profile.photos![0].value,
      };
      const user = await db.user.upsert({
        create: { ...defaultUser, isNewUser: true },
        update: { ...defaultUser, isNewUser: false },
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
  db.user
    .findUnique({
      where: {
        id: id as number,
      },
    })
    .then(user => done(null, user))
    .catch(err => done(err, null));
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
