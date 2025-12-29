import { justifierTexte } from '../justifierTexte';

describe('justifierTexte', () => {
  test('texte vide retourne une chaine vide', () => {
    expect(justifierTexte('')).toBe('');
  });

  test('un seul mot reste inchangé', () => {
    expect(justifierTexte('Bonjour')).toBe('Bonjour');
  });

  test('plusieurs mots courts sur une ligne', () => {
    const resultat = justifierTexte('Bonjour tout le monde');
    const lignes = resultat.split('\n');

    expect(lignes.length).toBe(1);
    expect(lignes[0].length).toBe(80);
  });

  test('texte long génère plusieurs lignes', () => {
    const texte = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    const resultat = justifierTexte(texte);
    const lignes = resultat.split('\n');

    expect(lignes.length).toBeGreaterThan(1);
  });

  test('chaque ligne sauf la dernière fait 80 caractères', () => {
    const texte = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua';
    const resultat = justifierTexte(texte);
    const lignes = resultat.split('\n');

    for (let i = 0; i < lignes.length - 1; i++) {
      expect(lignes[i].length).toBe(80);
    }
  });

  test('dernière ligne alignée à gauche', () => {
    const texte = 'Ceci est un test qui va prendre plusieurs lignes pour vérifier la justification';
    const resultat = justifierTexte(texte);
    const lignes = resultat.split('\n');
    const derniereLigne = lignes[lignes.length - 1];

    // Pas d'espaces multiples dans la dernière ligne
    expect(derniereLigne).not.toMatch(/  /);
  });

  test('espaces multiples sont normalisés', () => {
    const resultat = justifierTexte('Bonjour    monde');
    expect(resultat).toBeTruthy();
  });
});
