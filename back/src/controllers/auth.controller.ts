import { Request, Response } from 'express';
import { authService } from '../services/auth.service';
import { registerSchema } from '../validators/auth.schema';

interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    name?: string;
    role?: string;
  };
}
export const register = async (req: Request, res: Response) => {
  const data = registerSchema.parse(req.body);
  const token = await authService.register(data);
  res.status(201).json({ token });
};

export const login = async (req: Request, res: Response) => {
  const {token,user} = await authService.login(req.body.email, req.body.password);
 res.cookie('token', token, {
  httpOnly: true,
  secure: false,        
  sameSite: 'lax',      
  maxAge: 7 * 24 * 60 * 60 * 1000,
});

  res.json({ token ,user  });
};


export const getCurrentUser = async (req: Request, res: Response) => {
  const authReq = req as AuthRequest;
  res.json({ user: authReq.user });
};

export const logout =async(req:Request,res:Response)=>{
  res.clearCookie('token');
  res.json({message:"logout successfully"});
}