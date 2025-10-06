# Système d'Annonces - Bannière d'Accueil ✅ FONCTIONNEL

## Vue d'ensemble

Le système d'annonces permet d'afficher une bannière attractive sur la page d'accueil, juste après la section hero. Cette bannière peut être utilisée pour :

- 📅 **Événements** : Workshops, conférences, formations
- 🚨 **Annonces urgentes** : Dates limites, informations importantes
- ℹ️ **Informations** : Nouveaux partenariats, actualités
- ⭐ **Contenus vedettes** : Publications, couverture médiatique

## ✅ État du Système

- **Boutons fonctionnels** : ✅ Les boutons d'action et de fermeture marchent parfaitement
- **Responsive** : ✅ S'adapte à tous les écrans
- **Animations** : ✅ Effets visuels fluides
- **Gestion d'état** : ✅ Fermeture et interactions fonctionnelles

## Comment utiliser

### 1. Modification rapide

Pour changer l'annonce affichée, éditez le fichier `/lib/announcements.ts` :

```typescript
// Activez l'annonce souhaitée en mettant active: true
{
  id: 'workshop-2025',
  active: true,  // ← Changez cette valeur
  // ... autres propriétés
}
```

### 2. Créer une nouvelle annonce

Ajoutez un nouvel objet dans le tableau `announcements` :

```typescript
{
  id: 'mon-annonce-unique',
  type: 'event', // 'event' | 'urgent' | 'info' | 'featured'
  title: 'Mon Titre d\'Annonce',
  message: 'Description détaillée de l\'annonce...',
  actionText: 'Bouton d\'action',
  actionUrl: '/lien-vers-page',
  date: 'Date optionnelle',
  dismissible: true,
  active: true,
  priority: 10 // Plus élevé = plus prioritaire
}
```

### 3. Types d'annonces disponibles

| Type | Couleur | Usage |
|------|---------|-------|
| `event` | Bleu | Événements, workshops, conférences |
| `urgent` | Rouge | Annonces urgentes, dates limites |
| `info` | Vert | Informations générales, partenariats |
| `featured` | Violet | Contenus vedettes, publications |

## Fonctionnalités

### ✨ Caractéristiques

- **Responsive** : S'adapte à tous les écrans
- **Animations** : Effets visuels subtils
- **Dismissible** : L'utilisateur peut fermer la bannière
- **Priorité** : Système de priorité pour gérer plusieurs annonces
- **Types visuels** : 4 styles différents avec couleurs et icônes

### 🎨 Design

- Gradients colorés selon le type
- Icônes contextuelles
- Badges informatifs
- Boutons d'action attractifs
- Animation de fond subtile

## Exemples d'utilisation

### Événement à venir
```typescript
{
  type: 'event',
  title: '🎉 Workshop IA & Cloud - Places Limitées !',
  message: 'Rejoignez notre workshop exclusif sur l\'IA dans le Cloud...',
  actionText: 'Réserver ma place',
  actionUrl: '/events/workshop-ia-cloud',
  date: '25 Février 2025'
}
```

### Annonce urgente
```typescript
{
  type: 'urgent',
  title: '⏰ Candidatures - Derniers Jours !',
  message: 'Il ne reste que 3 jours pour candidater au programme...',
  actionText: 'Candidater maintenant',
  actionUrl: '/candidature',
  date: 'Échéance: 31 Jan 2025'
}
```

### Information générale
```typescript
{
  type: 'info',
  title: '🤝 Nouveau Partenariat International',
  message: 'C5IN s\'associe avec l\'Université de Stanford...',
  actionText: 'En savoir plus',
  actionUrl: '/about'
}
```

### Contenu vedette
```typescript
{
  type: 'featured',
  title: '📚 Publication dans Nature Computing',
  message: 'Notre recherche sur l\'Edge Computing acceptée...',
  actionText: 'Lire l\'article',
  actionUrl: '/publications/nature-edge-computing'
}
```

## Gestion des annonces

### Activer/Désactiver
- Seules les annonces avec `active: true` sont affichées
- Si plusieurs annonces sont actives, celle avec la plus haute `priority` est affichée

### Priorités recommandées
- **10** : Événements majeurs, annonces critiques
- **8-9** : Publications importantes, partenariats majeurs
- **6-7** : Informations générales, actualités
- **1-5** : Contenus secondaires

### Bonnes pratiques
- ✅ Utilisez des titres courts et accrocheurs
- ✅ Ajoutez des emojis pour attirer l'attention
- ✅ Incluez un call-to-action clair
- ✅ Mettez à jour régulièrement
- ❌ Évitez les messages trop longs
- ❌ N'activez pas trop d'annonces simultanément