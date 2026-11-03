import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import Message from '../models/Message.js';
import Conversation from '../models/Conversation.js';

export function initSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: process.env.CLIENT_URL,
      credentials: true,
    },
  });

  // Auth middleware for socket connections — same JWT as REST, sent differently
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) return next(new Error('Not authenticated'));

    try {
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      socket.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error('Invalid or expired token'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('join_conversation', (conversationId) => {
      socket.join(conversationId);
    });

    socket.on('leave_conversation', (conversationId) => {
      socket.leave(conversationId);
    });

    socket.on('send_message', async ({ conversationId, text }) => {
      if (!text?.trim()) return;

      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) return;

        const isParticipant =
          conversation.designerId.toString() === socket.userId ||
          conversation.manufacturerId.toString() === socket.userId;
        if (!isParticipant) return;

        const message = await Message.create({
          conversationId,
          senderId: socket.userId,
          text: text.trim(),
        });

        conversation.lastMessageAt = new Date();
        await conversation.save();

        io.to(conversationId).emit('new_message', {
          _id: message._id,
          conversationId,
          senderId: socket.userId,
          text: message.text,
          createdAt: message.createdAt,
        });
      } catch (err) {
        console.error('Socket send_message error:', err.message);
      }
    });

    socket.on('typing', ({ conversationId, isTyping }) => {
      socket.to(conversationId).emit('user_typing', { userId: socket.userId, isTyping });
    });
  });

  return io;
}