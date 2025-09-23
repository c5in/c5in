import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, MapPin, ArrowRight } from 'lucide-react'
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

  return (
    <section className="py-16 sm:py-24 bg-slate-50/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Événements à Venir
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Participez à nos événements et restez connecté avec la communauté C5IN
          </p>
        </div>
        
        {displayEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {displayEvents.map((event) => (
                <Card 
                  key={event.id} 
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-slate-200"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center text-sm text-slate-500 mb-2">
                      <Calendar className="w-4 h-4 mr-2" />
                      <time dateTime={new Date(event.date).toISOString()}>
                        {formatDate(event.date)}
                      </time>
                    </div>
                    <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2">
                      {event.title}
                    </CardTitle>
                    {event.location && (
                      <div className="flex items-center text-sm text-slate-500">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="line-clamp-1">{event.location}</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0">
                    <CardDescription className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-4">
                      {event.excerpt}
                    </CardDescription>
                    <Link 
                      href={`/events/${event.slug}` as Route}
                      className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors duration-300"
                    >
                      En savoir plus
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                variant="outline" 
                size="lg"
                className="border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white transition-all duration-300"
                asChild
              >
                <Link href={"/events" as Route}>
                  Voir Tous les Événements
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">
              Aucun événement à venir
            </h3>
            <p className="text-slate-500">
              Restez connecté pour être informé de nos prochains événements
            </p>
          </div>
        )}
      </div>
    </section>
  )
}