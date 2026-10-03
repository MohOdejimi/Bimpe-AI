/**
 * VOICE SERVICE (BimpeAI Voice Alerts)
 * 
 * Triggers voice alert calls when a high-intent opportunity is found.
 */

import axios from 'axios';

/**
 * Triggers BimpeAI voice call alert.
 * 
 * @param {Object} param0 
 * @param {Object} param0.business Business profile details
 * @param {Object} param0.lead High-intent lead details
 */
export const triggerVoiceAlert = async ({ business, lead }) => {
  const apiKey = process.env.BIMPEAI_API_KEY;
  const baseUrl = process.env.BIMPEAI_BASE_URL;

  const alertScript = `Hi ${business.name || 'Owner'}, this is Sales Scout. I found a high-intent opportunity looking for ${lead.service || business.whatTheySell} in ${lead.location || 'your area'}. I've added the lead to your dashboard!`;

  console.log(`\n📞 [VOICE ALERT TRIGGERED]`);
  console.log(`Target Phone: ${business.phone}`);
  console.log(`Message: "${alertScript}"\n`);

  if (!apiKey || !baseUrl) {
    console.log('ℹ️ BimpeAI API key/URL not configured in .env. Call simulated cleanly.');
    return {
      success: true,
      simulated: true,
      message: alertScript,
    };
  }

  try {
    const response = await axios.post(
      `${baseUrl}/call`,
      {
        recipientPhone: business.phone,
        recipientName: business.name,
        message: alertScript,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        timeout: 5000,
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Failed to trigger BimpeAI call:', error.message);
    return { success: false, error: error.message };
  }
};

export default {
  triggerVoiceAlert,
};
