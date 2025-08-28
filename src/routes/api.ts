import { Router } from 'express';
import { Request, Response } from 'express';
import { getAll, getById, create, updateById, deleteById } from '../store';

const router = Router();

// GET /api/v1/whisper
router.get('/', async (req: Request, res: Response) => {
  const whisper = await getAll();
  res.json(whisper);
});

// GET /api/v1/whisper/:id
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id || '0');
  const whisper = await getById(id);
  if (!whisper) {
    res.sendStatus(404);
  } else {
    res.json(whisper);
  }
});

// POST /api/v1/whisper
router.post('/', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    res.sendStatus(400);
  } else {
    const whisper = await create(message);
    res.status(201).json(whisper);
  }
});

// PUT /api/v1/whisper/:id
router.put('/:id', async (req: Request, res: Response) => {
  const { message } = req.body;
  const id = parseInt(req.params.id || '0');
  if (!message) {
    res.sendStatus(400);
  } else {
    const whisper = await getById(id);
    if (!whisper) {
      res.sendStatus(404);
    } else {
      await updateById(id, message);
      res.sendStatus(200);
    }
  }
});

// DELETE /api/v1/whisper/:id
router.delete('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id || '0');
  const whisper = await getById(id);
  if (!whisper) {
    res.sendStatus(404);
  } else {
    await deleteById(id);
    res.sendStatus(200);
  }
});

export default router;
