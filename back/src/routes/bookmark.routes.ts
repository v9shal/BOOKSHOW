import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import * as controller from '../controllers/bookmark.controller';

const router = Router();
router.use(authMiddleware);

router.post('/', controller.createBookmark);
router.get('/', controller.getAllBookmarks);
router.delete('/:id', controller.deleteBookmark);

export default router;
