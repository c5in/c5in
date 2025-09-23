import { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from './contact-form'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { siteConfig } from '@/lib/config'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Twitter, 
  Linkedin, 
  Github,
  ExternalLink
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez C5IN pour vos questions, collaborations ou pour rejoindre notre réseau d\'innovation.',
}

const socialIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  github: Github,
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          Contactez-nous
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Nous sommes là pour répondre à vos questions, discuter de collaborations 
          ou vous accompagner dans vos projets d&apos;innovation technologique.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-8">
              Informations de Contact
            </h2>
          </div>

          {/* Address */}
          <Card className="border-l-4 border-l-blue-600">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                Adresse
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700 leading-relaxed">
                {siteConfig.contact.address}
              </p>
            </CardContent>
          </Card>

          {/* Phone */}
          <Card className="border-l-4 border-l-green-600">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Phone className="h-6 w-6 text-green-600 mr-3" />
                Téléphone
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href={`tel:${siteConfig.contact.phone}`}
                className="text-slate-700 hover:text-green-600 transition-colors duration-200"
              >
                {siteConfig.contact.phone}
              </a>
            </CardContent>
          </Card>

          {/* Email */}
          <Card className="border-l-4 border-l-purple-600">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Mail className="h-6 w-6 text-purple-600 mr-3" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <a 
                href={`mailto:${siteConfig.contact.email}`}
                className="text-slate-700 hover:text-purple-600 transition-colors duration-200"
              >
                {siteConfig.contact.email}
              </a>
            </CardContent>
          </Card>

          {/* Hours */}
          <Card className="border-l-4 border-l-orange-600">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-xl">
                <Clock className="h-6 w-6 text-orange-600 mr-3" />
                Horaires d&apos;ouverture
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">
                {siteConfig.contact.hours}
              </p>
            </CardContent>
          </Card>

          {/* Social Media Links */}
          <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-slate-900">
                Suivez-nous
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                {siteConfig.social.map((social) => {
                  const IconComponent = socialIcons[social.platform as keyof typeof socialIcons]
                  if (!IconComponent) return null
                  
                  return (
                    <a
                      key={social.platform}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center w-12 h-12 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                      aria-label={`Suivez-nous sur ${social.platform}`}
                    >
                      <IconComponent className="h-5 w-5 text-slate-600 group-hover:text-blue-600" />
                    </a>
                  )
                })}
              </div>
              <p className="text-sm text-slate-600 mt-4">
                Restez informé de nos dernières actualités et événements
              </p>
            </CardContent>
          </Card>

          {/* Map Placeholder */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-slate-900">
                Localisation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-slate-300">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 font-medium">Carte interactive</p>
                  <p className="text-sm text-slate-500 mt-2">
                    Campus Ngoa-Ekellé, Université de Yaoundé I
                  </p>
                  <a
                    href="https://maps.google.com/?q=Campus+Ngoa-Ekellé+Université+de+Yaoundé+I"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Voir sur Google Maps
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-8">
            Envoyez-nous un message
          </h2>
          <Card>
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-16">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Vous souhaitez collaborer avec nous ?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Que vous soyez chercheur, étudiant, entrepreneur ou représentant d&apos;une organisation, 
              nous sommes ouverts à toutes les formes de collaboration pour faire avancer 
              l&apos;innovation technologique en Afrique centrale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                En savoir plus sur C5IN
              </Link>
              <Link
                href="/members"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Découvrir nos Membres
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}