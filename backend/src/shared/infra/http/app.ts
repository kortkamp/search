import 'reflect-metadata';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { engine } from 'express-handlebars';
import 'express-async-errors';
import { createServer } from 'http';
import path from 'path';

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

// view engine
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set(
  'views',
  path.join(__dirname, '..', '..', '..', 'modules', 'search', 'views'),
);

app.use('/public', express.static(`${__dirname}/public`));

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

// app.get('/', (req, res) => {
//   return res.send('Search Engine API- 2023');
// });

export { server };
