'use client'

import { Card, CardContent } from '@/components/ui/card'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel'
import { Mail, Linkedin, Twitter, Github, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Member } from '@/types'
import { useEffect, useState } from 'react'
import Autoplay from 'embla-carousel-autoplay'
import type { CarouselApi } from '@/components/ui/carousel'
import { Route } from 'next'

interface MembersCarouselProps {
  members: Member[]
  autoPlay?: boolean
  showDots?: boolean
}

const socialIconMap = {
  linkedin: Linkedin,
  twitter: Twitter,
  github: Github,
  email: Mail,
}

export function MembersCarousel({ members, autoPlay = true, showDots = true }: MembersCarouselProps) {
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

  const autoplayPlugin = autoPlay ? Autoplay({ delay: 4000, stopOnInteraction: true }) : undefined

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Notre Équipe
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Rencontrez les experts et chercheurs qui font avancer l&apos;innovation technologique au Cameroun
          </p>
        </div>
        
        {members.length > 0 ? (
          <div className="relative">
            <Carousel
              setApi={setApi}
              className="w-full max-w-6xl mx-auto"
              opts={{
                align: 'start',
                loop: true,
                dragFree: true,
                containScroll: 'trimSnaps',
              }}
              plugins={autoplayPlugin ? [autoplayPlugin] : undefined}
            >
              <CarouselContent className="-ml-2 md:-ml-4">
                {members.map((member) => (
                  <CarouselItem key={member.id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
                    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-slate-200 h-full">
                      <CardContent className="p-6 text-center h-full flex flex-col">
                        {/* Member Photo */}
                        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-slate-100">
                          {member.photo ? (
                            <Image
                              src={member.photo}
                              alt={member.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-200">
                              <Users className="w-8 h-8 text-slate-400" />
                            </div>
                          )}
                        </div>
                        
                        {/* Member Info */}
                        <div className="flex-grow">
                          <h3 className="text-lg font-semibold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors duration-300">
                            {member.name}
                          </h3>
                          <p className="text-sm font-medium text-blue-600 mb-2">
                            {member.title}
                          </p>
                          {member.affiliation && (
                            <p className="text-sm text-slate-500 mb-4">
                              {member.affiliation}
                            </p>
                          )}
                          {member.bio && (
                            <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                              {member.bio}
                            </p>
                          )}
                        </div>
                        
                        {/* Social Links */}
                        {member.socialLinks && member.socialLinks.length > 0 && (
                          <div className="flex justify-center space-x-3 mt-auto">
                            {member.socialLinks.map((link) => {
                              const IconComponent = socialIconMap[link.platform as keyof typeof socialIconMap]
                              return (
                                <Link
                                  key={link.platform}
                                  href={link.url as Route}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 rounded-full bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300 touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                                  aria-label={`${member.name} sur ${link.platform}`}
                                >
                                  {IconComponent && <IconComponent className="w-4 h-4" />}
                                </Link>
                              )
                            })}
                          </div>
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
            {showDots && count > 1 && (
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
            
            {/* View All Members Link */}
            <div className="text-center mt-8">
              <Link 
                href={"/members" as Route}
                className="inline-flex items-center text-blue-700 hover:text-blue-800 font-medium transition-colors duration-300"
              >
                Voir Tous les Membres
                <Users className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">
              Aucun membre à afficher
            </h3>
            <p className="text-slate-500">
              L&apos;équipe sera bientôt présentée
            </p>
          </div>
        )}
      </div>
    </section>
  )
}