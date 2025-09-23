'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Route } from 'next'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { 
  BookOpen, 
  Users, 
  Search, 
  Filter, 
  X, 
  Download, 
  ExternalLink,
  Calendar,
  Building,
  Quote,
  SortAsc,
  SortDesc
} from 'lucide-react'
import { PublicationContent, PaginatedResult } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface PublicationsListingProps {
  initialData: PaginatedResult<PublicationContent>
  allTags: string[]
  publicationTypes: string[]
  years: number[]
  searchParams: {
    page?: string
    tag?: string
    search?: string
    type?: string
    year?: string
    sort?: string
    order?: string
  }
}

const publicationTypeLabels: Record<string, string> = {
  journal: 'Article de journal',
  conference: 'Acte de conférence',
  workshop: 'Workshop',
  thesis: 'Thèse'
}

const publicationTypeColors: Record<string, string> = {
  journal: 'bg-blue-100 text-blue-800',
  conference: 'bg-green-100 text-green-800',
  workshop: 'bg-yellow-100 text-yellow-800',
  thesis: 'bg-purple-100 text-purple-800'
}

function PublicationCard({ publication }: { publication: PublicationContent }) {
  const publicationDate = new Date(publication.date)
  const [showCitation, setShowCitation] = useState(false)
  
  // Generate citation format (APA style)
  const generateCitation = () => {
    const authors = publication.authors.join(', ')
    const year = publicationDate.getFullYear()
    const title = publication.title
    const journal = publication.journal
    const doi = publication.doi ? `https://doi.org/${publication.doi}` : ''
    
    return `${authors} (${year}). ${title}. ${journal}.${doi ? ` ${doi}` : ''}`
  }
  
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge 
            className={`${publicationTypeColors[publication.type]} text-xs font-medium`}
          >
            {publicationTypeLabels[publication.type]}
          </Badge>
          {publication.featured && (
            <Badge variant="secondary" className="ml-2 shrink-0">
              À la une
            </Badge>
          )}
        </div>
        
        <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
          {publication.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 shrink-0" />
            <span className="line-clamp-2">
              {publication.authors.join(', ')}
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Building className="w-4 h-4 mr-2 shrink-0" />
            <span className="line-clamp-1">{publication.journal}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 shrink-0" />
            <span>
              {format(publicationDate, 'MMMM yyyy', { locale: fr })}
            </span>
          </div>
          
          {publication.doi && (
            <div className="flex items-center text-sm text-gray-600">
              <ExternalLink className="w-4 h-4 mr-2 shrink-0" />
              <span className="font-mono text-xs">DOI: {publication.doi}</span>
            </div>
          )}
        </div>
        
        <div className="mb-4 flex-1">
          <p className="text-gray-700 text-sm line-clamp-4">
            {publication.abstract}
          </p>
        </div>
        
        {publication.tags && publication.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {publication.tags.slice(0, 3).map((tag) => (
              <Link key={tag} href={`/publications?tag=${encodeURIComponent(tag)}` as Route}>
                <Badge 
                  variant="outline" 
                  className="text-xs hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
            {publication.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{publication.tags.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between pt-4 border-t gap-2">
          <div className="flex gap-2">
            {publication.pdfUrl && (
              <Link 
                href={publication.pdfUrl as Route} 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  PDF
                </Button>
              </Link>
            )}
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowCitation(!showCitation)}
            >
              <Quote className="w-4 h-4 mr-1" />
              Citer
            </Button>
          </div>
          
          {publication.doi && (
            <Link 
              href={`https://doi.org/${publication.doi}` as Route} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="sm">
                <ExternalLink className="w-4 h-4 mr-1" />
                DOI
              </Button>
            </Link>
          )}
        </div>
        
        {showCitation && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
            <p className="text-xs text-gray-700 font-mono leading-relaxed">
              {generateCitation()}
            </p>
            <Button
              variant="ghost"
              size="sm"
              className="mt-2 text-xs"
              onClick={() => navigator.clipboard.writeText(generateCitation())}
            >
              Copier la citation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function Pagination({ pagination, baseUrl }: { 
  pagination: PaginatedResult<PublicationContent>['pagination']
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
    <div className="flex items-center justify-center space-x-2 mt-8">
      {pagination.hasPreviousPage && (
        <Link href={`${baseUrl}&page=${pagination.currentPage - 1}` as Route}>
          <Button variant="outline" size="sm">
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
            >
              1
            </Button>
          </Link>
          {startPage > 2 && <span className="px-2">...</span>}
        </>
      )}
      
      {pages.map((page) => (
        <Link key={page} href={`${baseUrl}&page=${page}` as Route}>
          <Button 
            variant={page === pagination.currentPage ? "default" : "outline"} 
            size="sm"
          >
            {page}
          </Button>
        </Link>
      ))}
      
      {endPage < pagination.totalPages && (
        <>
          {endPage < pagination.totalPages - 1 && <span className="px-2">...</span>}
          <Link href={`${baseUrl}&page=${pagination.totalPages}` as Route}>
            <Button 
              variant={pagination.totalPages === pagination.currentPage ? "default" : "outline"} 
              size="sm"
            >
              {pagination.totalPages}
            </Button>
          </Link>
        </>
      )}
      
      {pagination.hasNextPage && (
        <Link href={`${baseUrl}&page=${pagination.currentPage + 1}` as Route}>
          <Button variant="outline" size="sm">
            Suivant
          </Button>
        </Link>
      )}
    </div>
  )
}

export default function PublicationsListing({ 
  initialData, 
  allTags, 
  publicationTypes,
  years,
  searchParams 
}: PublicationsListingProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState(searchParams.search || '')
  const [selectedTag, setSelectedTag] = useState(searchParams.tag || '')
  const [selectedType, setSelectedType] = useState(searchParams.type || '')
  const [selectedYear, setSelectedYear] = useState(searchParams.year || '')
  const [sortField, setSortField] = useState(searchParams.sort || 'date')
  const [sortOrder, setSortOrder] = useState(searchParams.order || 'desc')
  const [showFilters, setShowFilters] = useState(false)

  const updateURL = (params: Record<string, string | undefined>) => {
    const newParams = new URLSearchParams(urlSearchParams.toString())
    
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    
    // Reset page when filtering or sorting
    if (params.tag !== undefined || params.search !== undefined || 
        params.type !== undefined || params.year !== undefined ||
        params.sort !== undefined || params.order !== undefined) {
      newParams.delete('page')
    }
    
    const queryString = newParams.toString()
    router.push(`/publications${queryString ? `?${queryString}` : ''}` as Route)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateURL({ search: searchQuery || undefined })
  }

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? '' : tag)
    updateURL({ tag: tag === selectedTag ? undefined : tag })
  }

  const handleTypeFilter = (type: string) => {
    setSelectedType(type === selectedType ? '' : type)
    updateURL({ type: type === selectedType ? undefined : type })
  }

  const handleYearFilter = (year: string) => {
    setSelectedYear(year === selectedYear ? '' : year)
    updateURL({ year: year === selectedYear ? undefined : year })
  }

  const handleSort = (field: string) => {
    const newOrder = field === sortField && sortOrder === 'desc' ? 'asc' : 'desc'
    setSortField(field)
    setSortOrder(newOrder)
    updateURL({ sort: field, order: newOrder })
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTag('')
    setSelectedType('')
    setSelectedYear('')
    setSortField('date')
    setSortOrder('desc')
    router.push('/publications' as Route)
  }

  const hasActiveFilters = searchParams.search || searchParams.tag || 
                          searchParams.type || searchParams.year

  const baseUrl = `/publications?${new URLSearchParams({
    ...(searchParams.search && { search: searchParams.search }),
    ...(searchParams.tag && { tag: searchParams.tag }),
    ...(searchParams.type && { type: searchParams.type }),
    ...(searchParams.year && { year: searchParams.year }),
    ...(searchParams.sort && { sort: searchParams.sort }),
    ...(searchParams.order && { order: searchParams.order }),
  }).toString()}`

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Rechercher une publication..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </form>
          
          {/* Sort Options */}
          <div className="flex gap-2">
            <Select value={sortField} onValueChange={(value) => handleSort(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Trier par" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="title">Titre</SelectItem>
                <SelectItem value="type">Type</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSort(sortField)}
              className="px-3"
            >
              {sortOrder === 'desc' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
            </Button>
          </div>
          
          {/* Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:w-auto"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtres
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {(searchParams.search ? 1 : 0) + (searchParams.tag ? 1 : 0) + 
                 (searchParams.type ? 1 : 0) + (searchParams.year ? 1 : 0)}
              </Badge>
            )}
          </Button>
          
          {hasActiveFilters && (
            <Button variant="ghost" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Effacer
            </Button>
          )}
        </div>
        
        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t space-y-4">
            {/* Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Type de publication</h3>
              <div className="flex flex-wrap gap-2">
                {publicationTypes.map((type) => (
                  <Button
                    key={type}
                    variant={selectedType === type ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTypeFilter(type)}
                    className="text-xs"
                  >
                    {publicationTypeLabels[type]}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Year Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Année</h3>
              <div className="flex flex-wrap gap-2">
                {years.map((year) => (
                  <Button
                    key={year}
                    variant={selectedYear === year.toString() ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleYearFilter(year.toString())}
                    className="text-xs"
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
            
            {/* Tag Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrer par tag</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagFilter(tag)}
                    className="text-xs"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {initialData.pagination.totalItems > 0 ? (
            <>
              {initialData.pagination.totalItems} publication{initialData.pagination.totalItems > 1 ? 's' : ''} trouvée{initialData.pagination.totalItems > 1 ? 's' : ''}
              {hasActiveFilters && (
                <span className="ml-2">
                  (filtré{initialData.pagination.totalItems > 1 ? 's' : ''})
                </span>
              )}
            </>
          ) : (
            'Aucune publication trouvée'
          )}
        </div>
      </div>

      {/* Publications Grid */}
      {initialData.items.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initialData.items.map((publication) => (
              <PublicationCard key={publication.slug} publication={publication} />
            ))}
          </div>
          
          <Pagination pagination={initialData.pagination} baseUrl={baseUrl} />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune publication trouvée
            </h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters 
                ? "Essayez de modifier vos critères de recherche ou de supprimer les filtres."
                : "Il n'y a actuellement aucune publication disponible."
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Voir toutes les publications
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}