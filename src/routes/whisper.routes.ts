import { Router } from 'express';
import { Request, Response } from 'express';
import { getAll, getById, create, updateById, deleteById } from '../store';

const router = Router();

/**
 * @openapi
 * components:
 *   schemas:
 *     Whisper:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         message:
 *           type: string
 *           example: "Hello World"
 */

/**
 * @openapi
 * /api/v1/whisper:
 *   get:
 *     summary: Get all whispers
 *     tags: [Whisper]
 *     responses:
 *       200:
 *         description: List of whispers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Whisper'
 */
router.get('/', async (req: Request, res: Response) => {
  const whisper = await getAll();
  res.json(whisper);
});

/**
 * @openapi
 * /api/v1/whisper/{id}:
 *   get:
 *     summary: Get whisper by ID
 *     tags: [Whisper]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Whisper found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Whisper'
 *       404:
 *         description: Whisper not found
 */
router.get('/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id || '0');
  const whisper = await getById(id);
  if (!whisper) {
    res.sendStatus(404);
  } else {
    res.json(whisper);
  }
});

/**
 * @openapi
 * /api/v1/whisper:
 *   post:
 *     summary: Create new whisper
 *     tags: [Whisper]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "This is a new whisper"
 *     responses:
 *       201:
 *         description: Whisper created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Whisper'
 *       400:
 *         description: Invalid request (missing message)
 */
router.post('/', async (req: Request, res: Response) => {
  const { message } = req.body;
  if (!message) {
    res.sendStatus(400);
  } else {
    const whisper = await create(message);
    res.status(201).json(whisper);
  }
});

/**
 * @openapi
 * /api/v1/whisper/{id}:
 *   put:
 *     summary: Update whisper by ID
 *     tags: [Whisper]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: "Updated whisper message"
 *     responses:
 *       200:
 *         description: Whisper updated
 *       400:
 *         description: Invalid request (missing message)
 *       404:
 *         description: Whisper not found
 */
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

/**
 * @openapi
 * /api/v1/whisper/{id}:
 *   delete:
 *     summary: Delete whisper by ID
 *     tags: [Whisper]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Whisper deleted
 *       404:
 *         description: Whisper not found
 */
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
