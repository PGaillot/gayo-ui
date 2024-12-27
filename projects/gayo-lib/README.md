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
- Radio
- Checkbox
- Input (text, number, password)
- Sudoku
- Loader
- Advice block

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

### [ 0.0.18 ] - 2024-08-10
author: PGaillot 
- modification de `readme.md`
- ajout du fichier `publish-package.cjs`
- modification de `main.yml`

---

### [ 0.0.17 ] - 2024-08-10
author: PGaillot 
- modification de `readme.md`
- ajout du fichier `publish-package.cjs`
- modification de `main.yml`

---

### [ 0.0.16 ] - 2024-08-18
author: PGaillot 
- Ajout de directives, de leur tests et leurs stories.
  - **Glitch** directive. _ajoute une effet de glitch._
  - **Swipe Char** directive. _fait apparaitre une lettre dans un temps donné._
  - **Typing effect** directive. _fait un effet de message tapé au clavier_
  - **Symbol Reveal** directive. _fait apparaitre le texte avec un effet_
- Mise à jour du fichier `.gitignore`.

---
[Voir plus...](CHANGELOG.md)











