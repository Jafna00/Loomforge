import mongoose from 'mongoose';

const designerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    brandName: { type: String, trim: true },
    bio: { type: String, trim: true, maxlength: 500 },
    location: { type: String, trim: true },
    categories: [{ type: String, trim: true }],
    portfolio: [{ type: String }], // image URLs
    experience: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.model('DesignerProfile', designerProfileSchema);