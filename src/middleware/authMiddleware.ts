import { Request, Response, NextFunction } from 'express';
import { validateToken } from '../services/authService';

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const token = authHeader.substring(7);

  if (!validateToken(token)) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }

  (req as any).token = token;
  next();
}
