import mongoose from 'mongoose';

const rfqSchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // the manufacturer's User._id, not their profile._id
      required: true,
    },
    message: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'quoted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

// Prevent a designer from sending duplicate RFQs for the same project to the same manufacturer
rfqSchema.index({ projectId: 1, manufacturerId: 1 }, { unique: true });

export default mongoose.model('RFQ', rfqSchema);