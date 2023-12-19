import express, { type Application } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import routes from './route';
import dotenv from 'dotenv-safe';
import { initializePassport } from '@middlewares';
import passport from 'passport';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { db } from '@db';
const app: Application = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { secure: true, httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 },
    store: new PrismaSessionStore(db, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdFunction: undefined,
      dbRecordIdIsSessionId: true,
    }),
  })
);
app.use(initializePassport());
app.use(passport.session());
routes(app);
export default app;
