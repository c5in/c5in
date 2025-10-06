'use client'

import Link from 'next/link'
import { PageHeader } from '@/components/ui/page-header'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  AlertTriangle, 
  Home, 
  ArrowLeft, 
  Search,
  BookOpen,
  Users,
  Calendar
} from 'lucide-react'

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Accueil',
      description: 'Retournez à la page principale',
      href: '/',
      icon: Home,
      color: 'blue'
    },
    {
      title: 'Blog',
      description: 'Découvrez nos derniers articles',
      href: '/blog',
      icon: BookOpen,
      color: 'green'
    },
    {
      title: 'Équipe',
      description: 'Rencontrez nos experts',
      href: '/members',
      icon: Users,
      color: 'purple'
    },
    {
      title: 'Événements',
      description: 'Nos prochains événements',
      href: '/events',
      icon: Calendar,
      color: 'orange'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PageHeader
        badge={{ icon: AlertTriangle, text: "Erreur 404" }}
        title="Page non trouvée"
        description="Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
        breadcrumb={[
          { label: "Erreur 404", icon: AlertTriangle }
        ]}
      />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Error Message */}
          <div className="text-center mb-16">
            <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-16 h-16 text-red-500" />
            </div>
            
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Oups ! Cette page est introuvable
            </h2>
            
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Il semble que la page que vous cherchez n&apos;existe pas. Elle a peut-être été supprimée, 
              déplacée ou vous avez saisi une URL incorrecte.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/">
                <Button size="lg" className="w-full sm:w-auto">
                  <Home className="w-5 h-5 mr-2" />
                  Retour à l&apos;accueil
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={() => window.history.back()}
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Page précédente
              </Button>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center text-gray-900 mb-8">
              Explorez nos sections populaires
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {quickLinks.map((link) => {
                const IconComponent = link.icon
                const colorClasses = {
                  blue: 'bg-blue-50 border-blue-200 text-blue-800 hover:bg-blue-100',
                  green: 'bg-green-50 border-green-200 text-green-800 hover:bg-green-100',
                  purple: 'bg-purple-50 border-purple-200 text-purple-800 hover:bg-purple-100',
                  orange: 'bg-orange-50 border-orange-200 text-orange-800 hover:bg-orange-100'
                }

                return (
                  <a key={link.href} href={link.href}>
                    <Card className={`h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${colorClasses[link.color as keyof typeof colorClasses]} border-2`}>
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 mx-auto mb-4 bg-white rounded-lg flex items-center justify-center shadow-sm">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold mb-2">{link.title}</h4>
                        <p className="text-sm opacity-80">{link.description}</p>
                      </CardContent>
                    </Card>
                  </a>
                )
              })}
            </div>
          </div>

          {/* Search Suggestion */}
          <div className="text-center">
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Vous cherchez quelque chose de précis ?
              </h3>
              <p className="text-gray-600 mb-6">
                Utilisez notre navigation principale ou contactez-nous pour obtenir de l&apos;aide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button variant="outline">
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline">
                    En savoir plus sur C5IN
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}