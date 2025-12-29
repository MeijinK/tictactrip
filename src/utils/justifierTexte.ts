const LONGUEUR_LIGNE = 80;

export function justifierTexte(texte: string): string {
  // Normaliser le texte : enlever espaces multiples et retours à la ligne
  const texteNormalise = texte.replace(/\s+/g, ' ').trim();

  if (!texteNormalise) {
    return '';
  }

  const mots = texteNormalise.split(' ');
  const lignes: string[] = [];
  let ligneActuelle: string[] = [];
  let longueurActuelle = 0;

  for (const mot of mots) {
    const longueurAvecMot = longueurActuelle + mot.length + ligneActuelle.length;

    if (longueurAvecMot <= LONGUEUR_LIGNE) {
      ligneActuelle.push(mot);
      longueurActuelle += mot.length;
    } else {
      if (ligneActuelle.length > 0) {
        lignes.push(justifierLigne(ligneActuelle, false));
      }
      ligneActuelle = [mot];
      longueurActuelle = mot.length;
    }
  }

  // Dernière ligne (alignée à gauche)
  if (ligneActuelle.length > 0) {
    lignes.push(justifierLigne(ligneActuelle, true));
  }

  return lignes.join('\n');
}

function justifierLigne(mots: string[], derniereLigne: boolean): string {
  if (mots.length === 1) {
    return mots[0];
  }

  if (derniereLigne) {
    return mots.join(' ');
  }

  const longueurMots = mots.reduce((acc, mot) => acc + mot.length, 0);
  const espacesTotal = LONGUEUR_LIGNE - longueurMots;
  const nbEspaces = mots.length - 1;
  const espacesParTrou = Math.floor(espacesTotal / nbEspaces);
  const espacesSupplementaires = espacesTotal % nbEspaces;

  let ligne = '';
  for (let i = 0; i < mots.length; i++) {
    ligne += mots[i];
    if (i < mots.length - 1) {
      const espaces = espacesParTrou + (i < espacesSupplementaires ? 1 : 0);
      ligne += ' '.repeat(espaces);
    }
  }

  return ligne;
}
