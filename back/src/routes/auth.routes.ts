import { Router } from 'express';
import * as Auth from '../controllers/auth.controller';
import  {authMiddleware}  from '../middlewares/auth.middleware';

const router = Router();
router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.post('/logout', Auth.logout);
router.get('/me', authMiddleware, Auth.getMe);
export default router;