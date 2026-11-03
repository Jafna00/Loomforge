import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: 1,
    },
    budget: {
      type: Number,
      required: [true, 'Budget is required'],
      min: 0,
    },
    deadline: {
      type: Date,
      required: [true, 'Deadline is required'],
    },
    visibility: {
      type: String,
      enum: ['public', 'private'],
      default: 'public',
    },
    attachments: [{ type: String }],
    status: {
      type: String,
      enum: ['active', 'in_progress', 'completed', 'cancelled'],
      default: 'active',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);