import express from 'express';
import { getUserConversations, createConversation } from '../controllers/conversation.controller.js';

const router = express.Router();

// conversations
router.get('/:id', getUserConversations);
router.post('/', createConversation);

export default router;