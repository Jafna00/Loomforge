import Order from '../models/Order.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getMyOrdersAsDesigner = asyncHandler(async (req, res) => {
  const orders = await Order.find({ designerId: req.user._id })
    .populate('projectId', 'title category')
    .populate('manufacturerId', 'name email')
    .sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, orders, 'Orders fetched'));
});

export const getMyOrdersAsManufacturer = asyncHandler(async (req, res) => {
  const orders = await Order.find({ manufacturerId: req.user._id })
    .populate('projectId', 'title category')
    .populate('designerId', 'name email')
    .sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, orders, 'Orders fetched'));
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate('projectId')
    .populate('designerId', 'name email')
    .populate('manufacturerId', 'name email');

  if (!order) throw new ApiError(404, 'Order not found');

  const isOwner =
    order.designerId._id.toString() === req.user._id.toString() ||
    order.manufacturerId._id.toString() === req.user._id.toString();
  if (!isOwner) throw new ApiError(403, 'You do not have access to this order');

  res.status(200).json(new ApiResponse(200, order, 'Order fetched'));
});

const STAGE_ORDER = [
  'order_accepted',
  'fabric_ready',
  'cutting',
  'stitching',
  'quality_check',
  'packing',
  'dispatched',
  'delivered',
];

export const updateProductionStage = asyncHandler(async (req, res) => {
  const { stage } = req.body;
  if (!STAGE_ORDER.includes(stage)) throw new ApiError(400, 'Invalid production stage');

  const order = await Order.findById(req.params.id);
  if (!order) throw new ApiError(404, 'Order not found');
  if (order.manufacturerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not your order to update');
  }

  order.productionStage = stage;
  await order.save();

  res.status(200).json(new ApiResponse(200, order, 'Production stage updated'));
});