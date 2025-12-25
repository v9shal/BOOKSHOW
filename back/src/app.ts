import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import bookmarkRoutes from './routes/bookmark.routes';
import { errorHandler } from './middlewares/error.middleware';
import cookieParser from 'cookie-parser'
export const app = express();

app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, 
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

app.use(errorHandler);
