import { Request, Response, NextFunction } from 'express';
import { countWords, checkLimit, incrementCounter } from './rateLimiter';

export function rateLimitMiddleware(req: Request, res: Response, next: NextFunction): void {
  const token = (req as any).token;
  const text = req.body;

  const wordCount = countWords(text);

  if (!checkLimit(token, wordCount)) {
    res.status(402).json({ error: 'Payment Required' });
    return;
  }

  incrementCounter(token, wordCount);
  next();
}
