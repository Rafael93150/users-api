import express from 'express';
import { getConvMessages, getLastMessage, newMessage } from '../controllers/message.controller.js';

const router = express.Router();

// conversations
router.get('/:convId', getConvMessages);
router.get('/lastMsg/:convId', getLastMessage);
router.post('/', newMessage);

export default router;