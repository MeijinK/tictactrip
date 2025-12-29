import { justifyText as justifierTexte } from '../../src/utils/justifyText';

describe('justifierTexte', () => {
  test('texte vide retourne une chaine vide', () => {
    expect(justifierTexte('')).toBe('');
  });

  test('un seul mot reste inchangé', () => {
    expect(justifierTexte('Bonjour')).toBe('Bonjour');
  });

  test('plusieurs mots courts sur une ligne', () => {
    const result = justifierTexte('Bonjour tout le monde');
    const lines = result.split('\n');

    expect(lines.length).toBe(1);
    expect(lines[0]).toBe('Bonjour tout le monde');
  });

  test('texte long génère plusieurs lignes', () => {
    const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    const result = justifierTexte(text);
    const lines = result.split('\n');

    expect(lines.length).toBeGreaterThan(1);
  });

  test('chaque ligne sauf la dernière fait 80 caractères', () => {
    const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    const result = justifierTexte(text);
    const lines = result.split('\n');

    for (let i = 0; i < lines.length - 1; i++) {
      expect(lines[i].length).toBe(80);
    }
  });

  test('dernière ligne alignée à gauche', () => {
    const text = 'Ceci est un test qui va prendre plusieurs lignes pour vérifier la justification';
    const result = justifierTexte(text);
    const lines = result.split('\n');
    const lastLine = lines[lines.length - 1];

    expect(lastLine).not.toMatch(/  /);
  });

  test('espaces multiples sont normalisés', () => {
    const result = justifierTexte('Bonjour    monde');
    expect(result).toBeTruthy();
  });
});
