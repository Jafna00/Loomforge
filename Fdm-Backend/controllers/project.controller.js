import { validationResult } from 'express-validator';
import Project from '../models/Project.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const createProject = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new ApiError(400, 'Validation failed', errors.array());

  const { title, description, category, quantity, budget, deadline, visibility, attachments } =
    req.body;

  const project = await Project.create({
    designerId: req.user._id,
    title,
    description,
    category,
    quantity,
    budget,
    deadline,
    visibility,
    attachments,
  });

  res.status(201).json(new ApiResponse(201, project, 'Project created successfully'));
});

export const getMyProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ designerId: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, projects, 'Projects fetched successfully'));
});

export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, 'Project not found');
  res.status(200).json(new ApiResponse(200, project, 'Project fetched successfully'));
});

// For manufacturers to browse later (Phase 3) — harmless to add now
export const getAllPublicProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find({ visibility: 'public', status: 'active' }).sort({
    createdAt: -1,
  });
  res.status(200).json(new ApiResponse(200, projects, 'Public projects fetched successfully'));
});