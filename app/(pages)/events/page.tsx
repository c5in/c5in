import { Suspense } from 'react'
import { Metadata } from 'next'
import { enhancedEventsLoader } from '@/lib/content'
import { EventContent, PaginatedResult } from '@/types'
import { generateSEOMetadata } from '@/components/seo'
import EventsListing from './events-listing'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Événements',
  description: 'Découvrez tous les événements organisés par le Cameroon Cloud-Edge-IoT Innovation Network : workshops, conférences, séminaires et formations.',
  url: '/events',
  tags: ['événements', 'workshops', 'conférences', 'séminaires', 'formations', 'cloud computing'],
})

async function getEventsData() {
  const limit = 6

  try {
    // Get all events with pagination (first page)
    const result = await enhancedEventsLoader.getFiltered(
      {},
      { field: 'date', order: 'desc' },
      { page: 1, limit }
    ) as PaginatedResult<EventContent>

    // Get all available tags for filtering
    const allTags = await enhancedEventsLoader.getAllTags()

    return {
      result,
      allTags,
      error: null
    }
  } catch (error) {
    console.error('Error loading events:', error)
    return {
      result: {
        items: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
          limit
        }
      } as PaginatedResult<EventContent>,
      allTags: [],
      error: 'Erreur lors du chargement des événements'
    }
  }
}

function EventsLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 bg-gray-200 rounded mb-3"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="flex gap-2">
                <div className="h-6 bg-gray-200 rounded w-16"></div>
                <div className="h-6 bg-gray-200 rounded w-20"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default async function EventsPage() {
  const { result, allTags, error } = await getEventsData()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Événements</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Événements</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Découvrez tous les événements organisés par C5IN : workshops, conférences, 
          séminaires et formations dans les domaines du Cloud Computing, Edge Computing, 
          IoT, Green Computing et Federated Learning.
        </p>
      </div>

      <Suspense fallback={<EventsLoadingSkeleton />}>
        <EventsListing 
          initialData={result}
          allTags={allTags}
          searchParams={{}}
        />
      </Suspense>
    </div>
  )
}