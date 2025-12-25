import {bookmarkService} from '../services/bookmark.service'
import {Request,Response} from 'express'
import {BookmarkSchema} from '../validators/bookmark.schema'

export const createBookmark = async (req: Request, res: Response) => {
  const data = BookmarkSchema.parse(req.body);
  const bookmark = await bookmarkService.create((req as any).user.userId, data);
  return res.status(200).json(bookmark);
};

export const deleteBookmark = async (req: Request, res: Response) => {
  const { id } = req.params;
  const bookmark = await bookmarkService.delete((req as any).user.userId, id);
  return res.status(200).json({ message: "deleted successfully", bookmark });
};

export const getAllBookmarks = async (req: Request, res: Response) => {
  const data = await bookmarkService.getAll((req as any).user.userId);
  res.json(data);
};