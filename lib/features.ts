import { siteConfig } from './config'

/**
 * Vérifie si une page est activée dans la configuration
 */
export function isPageEnabled(page: keyof typeof siteConfig.features.pages): boolean {
  return siteConfig.features.pages[page]
}

/**
 * Vérifie si un composant est activé dans la configuration
 */
export function isComponentEnabled(component: keyof typeof siteConfig.features.components): boolean {
  return siteConfig.features.components[component]
}

/**
 * Retourne la navigation filtrée avec seulement les pages activées
 */
export function getEnabledNavigation() {
  return siteConfig.navigation.filter(item => item.enabled !== false)
}

/**
 * Redirige vers la page 404 si la page est désactivée
 */
export function checkPageAccess(page: keyof typeof siteConfig.features.pages) {
  if (!isPageEnabled(page)) {
    throw new Error(`Page "${page}" is disabled`)
  }
}

/**
 * Middleware pour vérifier l'accès aux pages
 */
export async function withPageAccess<T>(
  page: keyof typeof siteConfig.features.pages,
  handler: () => Promise<T>
): Promise<T> {
  checkPageAccess(page)
  return handler()
}

/**
 * Configuration des pages par défaut
 */
const corePages = ['about', 'members', 'contact'] as const
const optionalPages = ['blog', 'events', 'publications', 'partners'] as const

export const pageConfig = {
  // Pages principales toujours activées
  core: corePages,
  
  // Pages optionnelles (peuvent être désactivées)
  optional: optionalPages,
  
  // Vérification si c'est une page core
  isCorePage: (page: string): page is typeof corePages[number] => 
    corePages.includes(page as typeof corePages[number]),
  
  // Vérification si c'est une page optionnelle
  isOptionalPage: (page: string): page is typeof optionalPages[number] => 
    optionalPages.includes(page as typeof optionalPages[number])
}