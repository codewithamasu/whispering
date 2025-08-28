import { Router } from 'express';
import { Request, Response } from 'express';
import { getAll } from '../store';

const router = Router();

// GET /about
router.get('/about', async (req: Request, res: Response) => {
  const whispers = await getAll();
  res.render('about', { whispers });
});

export default router;
