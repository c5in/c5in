import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter, Mail, Phone, MapPin, Clock } from 'lucide-react'
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

  return (
    <footer className="bg-slate-50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={40}
                height={40}
                className="h-10 w-10"
              />
              <span className="font-bold text-slate-900 text-lg">C5IN</span>
            </div>
            <p className="text-slate-600 mb-4 max-w-md">
              Cameroon Cloud-Edge-IoT Innovation Network - Réseau d&apos;innovation camerounais 
              spécialisé dans les technologies Cloud, Edge Computing et IoT.
            </p>
            
            {/* Social Links */}
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
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                    aria-label={`Suivez-nous sur ${link.platform}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Navigation</h3>
            <ul className="space-y-2">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href as Route}
                    className="text-slate-600 hover:text-blue-600 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-slate-400 mt-1 flex-shrink-0" />
                <span className="text-slate-600 text-sm">{contactInfo.address}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                >
                  {contactInfo.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400 flex-shrink-0" />
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-slate-600 hover:text-blue-600 transition-colors text-sm"
                >
                  {contactInfo.email}
                </a>
              </div>
              
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 text-slate-400 mt-1 flex-shrink-0" />
                <span className="text-slate-600 text-sm">{contactInfo.hours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-200 mt-8 pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-slate-500 text-sm">
              © {currentYear} C5IN - Cameroon Cloud-Edge-IoT Innovation Network. 
              Tous droits réservés.
            </p>
            
            <div className="flex space-x-6">
              <Link
                href={"/privacy" as Route}
                className="text-slate-500 hover:text-blue-600 transition-colors text-sm"
              >
                Politique de confidentialité
              </Link>
              <Link
                href={"/terms" as Route}
                className="text-slate-500 hover:text-blue-600 transition-colors text-sm"
              >
                Conditions d&apos;utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}