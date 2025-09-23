'use client'

import { Card, CardContent } from '@/components/ui/card'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel'
import { ExternalLink, Building2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Partner } from '@/types'
import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import type { CarouselApi } from '@/components/ui/carousel'
import { Route } from 'next'

interface PartnersCarouselProps {
  partners: Partner[]
  autoPlay?: boolean
}

export function PartnersCarousel({ partners, autoPlay = true }: PartnersCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const autoplayPlugin = autoPlay ? Autoplay({ delay: 3000, stopOnInteraction: true }) : undefined

  return (
    <section className="py-16 sm:py-24 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Nos Partenaires
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Découvrez les organisations qui nous accompagnent dans notre mission d&apos;innovation technologique
          </p>
        </div>
        
        {partners.length > 0 ? (
          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full max-w-5xl mx-auto"
              opts={{
                align: 'start',
                loop: true,
                dragFree: true,
                containScroll: 'trimSnaps',
              }}
              plugins={autoplayPlugin ? [autoplayPlugin] : undefined}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {partners.map((partner) => (
                  <CarouselItem key={partner.id} className="pl-2 md:pl-4 basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-slate-200 h-full">
                      <CardContent className="p-6 text-center h-full flex flex-col items-center justify-center">
                        {/* Partner Logo */}
                        <div className="relative w-full h-20 mb-4 flex items-center justify-center">
                          {partner.logo ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={partner.logo}
                                alt={partner.name}
                                fill
                                className="object-contain group-hover:scale-105 transition-transform duration-300 filter grayscale group-hover:grayscale-0"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded-lg">
                              <Building2 className="w-8 h-8 text-slate-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* Partner Name */}
                        <h3 className="text-sm font-semibold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors duration-300 text-center line-clamp-2">
                          {partner.name}
                        </h3>
                        
                        {/* Partner Description */}
                        {partner.description && (
                          <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-3 text-center">
                            {partner.description}
                          </p>
                        )}
                        
                        {/* Website Link */}
                        {partner.website && (
                          <Link
                            href={partner.website as Route}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300 mt-auto p-2 rounded touch-manipulation min-h-[44px] justify-center"
                            aria-label={`Visiter le site web de ${partner.name}`}
                          >
                            Visiter le site
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </Link>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              
              {/* Navigation Arrows */}
              <CarouselPrevious className="hidden sm:flex -left-12 bg-white border-slate-200 hover:bg-slate-50 shadow-md" />
              <CarouselNext className="hidden sm:flex -right-12 bg-white border-slate-200 hover:bg-slate-50 shadow-md" />
            </Carousel>
            
            {/* Dots Indicator */}
            {count > 1 && (
              <div className="flex justify-center space-x-3 mt-8">
                {Array.from({ length: count }).map((_, index) => (
                  <button
                    key={index}
                    className={`rounded-full transition-all duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center ${
                      index + 1 === current 
                        ? 'bg-blue-600' 
                        : 'bg-slate-300 hover:bg-slate-400 active:bg-slate-500'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Aller à la diapositive ${index + 1}`}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      index + 1 === current ? 'bg-white' : 'bg-white/70'
                    }`} />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <Building2 className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">
              Aucun partenaire à afficher
            </h3>
            <p className="text-slate-500">
              Nos partenariats seront bientôt présentés
            </p>
          </div>
        )}
      </div>
    </section>
  )
}