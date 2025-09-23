"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/lib/config'
import { NavigationItem } from '@/types'
import type { Route } from 'next'

interface HeaderProps {
  navigation?: NavigationItem[]
}

export function Header({ navigation = siteConfig.navigation }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    // Cleanup on unmount
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
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={90}
                height={40}
                className="h-8 w-8 sm:h-10 sm:w-10"
              />
              {/* <span className="hidden font-bold text-slate-900 sm:inline-block lg:text-lg">
                C5IN
              </span> */}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href as Route}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActiveLink(item.href)
                    ? 'text-blue-600 border-b-2 border-blue-600 pb-1'
                    : 'text-slate-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
              className="h-12 w-12 p-0 touch-manipulation min-h-[48px] min-w-[48px] rounded-lg hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          id="mobile-navigation"
        >
          <div className="space-y-1 pb-4 pt-3 border-t border-slate-200">
            {navigation.map((item, index) => (
              <Link
                key={item.href}
                href={item.href as Route}
                onClick={closeMobileMenu}
                className={`block px-4 py-4 text-base font-medium transition-all duration-200 touch-manipulation min-h-[52px] flex items-center transform rounded-lg mx-2 ${
                  isMobileMenuOpen 
                    ? 'translate-x-0 opacity-100' 
                    : '-translate-x-4 opacity-0'
                } ${
                  isActiveLink(item.href)
                    ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600 font-semibold'
                    : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600 active:bg-slate-100'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : '0ms'
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        {isMobileMenuOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
        )}
      </div>
    </header>
  )
}