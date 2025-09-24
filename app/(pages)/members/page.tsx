import { Suspense } from 'react'
import { Metadata } from 'next'
import { enhancedMembersLoader } from '@/lib/content'
import { Member, PaginatedResult } from '@/types'
import { generateSEOMetadata } from '@/components/seo'
import MembersListing from './members-listing'
import { Card, CardContent } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'
import { Users } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Membres',
  description: 'Découvrez l\'équipe d\'experts du Cameroon Cloud-Edge-IoT Innovation Network : chercheurs, professeurs et spécialistes dans les domaines du cloud computing, edge computing, IoT, green computing et federated learning.',
  url: '/members',
  tags: ['membres', 'équipe', 'chercheurs', 'professeurs', 'experts', 'spécialistes'],
})

async function getMembersData() {
  const limit = 12

  try {
    // Get all members with pagination (first page)
    const result = await enhancedMembersLoader.getFiltered(
      {},
      { field: 'order', order: 'asc' },
      { page: 1, limit }
    ) as PaginatedResult<Member>

    // Get all available affiliations for filtering
    const allMembers = await enhancedMembersLoader.getAll()
    const affiliations = [...new Set(allMembers.map(member => member.affiliation))].sort()

    return {
      result,
      affiliations,
      error: null
    }
  } catch (error) {
    console.error('Error loading members:', error)
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
      } as PaginatedResult<Member>,
      affiliations: [],
      error: 'Erreur lors du chargement des membres'
    }
  }
}

function MembersLoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded w-96 animate-pulse"></div>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6 text-center">
              <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded mb-4 w-3/4 mx-auto"></div>
              <div className="h-20 bg-gray-200 rounded mb-4"></div>
              <div className="flex justify-center gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-8 w-8 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default async function MembersPage() {
  const { result, affiliations, error } = await getMembersData()

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Membres</h1>
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br pt-16 from-gray-50 to-white">
      <PageHeader
        badge={{ icon: Users, text: "Équipe C5IN" }}
        title="Nos Experts"
        subtitle="Chercheurs & Innovateurs"
        description="Découvrez l'équipe d'experts du C5IN : chercheurs, professeurs et spécialistes qui façonnent l'avenir des technologies cloud, edge computing, IoT, green computing et federated learning en Afrique."
        stats={[
          { value: result.pagination.totalItems, label: "Membres", color: "blue" },
          { value: affiliations.length, label: "Institutions", color: "green" },
          { value: "5", label: "Domaines", color: "purple" },
          { value: "15+", label: "Publications", color: "orange" }
        ]}
      />

      <div className="container mx-auto px-4  pb-12">
        <Suspense fallback={<MembersLoadingSkeleton />}>
          <MembersListing 
            initialData={result}
            affiliations={affiliations}
            searchParams={{}}
          />
        </Suspense>
      </div>
    </div>
  )
}