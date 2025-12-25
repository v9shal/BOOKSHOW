import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../utils/ApiError";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token; 

  if (!token) {
    throw new ApiError(401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as any;
    (req as any).user = { userId: decoded.userId }; 
    next();
  } catch {
    throw new ApiError(401, "Invalid token");
  }
};
