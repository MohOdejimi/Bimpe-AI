import Business from '../models/Business.js';

/**
 * GET /api/business/profile
 * Get active business profile
 */
export const getProfile = async (req, res) => {
  try {
    const business = await Business.findOne().sort({ createdAt: -1 });

    if (!business) {
      return res.status(404).json({ message: 'No business profile found. Start a scout session to set one up.' });
    }

    return res.status(200).json(business);
  } catch (error) {
    console.error('Error fetching business profile:', error);
    return res.status(500).json({ error: 'Failed to fetch business profile', details: error.message });
  }
};

export default {
  getProfile,
};
