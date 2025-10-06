"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'
import { getEnabledNavigation } from '@/lib/features'
import { NavigationItem } from '@/types'
import type { Route } from 'next'

interface HeaderProps {
  navigation?: NavigationItem[]
}

export function Header({ navigation }: HeaderProps) {
  // Utilise la navigation filtrée par défaut
  const enabledNavigation = navigation || getEnabledNavigation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    closeMobileMenu()
  }, [pathname])

  const isActiveLink = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname ? pathname.startsWith(href) : false
  }

  return (
    <header 
      className={`
        fixed top-0 z-50 w-full transition-all duration-500 ease-out
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-lg shadow-slate-900/5' 
          : 'bg-white/95 backdrop-blur-md border-b border-transparent'
        }
      `}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30 opacity-0 transition-opacity duration-500" 
           style={{ opacity: scrolled ? 0.5 : 0 }} />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with hover effect */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="group flex items-center space-x-3 rounded-xl p-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50" 
              onClick={closeMobileMenu}
            >
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  width={90}
                  height={40}
                  className="h-8 w-8 sm:h-10 sm:w-10 transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/20 to-purple-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation - Simplified active state */}
          <nav className="hidden md:flex md:items-center md:space-x-2">
            {enabledNavigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href as Route}
                className={`
                  group relative px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full
                  ${isActiveLink(item.href)
                    ? 'text-blue-600'
                    : 'text-slate-700 hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50'
                  }
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Simple underline for active items */}
                {isActiveLink(item.href) && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
                
                {/* Animated underline for non-active items on hover */}
                {!isActiveLink(item.href) && (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
                )}
                
                <span className="relative z-10">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Enhanced Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className={`
                h-12 w-12 p-0 touch-manipulation min-h-[48px] min-w-[48px] rounded-xl
                transition-all duration-300 transform hover:scale-105 active:scale-95
                ${isMobileMenuOpen 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25 rotate-180' 
                  : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-slate-700 hover:text-blue-600'
                }
              `}
            >
              <div className="relative">
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 transition-all duration-300" />
                ) : (
                  <Menu className="h-6 w-6 transition-all duration-300" />
                )}
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Fixed visibility */}
        <div 
          className={`
            md:hidden transition-all duration-500 ease-out overflow-hidden relative z-50
            ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          `}
          id="mobile-navigation"
        >
          <div className="space-y-2 pb-6 pt-4 border-t border-slate-200/50 bg-white rounded-b-2xl shadow-lg">
            {enabledNavigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href as Route}
                onClick={closeMobileMenu}
                className={`
                  group px-4 py-4 text-base font-medium transition-all duration-300
                  touch-manipulation min-h-[52px] flex items-center transform rounded-2xl mx-2 relative
                  hover:scale-[1.02] active:scale-[0.98]
                  ${isMobileMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-8 opacity-0'
                  }
                  ${isActiveLink(item.href)
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-slate-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }
                `}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                {/* Active indicator - bottom border only */}
                {isActiveLink(item.href) && (
                  <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
                
                <span className="relative z-10 flex items-center">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Backdrop - Simplified */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 md:hidden transition-opacity duration-300"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
      
      {/* Bottom gradient line */}
      <div className={`absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
    </header>
  )
}