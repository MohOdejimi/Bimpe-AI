import express from 'express';
import {
  getLeads,
  getLeadById,
  updateLeadStatus,
} from '../controllers/lead.controller.js';

const router = express.Router();

// GET /api/leads
router.get('/', getLeads);

// GET /api/leads/:id
router.get('/:id', getLeadById);

// PATCH /api/leads/:id/status
router.patch('/:id/status', updateLeadStatus);

export default router;
