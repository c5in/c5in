import { Suspense } from 'react'
import { Metadata } from 'next'
import { enhancedPublicationsLoader } from '@/lib/content'
import { PublicationContent, PaginatedResult } from '@/types'
import PublicationsListing from './publications-listing'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Publications | C5IN',
  description: 'Découvrez les publications scientifiques du Cameroon Cloud-Edge-IoT Innovation Network : articles de journaux, actes de conférences, thèses et rapports de recherche.',
  openGraph: {
    title: 'Publications | C5IN',
    description: 'Découvrez les publications scientifiques du Cameroon Cloud-Edge-IoT Innovation Network : articles de journaux, actes de conférences, thèses et rapports de recherche.',
    type: 'website',
  },
}

async function getPublicationsData() {
  const limit = 9

  try {
    // Get all publications with pagination (first page)
    const result = await enhancedPublicationsLoader.getFiltered(
      {},
      { field: 'date', order: 'desc' },
      { page: 1, limit }
    ) as PaginatedResult<PublicationContent>

    // Get all available tags for filtering
    const allTags = await enhancedPublicationsLoader.getAllTags()

    // Get unique publication types
    const allPublications = await enhancedPublicationsLoader.getAll()
    const publicationTypes = [...new Set(allPublications.map(pub => pub.type))].sort()

    // Get unique years
    const years = [...new Set(allPublications.map(pub => {
      const date = new Date(pub.date)
      return date.getFullYear()
    }))].sort((a, b) => b - a)

    return {
      result,
      allTags,
      publicationTypes,
      years,
      error: null
    }
  } catch (error) {
    console.error('Error loading publications:', error)
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
      } as PaginatedResult<PublicationContent>,
      allTags: [],
      publicationTypes: [],
      years: [],
      error: 'Erreur lors du chargement des publications'
    }
  }
}

function PublicationsLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
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

export default async function PublicationsPage() {
  const { result, allTags, publicationTypes, years, error } = await getPublicationsData()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Publications</h1>
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
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Publications</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Découvrez les publications scientifiques de C5IN : articles de journaux, 
          actes de conférences, thèses et rapports de recherche dans les domaines du 
          Cloud Computing, Edge Computing, IoT, Green Computing et Federated Learning.
        </p>
      </div>

      <Suspense fallback={<PublicationsLoadingSkeleton />}>
        <PublicationsListing 
          initialData={result}
          allTags={allTags}
          publicationTypes={publicationTypes}
          years={years}
          searchParams={{}}
        />
      </Suspense>
    </div>
  )
}