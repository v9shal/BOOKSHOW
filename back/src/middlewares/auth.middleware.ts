import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";
import { AppError } from "../utils/AppError";
import { StatusCodes } from "http-status-codes";

interface JwtPayload {
  userId: string;
  email: string;
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new AppError("Authentication required", StatusCodes.UNAUTHORIZED));
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET) as JwtPayload;

    (req as any).user = { 
      id: decoded.userId 
    };

    next();
  } catch (error) {
    return next(new AppError("Invalid or expired token", StatusCodes.UNAUTHORIZED));
  }
};