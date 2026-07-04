import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import StatusCodes from 'http-status-codes';

import router from './routes';
import { corsOptions } from './utils/corsOptionsUtils';
import { rateLimiter, cacheMiddleware } from './middlewares/globalMiddleware';

dotenv.config();
const app: Express = express();
const PORT: number = Number(process.env.PORT) || 3000;

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);
app.use(rateLimiter);

app.use('/api', cacheMiddleware, router);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`WEBSITE AUDIT CONSULTANT PLATFORM SERVER IS RUNNING ON PORT ${PORT}`);
});

app.get('**', (req, res) => {
  res.status(StatusCodes.OK).json({ status: StatusCodes.OK, message: 'WELCOME TO THE WEBSITE AUDIT CONSULTANT PLATFORM SERVER.' });
});

export default app;
