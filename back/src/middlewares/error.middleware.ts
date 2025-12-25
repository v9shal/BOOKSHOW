import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { ZodError } from 'zod';
import { logger } from '../lib/logger';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ status: 'error', message: err.message });
  }

  // if (err ) {
  //   return res.status(StatusCodes.BAD_REQUEST).json({
  //     status: 'fail',
  //     errors: err.errors.map(e => ({ path: e.path, message: e.message })),
  //   });
  // }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: 'error',
    message: 'Internal Server Error',
  });
};