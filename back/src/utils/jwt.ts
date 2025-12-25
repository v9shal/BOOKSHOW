import jwt from 'jsonwebtoken';
import { config } from '../config/env';
export const signToken = (userId: string, email: string) => {
  return jwt.sign(
    { userId, email }, 
    config.JWT_SECRET, 
    { expiresIn: '7d' }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.JWT_SECRET) as { id: string };
};