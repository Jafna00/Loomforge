import mongoose from 'mongoose';

const manufacturerProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    companyName: { type: String, trim: true },
    location: { type: String, trim: true },
    minimumOrderQuantity: { type: Number, default: 0 },
    productionCapacity: { type: String, trim: true },
    specializations: [{ type: String, trim: true }],
    certifications: [{ type: String, trim: true }],
    factoryImages: [{ type: String }],
    rating: { type: Number, default: 0, min: 0, max: 5 },
    verified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model('ManufacturerProfile', manufacturerProfileSchema);