import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { signToken } from '../utils/jwt';
import { config } from '../config/env';
import { registerSchema, loginSchema } from '../validators/auth.schema';

interface AuthRequest extends Request {
  user?: {
  id: string;
  };
}
const cookieOptions = {
  httpOnly: true,
  secure: config.NODE_ENV === 'production',
  sameSite: config.NODE_ENV === 'production' ? 'none' as const : 'lax' as const,
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = registerSchema.parse(req.body);
    const user = await AuthService.register(data);
    res.cookie('jwt', signToken(user.id,data.email), cookieOptions);
    res.status(201).json({ user });
  } catch (e) { next(e); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = loginSchema.parse(req.body);
    const user = await AuthService.login(data);
    res.cookie('jwt', signToken(user.id,data.email), cookieOptions);
    res.json({ user });
  } catch (e) { next(e); }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out' });
};

export const getMe = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  res.json({ user: authReq.user });
};

