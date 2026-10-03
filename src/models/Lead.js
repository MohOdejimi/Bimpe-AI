import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: true,
      trim: true,
    },
    originalText: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      trim: true,
    },
    service: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    intent: {
      type: String,
      enum: ['high', 'medium', 'low'],
      default: 'medium',
    },
    urgency: {
      type: String,
      trim: true,
    },
    reason: {
      type: String,
    },
    suggestedReply: {
      type: String,
    },
    status: {
      type: String,
      enum: ['new', 'contacted', 'closed'],
      default: 'new',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model('Lead', leadSchema);

export default Lead;
