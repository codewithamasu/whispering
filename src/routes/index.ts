import { Router } from 'express';
import apiRoutes from './api';
import viewRoutes from './views';

const router = Router();

// API routes
router.use('/api/v1/whisper', apiRoutes);

// View routes
router.use('/', viewRoutes);

export default router;
