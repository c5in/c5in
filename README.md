# C5IN Website

Site web officiel du Cameroon Cloud-Edge-IoT Innovation Network (C5IN).

## Description

Ce projet est un site web statique développé avec Next.js 14+ et shadcn/ui, conçu pour présenter les activités, membres, événements et publications du réseau C5IN. Le site utilise une approche de gestion de contenu basée sur des fichiers Markdown pour faciliter la maintenance.

## Technologies

- **Framework:** Next.js 14+ avec App Router
- **UI:** shadcn/ui + Tailwind CSS
- **Langage:** TypeScript
- **Gestion de contenu:** Markdown avec front matter
- **Déploiement:** Génération statique (SSG)

## Structure du projet

```
c5in-website/
├── app/                          # Next.js App Router
│   ├── (pages)/                  # Pages groupées
│   ├── globals.css               # Styles globaux
│   ├── layout.tsx                # Layout principal
│   └── page.tsx                  # Page d'accueil
├── components/                   # Composants réutilisables
│   ├── ui/                      # shadcn/ui components
│   ├── layout/                  # Header, Footer, Navigation
│   ├── home/                    # Composants page d'accueil
│   └── content/                 # Composants contenu
├── content/                     # Contenu Markdown
│   ├── events/                  # Événements
│   ├── blog/                    # Articles de blog
│   ├── members/                 # Membres
│   └── publications/            # Publications
├── lib/                         # Utilitaires
├── types/                       # Types TypeScript
└── public/                      # Assets statiques
```

## Installation

1. Cloner le repository
2. Installer les dépendances :
   ```bash
   npm install
   ```

3. Copier le fichier d'environnement :
   ```bash
   cp .env.example .env.local
   ```

4. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```

## Scripts disponibles

- `npm run dev` - Serveur de développement
- `npm run build` - Build de production
- `npm run start` - Serveur de production
- `npm run lint` - Vérification du code
- `npm run type-check` - Vérification TypeScript
- `npm run export` - Export statique

## Gestion du contenu

Le contenu est géré via des fichiers Markdown dans le dossier `content/`. Chaque type de contenu a son propre dossier et utilise le front matter YAML pour les métadonnées.

### Exemple de structure d'un événement :

```markdown
---
title: "Workshop Cloud Computing 2025"
date: "2025-03-15"
location: "Campus Ngoa-Ekellé, Yaoundé"
tags: ["cloud", "workshop"]
featured: true
---

Description de l'événement...
```

## Déploiement

Le site est configuré pour la génération statique. Pour déployer :

1. Build le projet :
   ```bash
   npm run build
   ```

2. Les fichiers statiques sont générés dans le dossier `out/`

## Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité
3. Commit vos changements
4. Push vers la branche
5. Ouvrir une Pull Request
