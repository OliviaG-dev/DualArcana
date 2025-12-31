# 🃏 DualArcana

<div align="center">

**Deux arcanes. Un chemin.**

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)

</div>

---

## 📖 À propos

**DualArcana** est une application légère qui calcule et associe l'arcane majeur de l'année avec un arcane personnel, basé sur la numérologie. Elle propose une interprétation symbolique des cycles collectifs et individuels.

## ✨ Concept

DualArcana associe l'arcane majeur de l'année en cours à ton arcane personnel. En croisant ces deux énergies, elle propose une lecture symbolique de ton chemin, entre influences collectives et mouvement intérieur.

Chaque année porte une énergie collective, représentée par un arcane majeur du Tarot. Chaque individu traverse en parallèle un cycle personnel, lui aussi symbolisé par un arcane.

DualArcana fait le lien entre ces deux forces : ce que le temps propose, et ce que toi tu traverses.

> **Le résultat n'est pas une prédiction, mais une clé de lecture :** un outil d'introspection, de compréhension et d'alignement.

## 🎯 Fonctionnalités

- **Calcul automatique** des arcanes de l'année et personnel basé sur la numérologie
- **Visualisation** des arcanes avec leurs images et numéros
- **Interprétations détaillées** pour chaque arcane (mots-clés, descriptions)
- **Fusion des arcanes** avec interprétation de leur rencontre
- **Interface élégante** avec animations subtiles et design sobre
- **Modal d'interprétation** pour une exploration approfondie des résultats

## 🎯 Slogan

**Deux arcanes. Un chemin.**

## 🛠️ Tech Stack

- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server
- **CSS** - Styles sans framework (approche sobre et minimaliste)

## 🚀 Démarrage rapide

### Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd dual-arcana

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev

# Build pour la production
npm run build

# Prévisualiser le build de production
npm run preview
```

## 📁 Structure du projet

```
src/
  ├── App.tsx              # Composant principal de l'application
  ├── App.css              # Styles globaux
  ├── main.tsx             # Point d'entrée
  ├── index.css            # Styles de base
  ├── pages/               # Pages de l'application
  │   └── Home/            # Page d'accueil
  │       ├── Home.tsx     # Composant Home
  │       └── Home.css     # Styles Home
  ├── components/          # Composants réutilisables
  │   ├── Modal/           # Composant modal
  │   ├── ArcanaInterpretation/  # Affichage d'un arcane
  │   └── FusionInterpretation/  # Affichage de la fusion
  ├── domain/              # Logique métier
  │   ├── arcane.ts        # Définition des arcanes majeurs
  │   ├── numerology.ts    # Fonctions de numérologie
  │   ├── cycle.ts         # Calcul des cycles (année/personnel)
  │   ├── interpretation.ts # Enrichissement des résultats
  │   └── index.ts         # Exports centralisés
  ├── data/                # Données JSON et helpers
  │   ├── major-arcanes-year.json       # Données arcanes annuels
  │   ├── major-arcanes-personal.json   # Données arcanes personnels
  │   ├── major-arcane-fusion.json      # Données fusions
  │   └── index.ts         # Interfaces et fonctions d'accès
  └── assets/              # Assets statiques
      ├── background.png   # Image de fond principale
      ├── background2.jpg  # Image de fond modal
      └── logo.png         # Logo
```

## 🎨 Tonalité

Le projet adopte une approche :

- **Sobre** - Design épuré et minimaliste
- **Symbolique mais jamais ésotérique lourd** - Élégance sans excès
- **Introspectif, pas prédictif** - Outil de réflexion
- **Élégant** - Presque "outil de réflexion"

## 📝 License

Ce projet est sous licence MIT.

---

<div align="center">

Made with ✨ by DualArcana

</div>
