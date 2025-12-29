import { randomUUID } from 'crypto';

const emailVersToken = new Map<string, string>();
const tokensValides = new Set<string>();

export function genererToken(email: string): string {
  const tokenExistant = emailVersToken.get(email);
  if (tokenExistant) {
    return tokenExistant;
  }

  const nouveauToken = randomUUID();
  emailVersToken.set(email, nouveauToken);
  tokensValides.add(nouveauToken);

  return nouveauToken;
}

export function validerToken(token: string): boolean {
  if (!token) {
    return false;
  }
  return tokensValides.has(token);
}
