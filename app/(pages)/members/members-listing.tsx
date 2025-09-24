'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Route } from 'next'
import { Mail, Linkedin, Twitter, Github, ExternalLink, Users, GraduationCap } from 'lucide-react'
import { Member, PaginatedResult } from '@/types'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ContentFilters } from '@/components/ui/content-filters'

interface MembersListingProps {
  initialData: PaginatedResult<Member>
  affiliations: string[]
  searchParams: {
    page?: string
    affiliation?: string
    search?: string
    featured?: string
  }
}

function MemberCard({ member }: { member: Member }) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-4 h-4" />
      case 'twitter':
        return <Twitter className="w-4 h-4" />
      case 'github':
        return <Github className="w-4 h-4" />
      default:
        return <ExternalLink className="w-4 h-4" />
    }
  }

  return (
    <Card className="h-full hover:shadow-lg transition-all duration-200 group">
      <CardContent className="p-6 text-center h-full flex flex-col">
        {/* Avatar */}
        <div className="mb-4">
          <Avatar className="w-24 h-24 mx-auto ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all">
            <AvatarImage 
              src={member.photo} 
              alt={member.name}
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-semibold bg-blue-100 text-blue-700">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>
          {member.featured && (
            <Badge variant="secondary" className="mt-2">
              Membre vedette
            </Badge>
          )}
        </div>

        {/* Member Info */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            <Link href={`/members/${member.slug}` as Route}>
              {member.name}
            </Link>
          </h3>
          
          <p className="text-blue-600 font-medium mb-2">{member.title}</p>
          
          <div className="flex items-center justify-center text-sm text-gray-600 mb-3">
            <GraduationCap className="w-4 h-4 mr-1 shrink-0" />
            <span className="line-clamp-1">{member.affiliation}</span>
          </div>
          
          <p className="text-gray-700 text-sm line-clamp-3 mb-4 flex-1">
            {member.bio}
          </p>
        </div>

        {/* Contact & Social Links */}
        <div className="flex items-center justify-center gap-3 pt-4 border-t">
          {member.email && (
            <Link 
              href={`mailto:${member.email}`}
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title={`Envoyer un email à ${member.name}`}
            >
              <Mail className="w-4 h-4" />
            </Link>
          )}
          
          {member.socialLinks?.map((link, index) => (
            <Link
              key={index}
              href={link.url as Route}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title={`${member.name} sur ${link.platform}`}
            >
              {getSocialIcon(link.platform)}
            </Link>
          ))}
          
          <Link 
            href={`/members/${member.slug}` as Route}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title={`Voir le profil de ${member.name}`}
          >
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

function Pagination({ pagination, baseUrl }: { 
  pagination: PaginatedResult<Member>['pagination']
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
          <Link href={`${baseUrl}&page=${pagination.totalPages}` as Route }>
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
        <Link href={`${baseUrl}&page=${pagination.currentPage + 1}` as Route }>
          <Button variant="outline" size="sm">
            Suivant
          </Button>
        </Link>
      )}
    </div>
  )
}

export default function MembersListing({ 
  initialData, 
  affiliations, 
  searchParams 
}: MembersListingProps) {
  const router = useRouter()
  const urlSearchParams = useSearchParams()
  const [selectedAffiliation, setSelectedAffiliation] = useState(searchParams.affiliation || '')
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(searchParams.featured === 'true')

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
    if (params.affiliation !== undefined || params.featured !== undefined) {
      newParams.delete('page')
    }
    
    const queryString = newParams.toString()
    router.push(`/members${queryString ? `?${queryString}` : ''}` as Route)
  }



  const handleAffiliationFilter = (affiliation: string) => {
    setSelectedAffiliation(affiliation === selectedAffiliation ? '' : affiliation)
    updateURL({ affiliation: affiliation === selectedAffiliation ? undefined : affiliation })
  }

  const handleFeaturedFilter = () => {
    const newFeaturedState = !showFeaturedOnly
    setShowFeaturedOnly(newFeaturedState)
    updateURL({ featured: newFeaturedState ? 'true' : undefined })
  }

  const clearFilters = () => {
    setSelectedAffiliation('')
    setShowFeaturedOnly(false)
    router.push('/members' as Route)
  }

  const hasActiveFilters = searchParams.affiliation || searchParams.featured

  const baseUrl = `/members?${new URLSearchParams({
    ...(searchParams.affiliation && { affiliation: searchParams.affiliation }),
    ...(searchParams.featured && { featured: searchParams.featured }),
  }).toString()}`

  // Sort members: featured first, then by order
  const sortedMembers = [...initialData.items].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return a.order - b.order
  })

  return (
    <div className="space-y-6">
      <ContentFilters
        availableTags={affiliations}
        selectedTag={selectedAffiliation}
        onTagFilter={handleAffiliationFilter}
        onClearFilters={clearFilters}
        hasActiveFilters={Boolean(selectedAffiliation || showFeaturedOnly)}
      />

      {/* Featured Filter */}
      {showFeaturedOnly && (
        <div className="flex justify-center mb-4">
          <Button
            variant="default"
            size="sm"
            onClick={handleFeaturedFilter}
            className="text-xs"
          >
            <Users className="w-4 h-4 mr-2" />
            Membres vedettes uniquement
          </Button>
        </div>
      )}

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-600">
          {initialData.pagination.totalItems > 0 ? (
            <>
              {initialData.pagination.totalItems} membre{initialData.pagination.totalItems > 1 ? 's' : ''} trouvé{initialData.pagination.totalItems > 1 ? 's' : ''}
              {hasActiveFilters && (
                <span className="ml-2">
                  (filtré{initialData.pagination.totalItems > 1 ? 's' : ''})
                </span>
              )}
            </>
          ) : (
            'Aucun membre trouvé'
          )}
        </div>
      </div>

      {/* Members Grid */}
      {sortedMembers.length > 0 ? (
        <>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedMembers.map((member) => (
              <MemberCard key={member.slug} member={member} />
            ))}
          </div>
          
          <Pagination pagination={initialData.pagination} baseUrl={baseUrl} />
        </>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucun membre trouvé
            </h3>
            <p className="text-gray-600 mb-4">
              {hasActiveFilters 
                ? "Essayez de modifier vos critères de recherche ou de supprimer les filtres."
                : "Il n'y a actuellement aucun membre enregistré."
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} variant="outline">
                Voir tous les membres
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}