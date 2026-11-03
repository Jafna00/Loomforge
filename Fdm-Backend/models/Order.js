import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    orderNumber: {
      type: String,
      required: true,
      unique: true,
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Project',
      required: true,
    },
    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Quotation',
      required: true,
      unique: true,
    },
    designerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    manufacturerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    productionStage: {
      type: String,
      enum: [
        'order_accepted',
        'fabric_ready',
        'cutting',
        'stitching',
        'quality_check',
        'packing',
        'dispatched',
        'delivered',
      ],
      default: 'order_accepted',
    },
  },
  { timestamps: true }
);

export default mongoose.model('Order', orderSchema);