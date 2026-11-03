import { validationResult } from 'express-validator';
import ManufacturerProfile from '../models/ManufacturerProfile.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const upsertMyProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, 'Validation failed', errors.array());

  const {
    companyName,
    location,
    minimumOrderQuantity,
    productionCapacity,
    specializations,
    certifications,
    factoryImages,
  } = req.body;

  const profile = await ManufacturerProfile.findOneAndUpdate(
    { userId: req.user._id },
    {
      companyName,
      location,
      minimumOrderQuantity,
      productionCapacity,
      specializations,
      certifications,
      factoryImages,
    },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, profile, 'Profile saved successfully'));
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await ManufacturerProfile.findOne({ userId: req.user._id });
  res.status(200).json(new ApiResponse(200, profile || null, 'Profile fetched'));
});

export const getAllManufacturers = asyncHandler(async (req, res) => {
  const { search, category, location, minMoq, maxMoq } = req.query;

  const filter = {};

  if (search) {
    // Match against company name OR location, case-insensitive
    filter.$or = [
      { companyName: { $regex: search, $options: 'i' } },
      { location: { $regex: search, $options: 'i' } },
    ];
  }

  if (category) filter.specializations = { $in: [category] };
  if (minMoq || maxMoq) {
    filter.minimumOrderQuantity = {};
    if (minMoq) filter.minimumOrderQuantity.$gte = Number(minMoq);
    if (maxMoq) filter.minimumOrderQuantity.$lte = Number(maxMoq);
  }

  const profiles = await ManufacturerProfile.find(filter)
    .populate('userId', 'name email')
    .sort({ createdAt: -1 });

  res.status(200).json(new ApiResponse(200, profiles, 'Manufacturers fetched'));
});

// Single manufacturer's public profile view
export const getManufacturerById = asyncHandler(async (req, res) => {
  const profile = await ManufacturerProfile.findById(req.params.id).populate(
    'userId',
    'name email'
  );
  if (!profile) throw new ApiError(404, 'Manufacturer not found');
  res.status(200).json(new ApiResponse(200, profile, 'Manufacturer fetched'));
});