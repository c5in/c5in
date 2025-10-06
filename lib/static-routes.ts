import { siteConfig } from './config'

/**
 * Génère la liste des routes statiques basée sur la configuration des fonctionnalités
 * Compatible avec l'export statique de Next.js
 */
export function generateStaticRoutes() {
  const routes = [
    '/', // Accueil toujours présent
  ]

  // Ajouter les pages activées
  if (siteConfig.features.pages.about) {
    routes.push('/about')
  }
  
  if (siteConfig.features.pages.contact) {
    routes.push('/contact')
  }
  
  if (siteConfig.features.pages.members) {
    routes.push('/members')
  }
  
  if (siteConfig.features.pages.blog) {
    routes.push('/blog')
  }
  
  if (siteConfig.features.pages.events) {
    routes.push('/events')
  }
  
  if (siteConfig.features.pages.publications) {
    routes.push('/publications')
  }
  
  if (siteConfig.features.pages.partners) {
    routes.push('/partners')
  }

  return routes
}

/**
 * Vérifie si une route doit être générée statiquement
 */
export function shouldGenerateRoute(route: string): boolean {
  const pageMapping: Record<string, keyof typeof siteConfig.features.pages> = {
    '/about': 'about',
    '/blog': 'blog',
    '/events': 'events',
    '/members': 'members',
    '/publications': 'publications',
    '/partners': 'partners',
    '/contact': 'contact'
  }

  // L'accueil est toujours généré
  if (route === '/') return true

  const pageKey = pageMapping[route]
  if (!pageKey) return false

  return siteConfig.features.pages[pageKey]
}

/**
 * Génère les redirections pour les pages désactivées
 * À utiliser dans next.config.ts
 */
export function generateRedirects() {
  const redirects: Array<{
    source: string
    destination: string
    permanent: boolean
  }> = []

  // Vérifier chaque page et créer une redirection si désactivée
  const pageRoutes = {
    '/about': 'about',
    '/blog': 'blog',
    '/events': 'events',
    '/members': 'members',
    '/publications': 'publications',
    '/partners': 'partners',
    '/contact': 'contact'
  } as const

  Object.entries(pageRoutes).forEach(([route, configKey]) => {
    if (!siteConfig.features.pages[configKey]) {
      redirects.push({
        source: route,
        destination: '/404',
        permanent: false
      })
      
      // Redirection pour les sous-routes aussi
      redirects.push({
        source: `${route}/:path*`,
        destination: '/404',
        permanent: false
      })
    }
  })

  return redirects
}