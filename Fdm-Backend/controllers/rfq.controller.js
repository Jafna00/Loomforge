import { validationResult } from 'express-validator';
import RFQ from '../models/RFQ.js';
import Project from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createRfq = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, 'Validation failed', errors.array());

  const { projectId, manufacturerId, message } = req.body;

  const project = await Project.findById(projectId);
  if (!project) throw new ApiError(404, 'Project not found');
  if (project.designerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You can only send RFQs for your own projects');
  }

  const existing = await RFQ.findOne({ projectId, manufacturerId });
  if (existing) throw new ApiError(409, 'You already sent an RFQ to this manufacturer for this project');

  const rfq = await RFQ.create({
    projectId,
    designerId: req.user._id,
    manufacturerId,
    message,
  });

  res.status(201).json(new ApiResponse(201, rfq, 'RFQ sent successfully'));
});

// Designer's sent RFQs
export const getMySentRfqs = asyncHandler(async (req, res) => {
  const rfqs = await RFQ.find({ designerId: req.user._id })
    .populate('projectId', 'title category quantity budget')
    .populate('manufacturerId', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, rfqs, 'Sent RFQs fetched'));
});

// Manufacturer's received RFQs
export const getMyReceivedRfqs = asyncHandler(async (req, res) => {
  const rfqs = await RFQ.find({ manufacturerId: req.user._id })
    .populate('projectId', 'title category quantity budget deadline description')
    .populate('designerId', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, rfqs, 'Received RFQs fetched'));
});

export const getRfqById = asyncHandler(async (req, res) => {
  const rfq = await RFQ.findById(req.params.id)
    .populate('projectId')
    .populate('designerId', 'name email')
    .populate('manufacturerId', 'name email');

  if (!rfq) throw new ApiError(404, 'RFQ not found');

  const isOwner =
    rfq.designerId._id.toString() === req.user._id.toString() ||
    rfq.manufacturerId._id.toString() === req.user._id.toString();
  if (!isOwner) throw new ApiError(403, 'You do not have access to this RFQ');

  res.status(200).json(new ApiResponse(200, rfq, 'RFQ fetched'));
});

// Manufacturer marks an RFQ as reviewed (simple status bump, quotation comes next step)
export const markRfqReviewed = asyncHandler(async (req, res) => {
  const rfq = await RFQ.findById(req.params.id);
  if (!rfq) throw new ApiError(404, 'RFQ not found');
  if (rfq.manufacturerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not your RFQ to update');
  }

  rfq.status = 'reviewed';
  await rfq.save();

  res.status(200).json(new ApiResponse(200, rfq, 'RFQ marked as reviewed'));
});