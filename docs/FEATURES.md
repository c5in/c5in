# Configuration des fonctionnalités (Export Statique)

## Vue d'ensemble

Le site C5IN utilise un système de configuration flexible pour activer/désactiver des pages et composants. Compatible avec l'export statique de Next.js (`output: 'export'`).

## Configuration

### Fichier de configuration : `lib/config.ts`

```typescript
features: {
  pages: {
    about: true,        // Page À propos
    blog: false,        // Blog (désactivé)
    events: false,      // Événements (désactivé)
    members: true,      // Membres
    publications: false, // Publications (désactivé)
    partners: false,    // Partenaires (désactivé)
    contact: true       // Contact
  },
  components: {
    search: false,      // Recherche
    newsletter: false,  // Newsletter
    analytics: false,   // Analytics
    darkMode: false     // Mode sombre
  }
}
```

## Fonctionnement avec l'export statique

### Protection côté client
- **Vérification JavaScript** : Pages protégées côté navigateur
- **Navigation filtrée** : Seules les pages activées apparaissent
- **Redirection 404** : Pages désactivées redirigent automatiquement

### Génération conditionnelle
- **Routes statiques** : Seulement les pages activées sont générées
- **Redirections Next.js** : Configuration automatique des redirects
- **Pas de middleware** : Compatible avec `output: 'export'`

## Comment activer une page

1. Ouvrir `lib/config.ts`
2. Modifier la valeur correspondante dans `features.pages`
3. Reconstruire pour la production : `npm run build`

Exemple pour activer le blog :
```typescript
features: {
  pages: {
    blog: true,  // Changé de false à true
  }
}
```

## Avantages de l'approche statique

✅ **Export statique** : Compatible avec hébergement statique  
✅ **Performance** : Pas de vérification serveur  
✅ **SEO optimal** : Pages désactivées non générées  
✅ **CDN friendly** : Déployable partout  
✅ **Sécurité** : Pas de logique serveur

### Hooks et utilitaires
- `usePageAccess()` : Hook pour vérifier l'accès dans les composants
- `isPageEnabled()` : Fonction utilitaire
- `getEnabledNavigation()` : Navigation filtrée
- `FeatureGate` : Composant pour du contenu conditionnel

### Exemple d'utilisation dans un composant

```tsx
import { FeatureGate } from '@/hooks/usePageAccess'

function HomePage() {
  return (
    <div>
      <h1>Accueil</h1>
      
      <FeatureGate feature="blog">
        <section>
          <h2>Derniers articles</h2>
          {/* Contenu affiché seulement si blog activé */}
        </section>
      </FeatureGate>
    </div>
  )
}
```

## Stratégie de déploiement

### Phase 1 (Actuelle)
- Pages essentielles uniquement
- Focus sur le contenu stable

### Phase 2 (Prochaine)
- Activation du blog
- Première publication d'articles

### Phase 3 (Future)
- Événements et workshops
- Système de publications scientifiques
- Partenariats

## Avantages

✅ **Contrôle total** : Activation progressive des fonctionnalités  
✅ **SEO optimal** : Pas de pages vides indexées  
✅ **Maintenance simplifiée** : Code propre et organisé  
✅ **Expérience utilisateur** : Navigation claire et cohérente  
✅ **Développement agile** : Déploiement par étapes