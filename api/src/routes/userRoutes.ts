import { Router } from 'express';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:userId', getUser);

export default router;