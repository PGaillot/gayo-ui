# Gayo UI

![GitHub](https://img.shields.io/github/license/PGaillot/gayo-ui)
![npm](https://img.shields.io/npm/v/gayo-lib)
![GitHub last commit](https://img.shields.io/github/last-commit/PGaillot/gayo-ui)

Gayo UI est une bibliothèque de composants Angular créée pour le plaisir et l'expérimentation. Cette collection de composants est conçue pour être ludique et inspirée, sans but commercial.

## 🌟 Liens utiles

- **GitHub**: [https://github.com/PGaillot/gayo-ui](https://github.com/PGaillot/gayo-ui)
- **npm**: [https://www.npmjs.com/package/gayo-lib](https://www.npmjs.com/package/gayo-lib)

## 🚀 Compatibilité

- Angular: ^18.0.0
- TypeScript: ~5.4.2

## 🛠️ Installation

Pour installer Gayo UI dans votre projet, utilisez la commande suivante :

```bash
npm install gayo-ui
```

## 🧩 Composants
Gayo UI inclut actuellement les composants suivants :

- Slider
- Button
- Perk Card

Plus de composants sont en cours de développement !

## 🎨 Storybook

Nous utilisons Storybook pour présenter et tester nos composants. Pour lancer Storybook localement :

```bash
npm run storybook
```

## 🏗️ Développement

Générer un nouveau composant pour le projet Vault-Tec

```bash
node scripts/generate-vault-tec-component.cjs nomDuComposant
```

Pour génerer tout autres composant

```bash
ng g c components/component-name --project gayo-lib
```

### Build

Pour construire le projet :
bashCopyng build gayo-lib
Les artefacts de build seront stockés dans le répertoire dist/.
Tests unitaires
Pour exécuter les tests unitaires :

## 📚 Changelogs

### [ 0.0.13 ] - 2024-08-15
author: PGaillot 
- ajoute de **Soduku Component**.
- fix des erreurs de copie des logs.

---

### [ 0.0.12 ] - 2024-08-12
author: PGaillot 
- Initilalisation du composant **footer**
- ajout d'animations au composant **perk card**
  - animation au survol 
  - animation au clique
-  corrections du fichier `vault-tec-component.cjs` 
- ajout d'un lien vers le storybook dans le `README.md`

---

### [ 0.0.11 ] - 2024-08-11
author: PGaillot 
- mis à jour du fichier `README.md` de la lib et du repo.
- ajout d'une la propriété `stroke` au **Button Component**
- mis à jour de **Perk Card Component**

---
[Voir plus...](CHANGELOG.md)

