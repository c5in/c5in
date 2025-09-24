import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, ArrowRight, Star, Sparkles, Clock } from 'lucide-react'
import Link from 'next/link'
import { EventPreview } from '@/types'
import { Route } from 'next'

interface EventsPreviewProps {
  events: EventPreview[]
  maxItems: number
}

export function EventsPreview({ events, maxItems }: EventsPreviewProps) {
  const displayEvents = events.slice(0, maxItems)

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date))
  }

  const formatTime = (date: Date | string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-br from-slate-50 via-blue-50/40 to-purple-50/40 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-blue-200/50">
            <Sparkles className="w-4 h-4" />
            Événements à venir
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
              Rejoignez nos
            </span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Événements Exclusifs
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Participez à nos événements et restez connecté avec la communauté C5IN. 
            Découvrez nos conférences, ateliers et rencontres professionnelles.
          </p>
        </div>
        
        {displayEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16">
              {displayEvents.map((event, index) => (
                <Card 
                  key={event.id} 
                  className="group h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:rotate-1 relative overflow-hidden"
                >
                  {/* Card background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Featured badge for first event */}
                  {index === 0 && (
                    <div className="absolute top-3 right-3 z-10">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                        <Star className="w-3 h-3" />
                        À la une
                      </div>
                    </div>
                  )}
                  
                  <CardHeader className="pb-4 relative z-10">
                    {/* Date badge */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg border border-blue-200/50">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={new Date(event.date).toISOString()} className="text-sm font-semibold">
                          {formatDate(event.date)}
                        </time>
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg font-bold text-slate-900 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 line-clamp-2 leading-tight mb-3">
                      {event.title}
                    </CardTitle>
                    
                    <div className="space-y-2">
                      {event.location && (
                        <div className="flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-2 rounded-lg border border-emerald-200/50">
                          <MapPin className="w-4 h-4" />
                          <span className="line-clamp-1 text-sm font-medium">{event.location}</span>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 bg-orange-100 text-orange-700 px-3 py-2 rounded-lg border border-orange-200/50">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm font-medium">{formatTime(event.date)}</span>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 relative z-10 flex flex-col flex-1">
                    <CardDescription className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 flex-1">
                      {event.excerpt}
                    </CardDescription>
                    
                    <Link 
                      href={`/events/${event.slug}` as Route}
                      className="inline-flex items-center justify-center w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg group-hover:shadow-xl"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <div className="inline-block p-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg">
                <Button 
                  size="lg"
                  className="bg-white text-slate-900 hover:bg-slate-50 border-0 font-bold text-lg px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  asChild
                >
                  <Link href={"/events" as Route} className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5" />
                    Découvrir Tous nos Événements
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
              </div>
              
              <p className="text-sm text-slate-500 mt-4 max-w-md mx-auto">
                Plus de 50 événements organisés chaque année pour développer vos compétences
              </p>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Card className="max-w-md mx-auto border-0 bg-white/80 backdrop-blur-sm shadow-xl">
              <CardContent className="p-12">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="w-12 h-12 text-slate-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-4">
                  Nouveaux événements en préparation
                </h3>
                
                <p className="text-slate-600 leading-relaxed mb-6">
                  Notre équipe prépare de nouveaux événements passionnants. 
                  Restez connecté pour être le premier informé !
                </p>
                
                <div className="space-y-3">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                    asChild
                  >
                    <Link href={"/newsletter" as Route} className="flex items-center justify-center gap-2">
                      <Star className="w-4 h-4" />
                      S&apos;abonner aux notifications
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline"
                    className="w-full border-slate-200 text-slate-600 hover:bg-slate-50 py-3 rounded-xl"
                    asChild
                  >
                    <Link href="/events" className="flex items-center justify-center gap-2">
                      Voir l&apos;historique des événements
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}