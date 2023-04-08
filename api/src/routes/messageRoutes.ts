import { Router } from 'express';
import {
  getAllMessages,
  getMessage,
  createMessage,
  updateMessage,
  deleteMessage,
} from '../controllers/messageController';

const router = Router();

router.get('/', getAllMessages);
router.get('/:messageId', getMessage);
router.post('/', createMessage);
router.put('/:messageId', updateMessage);
router.delete('/:messageId', deleteMessage);

export default router;