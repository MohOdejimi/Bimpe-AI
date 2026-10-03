/**
 * SCOUT CONTROLLER
 * Handles POST /api/scout/start
 */

import Business from '../models/Business.js';
import Demo from '../models/Demo.js';
import Lead from '../models/Lead.js';
import { findOpportunities } from '../services/discovery.service.js';
import { analyzePost } from '../services/ai-analysis.service.js';
import { triggerVoiceAlert } from '../services/voice.service.js';

export const startScout = async (req, res) => {
  try {
    const { name, whatTheySell, targetCustomer, phone } = req.body;

    if (!name || !whatTheySell || !targetCustomer || !phone) {
      return res.status(400).json({
        error: 'Missing required fields: name, whatTheySell, targetCustomer, phone',
      });
    }

    // 1. Save or update business profile
    const business = await Business.findOneAndUpdate(
      {},
      { name, whatTheySell, targetCustomer, phone },
      { upsert: true, new: true, runValidators: true }
    );

    // 2. Discover candidate posts
    const candidatePosts = await findOpportunities(business);

    // Store discovered posts for demo browsing; upsert prevents duplicates per source.
    const demoPosts = candidatePosts.map((post) => {
      const externalId = post.id ?? post.url;

      if (!externalId) {
        throw new Error('Each discovered post must have an id or url');
      }

      return {
        externalId: String(externalId),
        source: post.source,
        username: post.username,
        text: post.text,
        location: post.location,
        url: post.url,
        postedAt: post.postedAt,
      };
    });

    if (demoPosts.length > 0) {
      await Demo.bulkWrite(
        demoPosts.map((post) => ({
          updateOne: {
            filter: { source: post.source, externalId: post.externalId },
            update: { $set: post },
            upsert: true,
          },
        }))
      );
    }

    const storedDemoPosts = demoPosts.length
      ? await Demo.find({
          $or: demoPosts.map(({ source, externalId }) => ({ source, externalId })),
        }).sort({ postedAt: -1 })
      : [];

    const savedLeads = [];

    // 3. Analyze candidate posts & save qualified leads
    for (const post of candidatePosts) {
      const analysis = await analyzePost(post, business);

      if (analysis && analysis.isOpportunity) {
        const lead = await Lead.create({
          source: post.source,
          originalText: post.text,
          url: post.url,
          service: analysis.service || business.whatTheySell,
          location: post.location,
          intent: analysis.intent || 'medium',
          urgency: analysis.urgency || 'Normal',
          reason: analysis.reason,
          suggestedReply: analysis.suggestedReply,
          status: 'new',
        });

        // 4. Trigger voice alert for high-intent leads
        if (lead.intent === 'high') {
          await triggerVoiceAlert({ business, lead });
        }

        savedLeads.push(lead);
      }
    }

    return res.status(200).json({
      message: 'Scout discovery completed',
      business,
      totalCandidates: storedDemoPosts.length,
      demoOpportunities: storedDemoPosts,
      totalDiscovered: savedLeads.length,
      leads: savedLeads,
    });
  } catch (error) {
    console.error('Error in startScout:', error);
    return res.status(500).json({
      error: 'Failed to execute scout process',
      details: error.message,
    });
  }
};

export default {
  startScout,
};
