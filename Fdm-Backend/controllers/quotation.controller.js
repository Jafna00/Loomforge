import { validationResult } from 'express-validator';
import Quotation from '../models/Quotation.js';
import RFQ from '../models/RFQ.js';
import Project from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import Order from '../models/Order.js';

export const createQuotation = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, 'Validation failed', errors.array());

  const { rfqId, price, productionDays, message } = req.body;

  const rfq = await RFQ.findById(rfqId);
  if (!rfq) throw new ApiError(404, 'RFQ not found');
  if (rfq.manufacturerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'This RFQ was not sent to you');
  }

  const existing = await Quotation.findOne({ rfqId });
  if (existing) throw new ApiError(409, 'You already submitted a quotation for this RFQ');

  const quotation = await Quotation.create({
    rfqId,
    projectId: rfq.projectId,
    designerId: rfq.designerId,
    manufacturerId: req.user._id,
    price,
    productionDays,
    message,
  });

  rfq.status = 'quoted';
  await rfq.save();

  res.status(201).json(new ApiResponse(201, quotation, 'Quotation submitted successfully'));
});

// Designer: all quotations for a specific project (for comparison)
export const getQuotationsForProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) throw new ApiError(404, 'Project not found');
  if (project.designerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not your project');
  }

  const quotations = await Quotation.find({ projectId: req.params.projectId })
    .populate('manufacturerId', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, quotations, 'Quotations fetched'));
});

// Manufacturer: quotations they've submitted
export const getMySubmittedQuotations = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find({ manufacturerId: req.user._id })
    .populate('projectId', 'title category quantity budget')
    .populate('designerId', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, quotations, 'Quotations fetched'));
});

export const getQuotationById = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id)
    .populate('projectId')
    .populate('designerId', 'name email')
    .populate('manufacturerId', 'name email');

  if (!quotation) throw new ApiError(404, 'Quotation not found');

  const isOwner =
    quotation.designerId._id.toString() === req.user._id.toString() ||
    quotation.manufacturerId._id.toString() === req.user._id.toString();
  if (!isOwner) throw new ApiError(403, 'You do not have access to this quotation');

  res.status(200).json(new ApiResponse(200, quotation, 'Quotation fetched'));
});

export const acceptQuotation = asyncHandler(async (req, res) => {
  const quotation = await Quotation.findById(req.params.id);
  if (!quotation) throw new ApiError(404, 'Quotation not found');
  if (quotation.designerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not your quotation to accept');
  }
  if (quotation.status !== 'pending') {
    throw new ApiError(400, 'This quotation has already been resolved');
  }

  quotation.status = 'accepted';
  await quotation.save();

  await Quotation.updateMany(
    { projectId: quotation.projectId, _id: { $ne: quotation._id }, status: 'pending' },
    { status: 'rejected' }
  );

  const project = await Project.findByIdAndUpdate(
    quotation.projectId,
    { status: 'in_progress' },
    { new: true }
  );

  const orderNumber = `LF-${Date.now().toString().slice(-6)}`;
  const order = await Order.create({
    orderNumber,
    projectId: quotation.projectId,
    quotationId: quotation._id,
    designerId: quotation.designerId,
    manufacturerId: quotation.manufacturerId,
    price: quotation.price,
    quantity: project.quantity,
  });

  res.status(200).json(new ApiResponse(200, { quotation, order }, 'Quotation accepted and order created'));
});


// Designer: all quotations across all of their projects (for the sidebar "Quotations" link)
export const getMyQuotationsAsDesigner = asyncHandler(async (req, res) => {
  const quotations = await Quotation.find({ designerId: req.user._id })
    .populate('projectId', 'title category quantity budget')
    .populate('manufacturerId', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, quotations, 'Quotations fetched'));
});