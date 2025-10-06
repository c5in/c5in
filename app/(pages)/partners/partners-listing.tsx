'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PageHeader } from '@/components/ui/page-header'
import { 
  Building2, 
  ExternalLink, 
  GraduationCap, 
  Factory, 
  FlaskConical,
  Landmark,
  Users,
  Globe,
  Handshake
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Route } from 'next'

interface Partner {
  id: string
  name: string
  logo: string
  website?: string
  description?: string
  type: 'academic' | 'industry' | 'research' | 'government'
  featured: boolean
}

interface PartnersListingProps {
  partnersByType: Record<string, Partner[]>
  totalPartners: number
}

const typeConfig = {
  academic: {
    title: 'Partenaires Académiques',
    description: 'Universités et écoles qui collaborent avec nous pour la formation et la recherche',
    icon: GraduationCap,
    color: 'blue',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-800'
  },
  industry: {
    title: 'Partenaires Industriels',
    description: 'Entreprises technologiques qui nous accompagnent dans l\'innovation',
    icon: Factory,
    color: 'green',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-800'
  },
  research: {
    title: 'Instituts de Recherche',
    description: 'Centres de recherche internationaux pour l\'excellence scientifique',
    icon: FlaskConical,
    color: 'purple',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-800'
  },
  government: {
    title: 'Partenaires Institutionnels',
    description: 'Organismes gouvernementaux et institutions publiques',
    icon: Landmark,
    color: 'orange',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-800'
  }
}

export function PartnersListing({ partnersByType, totalPartners }: PartnersListingProps) {
  const hasPartners = totalPartners > 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <PageHeader
        badge={{ icon: Handshake, text: "Nos Partenaires" }}
        title="Écosystème de Collaboration"
        description="Découvrez les organisations qui nous accompagnent dans notre mission d'innovation technologique au Cameroun et en Afrique centrale."
        breadcrumb={[
          { label: "Partenaires", icon: Handshake }
        ]}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            {totalPartners} Partenaires
          </span>
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            {Object.keys(partnersByType).length} Secteurs
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            5 Pays
          </span>
        </div>
      </PageHeader>

      <div className="container mx-auto px-4 pb-16">
        {hasPartners ? (
          <div className="space-y-16">
            {Object.entries(partnersByType).map(([type, partners]) => {
              const config = typeConfig[type as keyof typeof typeConfig]
              if (!config || partners.length === 0) return null

              const IconComponent = config.icon

              return (
                <section key={type} className="space-y-8">
                  {/* Section Header */}
                  <div className="text-center">
                    <div className={`inline-flex items-center gap-3 ${config.bgColor} ${config.textColor} px-6 py-3 rounded-full mb-4`}>
                      <IconComponent className="h-5 w-5" />
                      <span className="font-semibold">{config.title}</span>
                      <Badge variant="secondary" className="ml-2">
                        {partners.length}
                      </Badge>
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      {config.description}
                    </p>
                  </div>

                  {/* Partners Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {partners.map((partner) => (
                      <Card 
                        key={partner.id} 
                        className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${config.borderColor} border-2`}
                      >
                        <CardContent className="p-6 text-center h-full flex flex-col">
                          {/* Partner Logo */}
                          <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                            {partner.logo ? (
                              <div className="relative w-full h-full">
                                <Image
                                  src={partner.logo}
                                  alt={partner.name}
                                  fill
                                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg">
                                <Building2 className="w-8 h-8 text-gray-400" />
                              </div>
                            )}
                          </div>
                          
                          {/* Partner Name */}
                          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors duration-300">
                            {partner.name}
                          </h3>
                          
                          {/* Partner Description */}
                          {partner.description && (
                            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-grow">
                              {partner.description}
                            </p>
                          )}
                          
                          {/* Featured Badge */}
                          {partner.featured && (
                            <Badge className="mb-4 bg-yellow-100 text-yellow-800 border-yellow-200">
                              Partenaire Principal
                            </Badge>
                          )}
                          
                          {/* Website Link */}
                          {partner.website && (
                            <Link
                              href={partner.website as Route}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="mt-auto"
                            >
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="w-full group-hover:bg-blue-50 group-hover:border-blue-200 group-hover:text-blue-700 transition-colors"
                              >
                                <Globe className="w-4 h-4 mr-2" />
                                Visiter le site
                                <ExternalLink className="w-3 h-3 ml-2" />
                              </Button>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Aucun partenaire à afficher
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Nos partenariats seront bientôt présentés. Revenez bientôt pour découvrir 
              notre écosystème de collaboration.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Devenir Partenaire</h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                Rejoignez notre écosystème d&apos;innovation et participez à la transformation 
                numérique de l&apos;Afrique centrale.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg">
                    <Handshake className="mr-2 h-5 w-5" />
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}