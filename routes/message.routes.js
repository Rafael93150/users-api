import express from 'express';
import { getConvMessages, newMessage } from '../controllers/message.controller.js';

const router = express.Router();

// conversations
router.get('/:convId', getConvMessages);
router.post('/', newMessage);

export default router;