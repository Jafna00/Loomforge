import { validationResult } from 'express-validator';
import { analyzeRequirement } from '../ai/requirementAnalyzer.js';
import { recommendManufacturers } from '../ai/manufacturerRecommender.js';
import Project from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const analyzeRequirementHandler = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, 'Validation failed', errors.array());

  const { text } = req.body;

  try {
    const structured = await analyzeRequirement(text);
    res.status(200).json(new ApiResponse(200, structured, 'Requirement analyzed'));
  } catch (err) {
    throw new ApiError(502, 'AI analysis failed. Please try again or fill the form manually.');
  }
});

export const recommendManufacturersHandler = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  if (!project) throw new ApiError(404, 'Project not found');
  if (project.designerId.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Not your project');
  }

  const recommendations = await recommendManufacturers(project);
  res.status(200).json(new ApiResponse(200, recommendations, 'Recommendations generated'));
});