import { Request, Response } from 'express';
import { justifyText } from '../utils/justifyText';

export function justifyTextHandler(req: Request, res: Response): void {
  const text = req.body;

  if (!text || typeof text !== 'string') {
    res.status(400).send('Text content is required');
    return;
  }

  const justified = justifyText(text);
  res.type('text/plain').send(justified);
}
