import { Router } from 'express';
import { justifyTextHandler } from '../controllers/justifyController';
import { authMiddleware } from '../middleware/authMiddleware';
import { rateLimitMiddleware } from '../middleware/rateLimitMiddleware';

const router = Router();

router.post('/justify', authMiddleware, rateLimitMiddleware, justifyTextHandler);

export default router;
