import express from 'express';
import { startScout } from '../controllers/scout.controller.js';

const router = express.Router();

// POST /api/scout/start
router.post('/start', startScout);

export default router;
