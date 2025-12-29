import { generateToken as genererToken, validateToken as validerToken } from '../../src/services/authService';

describe('authService', () => {
  test('genererToken retourne un token pour un email', () => {
    const token = genererToken('test@example.com');
    expect(token).toBeTruthy();
    expect(typeof token).toBe('string');
    expect(token.length).toBeGreaterThan(0);
  });

  test('genererToken retourne le même token pour le même email', () => {
    const email = 'user@test.com';
    const token1 = genererToken(email);
    const token2 = genererToken(email);
    expect(token1).toBe(token2);
  });

  test('genererToken retourne des tokens différents pour des emails différents', () => {
    const token1 = genererToken('user1@test.com');
    const token2 = genererToken('user2@test.com');
    expect(token1).not.toBe(token2);
  });

  test('validerToken retourne true pour un token valide', () => {
    const token = genererToken('valid@test.com');
    expect(validerToken(token)).toBe(true);
  });

  test('validerToken retourne false pour un token invalide', () => {
    expect(validerToken('token-inexistant')).toBe(false);
  });

  test('validerToken retourne false pour une chaîne vide', () => {
    expect(validerToken('')).toBe(false);
  });
});
