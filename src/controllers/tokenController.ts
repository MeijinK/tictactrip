import { Request, Response } from 'express';
import { generateToken } from '../services/authService';

export function createToken(req: Request, res: Response): void {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ error: 'Email is required' });
    return;
  }

  const token = generateToken(email);
  res.json({ token });
}
