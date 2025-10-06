'use client'

import { useEffect } from 'react'
import { isPageEnabled } from '@/lib/features'
import { siteConfig } from '@/lib/config'

/**
 * Hook pour vérifier et gérer l'accès aux pages (compatible export statique)
 */
export function usePageAccess(page: keyof typeof siteConfig.features.pages) {
  useEffect(() => {
    if (!isPageEnabled(page)) {
      // Redirection côté client pour l'export statique
      window.location.href = '/404'
    }
  }, [page])
  
  return {
    isEnabled: isPageEnabled(page),
    config: siteConfig.features.pages[page]
  }
}

/**
 * HOC pour protéger automatiquement une page (export statique)
 */
export function withPageProtection<P extends object>(
  Component: React.ComponentType<P>,
  page: keyof typeof siteConfig.features.pages
) {
  const ProtectedComponent = (props: P) => {
    const { isEnabled } = usePageAccess(page)
    
    // Si la page n'est pas activée, ne rien rendre (la redirection se fait via usePageAccess)
    if (!isEnabled) {
      return null
    }
    
    return <Component {...props} />
  }
  
  ProtectedComponent.displayName = `withPageProtection(${Component.displayName || Component.name})`
  
  return ProtectedComponent
}

/**
 * Composant wrapper pour protéger le contenu conditionnel
 */
interface FeatureGateProps {
  feature: keyof typeof siteConfig.features.pages | keyof typeof siteConfig.features.components
  type?: 'page' | 'component'
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function FeatureGate({ 
  feature, 
  type = 'page', 
  fallback = null, 
  children 
}: FeatureGateProps) {
  const isEnabled = type === 'page' 
    ? siteConfig.features.pages[feature as keyof typeof siteConfig.features.pages]
    : siteConfig.features.components[feature as keyof typeof siteConfig.features.components]
  
  if (!isEnabled) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

/**
 * Protection au niveau de la page pour l'export statique
 */
interface StaticPageGuardProps {
  page: keyof typeof siteConfig.features.pages
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function StaticPageGuard({ page, children, fallback }: StaticPageGuardProps) {
  const { isEnabled } = usePageAccess(page)
  
  if (!isEnabled) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}