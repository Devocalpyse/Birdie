import { Router } from 'express';
import { createUser, getUser, loginUser, updateUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:userId', getUser);
router.put('/:userId', updateUser);

export default router;