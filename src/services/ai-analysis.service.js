/**
 * AI ANALYSIS SERVICE
 * Sends post & business profile data to the Flask AI microservice.
 */

import axios from 'axios';

/**
 * Sends post and business parameters to Flask AI microservice.
 * 
 * @param {Object} post 
 * @param {Object} business 
 * @returns {Promise<Object>} Structured AI analysis
 */
export const analyzePost = async (post, business) => {
  const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';

  try {
    const response = await axios.post(`${aiServiceUrl}/analyze`, {
      post,
      business,
    }, {
      timeout: 5000,
    });

    return response.data;
  } catch (error) {
    console.warn(`[AI Service Warning] Could not connect to AI microservice at ${aiServiceUrl}. Ensure Python Flask server is running.`);
    return {
      isOpportunity: false,
      intent: 'low',
      service: business.whatTheySell || '',
      reason: 'AI service unreachable.',
      suggestedReply: '',
    };
  }
};

export default {
  analyzePost,
};
