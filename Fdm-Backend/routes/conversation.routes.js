import { Router } from 'express';
import {
  getOrCreateConversationForRfq,
  getMyConversations,
  getMessages,
} from '../controllers/conversation.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.use(verifyJWT);

router.get('/mine', getMyConversations);
router.get('/rfq/:rfqId', getOrCreateConversationForRfq);
router.get('/:id/messages', getMessages);

export default router;