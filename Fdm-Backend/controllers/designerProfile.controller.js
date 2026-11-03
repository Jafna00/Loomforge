import { validationResult } from 'express-validator';
import DesignerProfile from '../models/DesignerProfile.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const upsertMyProfile = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, 'Validation failed', errors.array());

  const { brandName, bio, location, categories, portfolio, experience } = req.body;

  const profile = await DesignerProfile.findOneAndUpdate(
    { userId: req.user._id },
    { brandName, bio, location, categories, portfolio, experience },
    { new: true, upsert: true, runValidators: true }
  );

  res.status(200).json(new ApiResponse(200, profile, 'Profile saved successfully'));
});

export const getMyProfile = asyncHandler(async (req, res) => {
  const profile = await DesignerProfile.findOne({ userId: req.user._id });
  // Not an error if it doesn't exist yet — frontend just shows an empty form
  res.status(200).json(new ApiResponse(200, profile || null, 'Profile fetched'));
});

// For manufacturers viewing a designer's profile later (via a project)
export const getProfileByUserId = asyncHandler(async (req, res) => {
  const profile = await DesignerProfile.findOne({ userId: req.params.userId });
  if (!profile) throw new ApiError(404, 'Profile not found');
  res.status(200).json(new ApiResponse(200, profile, 'Profile fetched'));
});