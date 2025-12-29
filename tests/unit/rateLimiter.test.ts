import { checkLimit as verifierLimite, incrementCounter as incrementerCompteur, countWords as compterMots } from '../../src/middleware/rateLimiter';

describe('rateLimiter', () => {
  describe('compterMots', () => {
    test('compte les mots dans un texte simple', () => {
      expect(compterMots('Bonjour tout le monde')).toBe(4);
    });

    test('gère les espaces multiples', () => {
      expect(compterMots('Bonjour    monde')).toBe(2);
    });

    test('retourne 0 pour une chaîne vide', () => {
      expect(compterMots('')).toBe(0);
    });

    test('gère les retours à la ligne', () => {
      expect(compterMots('Bonjour\nmonde\ntest')).toBe(3);
    });
  });

  describe('verifierLimite', () => {
    test('retourne true si sous la limite', () => {
      const token = 'token-test-1';
      expect(verifierLimite(token, 100)).toBe(true);
    });

    test('retourne false si dépasse la limite', () => {
      const token = 'token-test-2';
      incrementerCompteur(token, 80000);
      expect(verifierLimite(token, 1000)).toBe(false);
    });

    test('retourne true exactement à la limite', () => {
      const token = 'token-test-3';
      incrementerCompteur(token, 79900);
      expect(verifierLimite(token, 100)).toBe(true);
    });
  });

  describe('incrementerCompteur', () => {
    test('incrémente le compteur correctement', () => {
      const token = 'token-test-4';
      incrementerCompteur(token, 100);
      expect(verifierLimite(token, 79901)).toBe(false);
    });
  });
});
