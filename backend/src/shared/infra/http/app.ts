import 'reflect-metadata';
import 'dotenv/config';
import upload from '@config/upload';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import { createServer } from 'http';

import { logger } from '@shared/utils/logger';

import errorHandling from './middlewares/errorHandling';
import { morganMiddleware } from './middlewares/morganMiddleware';
// import rateLimiter from './middlewares/rateLimiter';
import { routes } from './routes';
import AllowedOrigins from './routes/allowedOrigins';

import '@shared/container';

const app = express();
const server = createServer(app);

app.use(cookieParser());

app.use(morganMiddleware);

// app.use(rateLimiter);

if (process.env.ENVIRONMENT === 'local') {
  AllowedOrigins.addOrigin('http://localhost:5173');
  AllowedOrigins.addOrigin('http://localhost:3000');
}

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (AllowedOrigins.authorizeOrigin(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);

app.use(express.json());

app.use(routes);

app.use(errorHandling);

app.get('/', (req, res) => {
  return res.send('Search Engine API- 2023');
});

export { server };
