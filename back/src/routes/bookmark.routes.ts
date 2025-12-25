import { Router } from 'express';
import * as Book from '../controllers/bookmark.controller';
import {authMiddleware}  from '../middlewares/auth.middleware';

const router = Router();
router.use(authMiddleware);
router.post('/', Book.createBookmark);
router.get('/', Book.getAllBookmarks);
router.delete('/:id', Book.deleteBookmark);
export default router;