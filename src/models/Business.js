import mongoose from 'mongoose';

const businessSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Business name is required'],
      trim: true,
    },
    whatTheySell: {
      type: String,
      required: [true, 'whatTheySell description is required'],
      trim: true,
    },
    targetCustomer: {
      type: String,
      required: [true, 'targetCustomer description is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
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

const Business = mongoose.model('Business', businessSchema);

export default Business;
