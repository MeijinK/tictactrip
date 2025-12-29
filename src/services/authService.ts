import { randomUUID } from 'crypto';

const emailToToken = new Map<string, string>();
const validTokens = new Set<string>();

export function generateToken(email: string): string {
  const existingToken = emailToToken.get(email);
  if (existingToken) {
    return existingToken;
  }

  const newToken = randomUUID();
  emailToToken.set(email, newToken);
  validTokens.add(newToken);

  return newToken;
}

export function validateToken(token: string): boolean {
  if (!token) {
    return false;
  }
  return validTokens.has(token);
}
