/**
 * LEAD CONTROLLER
 * Handles lead listing, retrieval by ID, and status updates.
 */

import Lead from '../models/Lead.js';

/**
 * GET /api/leads
 * Get all leads with optional status filter (?status=new|contacted|closed)
 */
export const getLeads = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = {};

    if (status) {
      if (!['new', 'contacted', 'closed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status query filter' });
      }
      filter.status = status;
    }

    const leads = await Lead.find(filter).sort({ createdAt: -1 });
    return res.status(200).json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    return res.status(500).json({ error: 'Failed to fetch leads', details: error.message });
  }
};

/**
 * GET /api/leads/:id
 * Get a single lead by ID
 */
export const getLeadById = async (req, res) => {
  try {
    const { id } = req.params;
    const lead = await Lead.findById(id);

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    return res.status(200).json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    return res.status(500).json({ error: 'Failed to fetch lead', details: error.message });
  }
};

/**
 * PATCH /api/leads/:id/status
 * Update lead status ('new' | 'contacted' | 'closed')
 */
export const updateLeadStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['new', 'contacted', 'closed'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const lead = await Lead.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }

    return res.status(200).json(lead);
  } catch (error) {
    console.error('Error updating lead status:', error);
    return res.status(500).json({ error: 'Failed to update lead status', details: error.message });
  }
};

export default {
  getLeads,
  getLeadById,
  updateLeadStatus,
};
