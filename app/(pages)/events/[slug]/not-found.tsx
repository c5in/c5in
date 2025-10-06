'use client'

import Link from 'next/link'
import { Calendar, ArrowLeft, Home, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { Card, CardContent } from '@/components/ui/card'

export default function EventNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PageHeader
        badge={{ icon: AlertTriangle, text: "Événement non trouvé" }}
        title="Événement introuvable"
        description="L'événement que vous recherchez n'existe pas ou n'est plus disponible."
        breadcrumb={[
          { label: "Événements", href: "/events", icon: Calendar },
          { label: "Erreur 404", icon: AlertTriangle }
        ]}
      />

      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-2xl mx-auto">
          {/* Error Visual */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-red-100 to-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="w-12 h-12 text-red-500" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Cet événement n&apos;existe pas
            </h2>
            
            <p className="text-gray-600 mb-8">
              L&apos;événement a peut-être été annulé, reporté, ou l&apos;URL est incorrecte. 
              Découvrez nos autres événements disponibles.
            </p>
          </div>

          {/* Action Cards */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            <Card className="border-2 border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors">
              <CardContent className="p-6 text-center">
                <Calendar className="w-8 h-8 text-orange-600 mx-auto mb-4" />
                <h3 className="font-semibold text-orange-900 mb-2">Voir tous les événements</h3>
                <p className="text-sm text-orange-700 mb-4">
                  Découvrez nos workshops, conférences et formations
                </p>
                <Link href="/events">
                  <Button className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Parcourir les événements
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors">
              <CardContent className="p-6 text-center">
                <Home className="w-8 h-8 text-gray-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">Retour à l&apos;accueil</h3>
                <p className="text-sm text-gray-700 mb-4">
                  Explorez toutes les sections de C5IN
                </p>
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Home className="w-4 h-4 mr-2" />
                    Page d&apos;accueil
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Navigation */}
          <div className="text-center">
            <Button 
              variant="ghost" 
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour à la page précédente
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}