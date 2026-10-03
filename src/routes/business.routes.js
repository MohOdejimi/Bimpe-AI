import express from 'express';
import { getProfile } from '../controllers/business.controller.js';

const router = express.Router();

// GET /api/business/profile
router.get('/profile', getProfile);

export default router;
