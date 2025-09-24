'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/config'
import { SocialLink, ContactInfo } from '@/types'
import type { Route } from 'next'

interface FooterProps {
  socialLinks?: SocialLink[]
  contactInfo?: ContactInfo
}

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
}

export function Footer({ 
  socialLinks = siteConfig.social, 
  contactInfo = siteConfig.contact 
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  // Navigation simplifiée basée sur votre config
  const essentialLinks = siteConfig.navigation.filter(item => 
    ['À propos', 'Événements', 'Blog', 'Contact'].includes(item.label)
  )

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          
          {/* Branding - Utilise votre config */}
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={siteConfig.logo}
                  alt={siteConfig.name}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-xl shadow-lg"
                />
                <div 
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full animate-pulse"
                  style={{ backgroundColor: siteConfig.theme.colors.accent }}
                ></div>
              </div>
              <div>
                <h3 
                  className="font-bold text-2xl bg-gradient-to-r bg-clip-text text-transparent"
                  style={{ 
                    backgroundImage: `linear-gradient(to right, ${siteConfig.theme.colors.primary}, ${siteConfig.theme.colors.accent})`,
                    fontFamily: siteConfig.theme.fonts.heading
                  }}
                >
                  {siteConfig.name}
                </h3>
                <p className="text-slate-400 text-sm">Innovation Network</p>
              </div>
            </div>
            
            <p 
              className="text-slate-300 text-lg leading-relaxed"
              style={{ fontFamily: siteConfig.theme.fonts.body }}
            >
              {siteConfig.description}
            </p>
            
            {/* Réseaux sociaux avec votre palette */}
            <div className="flex space-x-4">
              {socialLinks.map((link) => {
                const IconComponent = socialIcons[link.platform as keyof typeof socialIcons]
                if (!IconComponent) return null
                
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative p-3 bg-slate-800 rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    style={{
                      '--tw-shadow-color': `${siteConfig.theme.colors.accent}40`
                    } as React.CSSProperties}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = siteConfig.theme.colors.primary
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1e293b' // slate-800
                    }}
                    aria-label={`Suivez-nous sur ${link.platform}`}
                  >
                    <IconComponent className="h-5 w-5 text-slate-400 group-hover:text-white transition-colors" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 
              className="font-semibold text-white mb-6 text-lg"
              style={{ fontFamily: siteConfig.theme.fonts.heading }}
            >
              Navigation
            </h4>
            <ul className="space-y-4">
              {essentialLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as Route}
                    className="text-slate-400 transition-all duration-200 text-sm font-medium hover:translate-x-1 transform inline-block group"
                    style={{ fontFamily: siteConfig.theme.fonts.body }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = siteConfig.theme.colors.accent
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#94a3b8' // slate-400
                    }}
                  >
                    <span className="relative">
                      {item.label}
                      <span 
                        className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"
                        style={{ backgroundColor: siteConfig.theme.colors.accent }}
                      ></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 
              className="font-semibold text-white mb-6 text-lg"
              style={{ fontFamily: siteConfig.theme.fonts.heading }}
            >
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <MapPin 
                  className="h-5 w-5 mt-0.5 flex-shrink-0"
                  style={{ color: siteConfig.theme.colors.accent }}
                />
                <span 
                  className="text-slate-300 text-sm leading-relaxed"
                  style={{ fontFamily: siteConfig.theme.fonts.body }}
                >
                  {contactInfo.address}
                </span>
              </div>
              
              <div className="flex items-center space-x-3 group">
                <Mail 
                  className="h-5 w-5 flex-shrink-0"
                  style={{ color: siteConfig.theme.colors.accent }}
                />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-300 transition-colors text-sm"
                  style={{ fontFamily: siteConfig.theme.fonts.body }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = siteConfig.theme.colors.accent
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#d1d5db' // slate-300
                  }}
                >
                  {contactInfo.email}
                </a>
              </div>

              <div className="pt-4">
                <p 
                  className="text-slate-400 text-xs"
                  style={{ fontFamily: siteConfig.theme.fonts.body }}
                >
                  {contactInfo.hours}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Séparateur moderne */}
        <div 
          className="h-px mb-8"
          style={{
            background: `linear-gradient(to right, transparent, ${siteConfig.theme.colors.secondary}80, transparent)`
          }}
        ></div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <p 
            className="text-slate-400 text-sm"
            style={{ fontFamily: siteConfig.theme.fonts.body }}
          >
            © {currentYear}{' '}
            <span 
              className="font-medium"
              style={{ color: siteConfig.theme.colors.accent }}
            >
              {siteConfig.name}
            </span>
            {' '}- Tous droits réservés.
          </p>
          
          <div className="flex space-x-6">
            <Link
              href={"/privacy" as Route}
              className="text-slate-400 transition-colors text-sm"
              style={{ fontFamily: siteConfig.theme.fonts.body }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8'
              }}
            >
              Confidentialité
            </Link>
            <Link
              href={"/terms" as Route}
              className="text-slate-400 transition-colors text-sm"
              style={{ fontFamily: siteConfig.theme.fonts.body }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#94a3b8'
              }}
            >
              CGU
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}