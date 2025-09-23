"use client"

import { useState } from 'react'
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
              size="sm"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
              className="h-9 w-9 p-0"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href as Route}
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 text-base font-medium transition-colors hover:bg-slate-50 hover:text-blue-600 ${
                    isActiveLink(item.href)
                      ? 'text-blue-600 bg-blue-50 border-l-4 border-blue-600'
                      : 'text-slate-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}