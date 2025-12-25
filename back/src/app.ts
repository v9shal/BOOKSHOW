import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import hpp from 'hpp';
import cookieParser from 'cookie-parser';
import pinoHttp from 'pino-http';
import { config } from './config/env';
import { logger } from './lib/logger';
import { errorHandler } from './middlewares/error.middleware';
import authRoutes from './routes/auth.routes';
import bookmarkRoutes from './routes/bookmark.routes';

 export const app = express();

app.use(helmet());
app.use(pinoHttp({ logger }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: config.CLIENT_URL, credentials: true }));
app.use(hpp());

app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);
app.use(errorHandler);

