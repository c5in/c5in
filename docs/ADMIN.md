# Guide d'administration - C5IN (Export Statique)

## 🚀 Activation/Désactivation des pages

### Configuration actuelle
```
✅ Activé  : Accueil, À propos, Membres, Contact
❌ Désactivé : Blog, Événements, Publications, Partenaires
```

### Pour activer une nouvelle page

1. **Ouvrir** `lib/config.ts`
2. **Modifier** la configuration :
   ```typescript
   features: {
     pages: {
       blog: true,  // ← Changer false à true
     }
   }
   ```
3. **Reconstruire** : `npm run build` (pour la production)
4. **Ou redémarrer** : `npm run dev` (pour le développement)

### Protection avec export statique
- ✅ Vérification côté client (JavaScript)
- ✅ Navigation filtrée automatiquement
- ✅ Redirection 404 pour pages désactivées
- ✅ Compatible hébergement statique (Netlify, Vercel, etc.)

## 📋 Fonctionnement technique

### Export statique vs Serveur
- **Export statique** : `output: 'export'` dans `next.config.ts`
- **Protection côté client** : Vérification JavaScript dans le navigateur
- **Pas de middleware** : Non compatible avec l'export statique
- **Page 404 statique** : `pages/404.tsx`

### Avantages de l'approche
- 🚀 **Performance** : Site entièrement statique
- 🌍 **Déployable partout** : CDN, GitHub Pages, Netlify
- 🔒 **Sécurité** : Pas de serveur à maintenir
- 💰 **Coût réduit** : Hébergement gratuit possible

## 📁 Structure pour l'export statique

```
lib/config.ts           → Configuration des fonctionnalités
lib/features.ts         → Utilitaires de vérification
lib/static-routes.ts    → Gestion routes statiques
hooks/usePageAccess.tsx → Protection côté client
pages/404.tsx          → Page 404 statique
app/not-found.tsx       → 404 pour app router
```

## 🔧 Commandes importantes

```bash
# Développement
npm run dev

# Build statique pour production
npm run build

# Vérifier le build statique
npm run build && npm run start

# Export statique (génère ./out/)
npm run build
```

## 🎯 Stratégie de déploiement

### Phase 1 (Actuelle - Production Ready)
- ✅ Pages essentielles activées
- ✅ Export statique fonctionnel
- ✅ Prêt pour hébergement

### Phase 2 (Extension)
- 🎯 Activer blog quand contenu prêt
- 🎯 Publier articles régulièrement

### Phase 3 (Fonctionnalités avancées)
- 🎯 Événements avec système d'inscription
- 🎯 Publications scientifiques
- 🎯 Partenariats et collaborations

## ⚠️ Limitations export statique

- ❌ **Pas de middleware** Next.js
- ❌ **Pas de redirections** serveur
- ❌ **Pas d'API routes** serveur
- ✅ **Protection côté client** uniquement
- ✅ **Fonctionnalités statiques** seulement

## � Hébergement recommandé

### Gratuit
- **Netlify** : Deploy automatique + CDN
- **Vercel** : Optimisé pour Next.js
- **GitHub Pages** : Intégration Git

### Payant
- **AWS S3 + CloudFront** : Contrôle total
- **Azure Static Web Apps** : Intégration Microsoft

## 📞 Support technique

- Configuration : `lib/config.ts`
- Protection : `hooks/usePageAccess.tsx`
- 404 statique : `pages/404.tsx`
- Documentation : `/docs/FEATURES.md`