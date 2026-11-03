import Conversation from '../models/Conversation.js';
import Message from '../models/Message.js';
import RFQ from '../models/RFQ.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// Get or create the conversation for a given RFQ — only the two participants can access it
export const getOrCreateConversationForRfq = asyncHandler(async (req, res) => {
  const rfq = await RFQ.findById(req.params.rfqId);
  if (!rfq) throw new ApiError(404, 'RFQ not found');

  const isParticipant =
    rfq.designerId.toString() === req.user._id.toString() ||
    rfq.manufacturerId.toString() === req.user._id.toString();
  if (!isParticipant) throw new ApiError(403, 'You are not part of this conversation');

  let conversation = await Conversation.findOne({ rfqId: rfq._id });
  if (!conversation) {
    conversation = await Conversation.create({
      rfqId: rfq._id,
      designerId: rfq.designerId,
      manufacturerId: rfq.manufacturerId,
    });
  }

  res.status(200).json(new ApiResponse(200, conversation, 'Conversation ready'));
});

// All conversations the logged-in user is part of, for a chat list sidebar
export const getMyConversations = asyncHandler(async (req, res) => {
  const conversations = await Conversation.find({
    $or: [{ designerId: req.user._id }, { manufacturerId: req.user._id }],
  })
    .populate('rfqId', 'projectId')
    .populate('designerId', 'name')
    .populate('manufacturerId', 'name')
    .sort({ lastMessageAt: -1 });

  res.status(200).json(new ApiResponse(200, conversations, 'Conversations fetched'));
});

// Message history for one conversation
export const getMessages = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.id);
  if (!conversation) throw new ApiError(404, 'Conversation not found');

  const isParticipant =
    conversation.designerId.toString() === req.user._id.toString() ||
    conversation.manufacturerId.toString() === req.user._id.toString();
  if (!isParticipant) throw new ApiError(403, 'You are not part of this conversation');

  const messages = await Message.find({ conversationId: conversation._id }).sort({
    createdAt: 1,
  });

  res.status(200).json(new ApiResponse(200, messages, 'Messages fetched'));
});