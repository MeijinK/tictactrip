# API de Justification de Texte

API REST développée en TypeScript avec Express qui justifie un texte sur 80 caractères par ligne, avec authentification par token et rate limiting.

## URLs

- **Production** : https://tictactrip-two.vercel.app
- **Local** : http://localhost:3000

## Fonctionnalités

- Justification de texte sur 80 caractères par ligne
- Algorithme de justification sans bibliothèque externe
- Authentification via token unique (UUID)
- Rate limiting : 80 000 mots maximum par jour par token

## Installation

```bash
git clone https://github.com/Meijink/tictactrip
cd tictactrip
npm install
```

## Démarrage

### Mode développement
```bash
npm run dev
```

### Mode production
```bash
npm run build
npm start
```

## Tests

```bash
npm test              # Tous les tests
```

## Documentation API

### GET /

Page d'accueil de l'API.


### POST /api/token

Génère un token d'authentification.

**Requête :**
```bash
POST /api/token
Content-Type: application/json

{
  "email": "foo@bar.com"
}
```

**Réponse :**
```json
{
  "token": "550e8400-e29b-41d4-a716-446655440000"
}
```

**Status :**
- `200` : Token généré
- `400` : Email manquant

### POST /api/justify

Justifie un texte sur 80 caractères par ligne.

**Requête :**
```bash
POST /api/justify
Authorization: Bearer <token>
Content-Type: text/plain

Longtemps je me suis couche de bonne heure. Parfois a peine ma bougie eteinte mes yeux se fermaient si vite que je navais pas le temps de me dire Je mendors.
```

**Réponse :**
```
Longtemps  je  me  suis couche de bonne heure. Parfois a peine ma bougie eteinte
mes yeux se fermaient si vite que je navais pas le temps de me dire Je mendors.
```

**Status :**
- `200` : Succès
- `401` : Token invalide
- `402` : Limite dépassée

## Exemples d'utilisation

## Tests avec Postman

Collection disponible dans `Public Tictactrip.postman_collection.json`.

**Import :**
1. Postman > Import > Upload Files
2. Sélectionner `Public Tictactrip.postman_collection.json`
3. Modifier l'URL de base selon votre environnement

## Références

- [Text Justification - LeetCode Problem Explanation](https://www.youtube.com/watch?v=TzMl4Z7pVh8)

## Auteur

Emile Junior ADA
emilejuniorada.com
