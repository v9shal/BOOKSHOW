import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import {authMiddleware} from '../middlewares/auth.middleware'
import {getCurrentUser} from '../controllers/auth.controller'
import {logout} from '../controllers/auth.controller'
const router = Router();
router.post('/register', register);
router.post('/login', login);
router.get('/me',authMiddleware,getCurrentUser)
router.post('/logout',logout);

export default router;
