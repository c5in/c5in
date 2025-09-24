'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Route } from 'next'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { 
  Calendar, 
  MapPin, 
  Users, 
  X, 
  Star, 
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { EventContent, PaginatedResult } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ContentFilters } from '@/components/ui/content-filters'

interface EventsListingProps {
  initialData: PaginatedResult<EventContent>
  allTags: string[]
  searchParams: {
    page?: string
    tag?: string
    search?: string
  }
}

function EventCard({ event }: { event: EventContent }) {
  const eventDate = new Date(event.date)
  const endDate = event.endDate ? new Date(event.endDate) : null
  
  return (
    <Card className="h-full border-0 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] group overflow-hidden">
      {/* Card Header avec gradient */}
      <CardHeader className="relative pb-4">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        <div className="relative z-10 flex items-start justify-between">
          <CardTitle className="text-xl font-bold text-slate-900 line-clamp-2 pr-2">
            <Link 
              href={`/events/${event.slug}` as Route}
              className="hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text hover:text-transparent transition-all duration-300"
            >
              {event.title}
            </Link>
          </CardTitle>
          {event.featured && (
            <Badge className="ml-2 shrink-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 shadow-md">
              <Star className="w-3 h-3 mr-1" />
              À la une
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col pt-0">
        {/* Métadonnées avec icônes colorées */}
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm">
            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-lg border border-blue-100">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">
                {format(eventDate, 'dd MMM yyyy', { locale: fr })}
                {endDate && endDate.getTime() !== eventDate.getTime() && (
                  <span> - {format(endDate, 'dd MMM yyyy', { locale: fr })}</span>
                )}
              </span>
            </div>
          </div>
          
          <div className="flex items-center text-sm">
            <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-lg border border-emerald-100">
              <MapPin className="w-4 h-4" />
              <span className="line-clamp-1 font-medium">{event.location}</span>
            </div>
          </div>
          
          {event.speakers && event.speakers.length > 0 && (
            <div className="flex items-center text-sm">
              <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-lg border border-purple-100">
                <Users className="w-4 h-4" />
                <span className="font-medium">
                  {event.speakers.length} intervenant{event.speakers.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          )}
        </div>
        
        {/* Description */}
        <p className="text-slate-700 text-sm line-clamp-3 mb-4 flex-1 leading-relaxed">
          {event.excerpt || event.description}
        </p>
        
        {/* Tags */}
        {event.tags && event.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {event.tags.slice(0, 3).map((tag) => (
              <Link key={tag} href={`/events?tag=${encodeURIComponent(tag)}` as Route }>
                <Badge 
                  variant="outline" 
                  className="text-xs bg-white/60 border-slate-200 text-slate-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 cursor-pointer hover:shadow-sm"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
            {event.tags.length > 3 && (
              <Badge variant="outline" className="text-xs bg-slate-50 text-slate-500 border-slate-200">
                +{event.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link href={`/events/${event.slug}` as Route }>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white/60 border-slate-200 hover:bg-white hover:border-blue-300 hover:text-blue-600 transition-all duration-200 group"
            >
              Voir les détails
              <ArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          
          {event.registrationUrl && (
            <Link 
              href={event.registrationUrl as Route} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
              >
                <ExternalLink className="w-3 h-3 mr-2" />
                S&apos;inscrire
              </Button>
            </Link>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function Pagination({ pagination, baseUrl }: { 
  pagination: PaginatedResult<EventContent>['pagination']
  baseUrl: string 
}) {
  if (pagination.totalPages <= 1) return null

  const pages = []
  const maxVisiblePages = 5
  const startPage = Math.max(1, pagination.currentPage - Math.floor(maxVisiblePages / 2))
  const endPage = Math.min(pagination.totalPages, startPage + maxVisiblePages - 1)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardContent className="flex items-center space-x-2 p-4">
          {pagination.hasPreviousPage && (
            <Link href={`${baseUrl}&page=${pagination.currentPage - 1}` as Route}>
              <Button variant="outline" size="sm" className="bg-white/60 border-slate-200 hover:bg-white hover:border-blue-300">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Précédent
              </Button>
            </Link>
          )}
          
          {startPage > 1 && (
            <>
              <Link href={`${baseUrl}&page=1` as Route}>
                <Button 
                  variant={1 === pagination.currentPage ? "default" : "outline"} 
                  size="sm"
                  className={1 === pagination.currentPage ? 
                    "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : 
                    "bg-white/60 border-slate-200 hover:bg-white hover:border-blue-300"
                  }
                >
                  1
                </Button>
              </Link>
              {startPage > 2 && <span className="px-2 text-slate-400">...</span>}
            </>
          )}
          
          {pages.map((page) => (
            <Link key={page} href={`${baseUrl}&page=${page}` as Route}>
              <Button 
                variant={page === pagination.currentPage ? "default" : "outline"} 
                size="sm"
                className={page === pagination.currentPage ? 
                  "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : 
                  "bg-white/60 border-slate-200 hover:bg-white hover:border-blue-300"
                }
              >
                {page}
              </Button>
            </Link>
          ))}
          
          {endPage < pagination.totalPages && (
            <>
              {endPage < pagination.totalPages - 1 && <span className="px-2 text-slate-400">...</span>}
              <Link href={`${baseUrl}&page=${pagination.totalPages}` as Route }>
                <Button 
                  variant={pagination.totalPages === pagination.currentPage ? "default" : "outline"} 
                  size="sm"
                  className={pagination.totalPages === pagination.currentPage ? 
                    "bg-gradient-to-r from-blue-600 to-purple-600 text-white" : 
                    "bg-white/60 border-slate-200 hover:bg-white hover:border-blue-300"
                  }
                >
                  {pagination.totalPages}
                </Button>
              </Link>
            </>
          )}
          
          {pagination.hasNextPage && (
            <Link href={`${baseUrl}&page=${pagination.currentPage + 1}` as Route }>
              <Button variant="outline" size="sm" className="bg-white/60 border-slate-200 hover:bg-white hover:border-blue-300">
                Suivant
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default function EventsListing({ 
  initialData, 
  allTags, 
  searchParams 
}: EventsListingProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [selectedTag, setSelectedTag] = useState(searchParams.tag || '')

  const updateURL = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(urlSearchParams.toString())
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    
    // Reset page when filtering
    if (params.tag !== undefined) {
      newParams.delete('page')
    }
    
    const queryString = newParams.toString()
    router.push(`/events${queryString ? `?${queryString}` : ''}` as Route)
  }

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag)
    updateURL({ tag: tag === selectedTag ? undefined : tag })
  }

  const clearFilters = () => {
    setSelectedTag('')
    router.push('/events' as Route)
  }

  const hasActiveFilters = searchParams.tag

  const baseUrl = `/events?${new URLSearchParams({
    ...(searchParams.tag && { tag: searchParams.tag }),
  }).toString()}`

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        

        <ContentFilters
          availableTags={allTags}
          selectedTag={searchParams.tag}
          onTagFilter={handleTagFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={!!searchParams.tag}
        />

        <div className="space-y-8">

          {/* Results Summary */}
          <div className="flex items-center justify-between">
            <Card className="border-0 shadow-md bg-white/80 backdrop-blur-sm">
              <CardContent className="px-4 py-3">
                <div className="text-sm font-medium text-slate-700">
                  {initialData.pagination.totalItems > 0 ? (
                    <span className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                      {initialData.pagination.totalItems} événement{initialData.pagination.totalItems > 1 ? 's' : ''} trouvé{initialData.pagination.totalItems > 1 ? 's' : ''}
                      {hasActiveFilters && (
                        <Badge variant="outline" className="ml-2 text-xs bg-blue-50 border-blue-200 text-blue-700">
                          filtré{initialData.pagination.totalItems > 1 ? 's' : ''}
                        </Badge>
                      )}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-slate-500">
                      <X className="w-4 h-4" />
                      Aucun événement trouvé
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Events Grid */}
          {initialData.items.length > 0 ? (
            <>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {initialData.items.map((event) => (
                  <EventCard key={event.slug} event={event} />
                ))}
              </div>
              
              <Pagination pagination={initialData.pagination} baseUrl={baseUrl} />
            </>
          ) : (
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardContent className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Calendar className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-4">
                    Aucun événement trouvé
                  </h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">
                    {hasActiveFilters 
                      ? "Essayez de modifier vos critères de recherche ou de supprimer les filtres pour voir plus d'événements."
                      : "Il n'y a actuellement aucun événement programmé. Revenez bientôt pour découvrir nos prochains événements."
                    }
                  </p>
                  {hasActiveFilters && (
                    <Button 
                      onClick={clearFilters} 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      <Star className="w-4 h-4 mr-2" />
                      Voir tous les événements
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}