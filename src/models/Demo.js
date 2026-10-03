import mongoose from 'mongoose';

const demoSchema = new mongoose.Schema(
  {
    externalId: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    postedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

demoSchema.index({ source: 1, externalId: 1 }, { unique: true });

const Demo = mongoose.model('Demo', demoSchema);

export default Demo;