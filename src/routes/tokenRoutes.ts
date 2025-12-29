import { Router } from 'express';
import { createToken } from '../controllers/tokenController';

const router = Router();

router.post('/token', createToken);

export default router;
