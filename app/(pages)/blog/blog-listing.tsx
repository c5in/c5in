'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { BlogContent } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PageHeader } from '@/components/ui/page-header'
import { ContentFilters } from '@/components/ui/content-filters'
//import { Separator } from '@/components/ui/separator'
import { 
  Calendar, 
  User, 
  //Tag, 
  ChevronLeft, 
  ChevronRight,
  //Filter,
  X,
  Clock,
  TrendingUp,
  Sparkles,
  Grid3X3,
  List
} from 'lucide-react'

interface BlogListingProps {
  posts: BlogContent[]
  currentPage: number
  totalPages: number
  totalPosts: number
  selectedTag?: string
  searchQuery?: string
  availableTags: string[]
}

export function BlogListing({
  posts,
  currentPage,
  totalPages,
  totalPosts,
  selectedTag,
  //searchQuery,
  availableTags
}: BlogListingProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')



  const handleTagFilter = (tag: string) => {
    const params = new URLSearchParams((searchParams?.toString() ?? ''))
    
    if (selectedTag === tag) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    
    params.delete('page')
    
    router.push(`/blog?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams((searchParams?.toString() ?? ''))
    
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    
    router.push(`/blog?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    router.push('/blog')
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content?.split(/\s+/).length || 0
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const hasActiveFilters = Boolean(selectedTag)
  const featuredPost = posts[0] // First post as featured

  return (
    <div className="min-h-screen bg-gradient-to-br pt-16 from-gray-50 to-white">
      
        <PageHeader
          badge={{ icon: Sparkles, text: "Blog C5IN" }}
          title="Expertise & Insights"
          subtitle="Analyses et Découvertes"
          description="Découvrez les dernières actualités et analyses sur le Cloud Computing, Edge Computing, IoT, Green Computing et Federated Learning par les experts du C5IN."
          breadcrumb={[
            { label: "Blog", icon: Sparkles }
          ]}
        >
          <div className="flex flex-col gap-6">
            {/* Statistiques */}
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                {totalPosts} Articles
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                {availableTags.length} Sujets
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                5 Experts
              </span>
              <span className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium">
                12 Domaines
              </span>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-1 bg-white rounded-lg p-1 shadow-sm">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-md"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-md"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </PageHeader>

        <div className="container mx-auto px-4  pb-12">

        <ContentFilters
          availableTags={availableTags}
          selectedTag={selectedTag}
          onTagFilter={handleTagFilter}
          onClearFilters={clearFilters}
          hasActiveFilters={hasActiveFilters}
        />

        {/* Featured Post */}
        {!hasActiveFilters && featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">Article à la une</h2>
            </div>
            
            <Card className="overflow-hidden border-0 shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="p-8 md:p-12">
                <div className="flex flex-wrap gap-2 mb-4">
                  {featuredPost.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-white/20 text-white border-0">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold mb-4 leading-tight">
                  <Link href={`/blog/${featuredPost.slug}`} className="hover:text-blue-100 transition-colors">
                    {featuredPost.title}
                  </Link>
                </h3>
                <p className="text-xl text-blue-100 mb-6 leading-relaxed max-w-3xl">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-blue-100 mb-8">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{estimateReadingTime(featuredPost.content || '')} min</span>
                  </div>
                </div>
                <Link href={`/blog/${featuredPost.slug}`}>
                  <Button variant="secondary" size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                    Lire l&apos;article
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        )}

        {/* Blog Posts */}
        {posts.length > 0 ? (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">
                {hasActiveFilters ? 'Résultats de recherche' : 'Tous les articles'}
              </h2>
              <div className="text-sm text-gray-600">
                {totalPosts} article{totalPosts !== 1 ? 's' : ''} trouvé{totalPosts !== 1 ? 's' : ''}
              </div>
            </div>

            {/* Posts Grid/List */}
            <div className={`mb-16 ${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
                : 'space-y-6'
            }`}>
              {(hasActiveFilters ? posts : posts.slice(1)).map((post, index) => (
                <Card 
                  key={post.slug} 
                  className={`group h-full hover:shadow-2xl transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm ${
                    viewMode === 'list' ? 'flex flex-row overflow-hidden' : ''
                  }`}
                >
                  {viewMode === 'list' ? (
                    <>
                      <div className="w-1/3 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center text-6xl font-bold text-gray-300">
                        {index + (hasActiveFilters ? 1 : 2)}
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-colors"
                              onClick={() => handleTagFilter(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 line-clamp-2 mb-4">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="font-medium">{post.author}</span>
                            <span>{formatDate(post.date)}</span>
                          </div>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                          >
                            Lire
                            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <CardHeader className="pb-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="text-xs cursor-pointer hover:bg-blue-100 hover:text-blue-800 transition-colors"
                              onClick={() => handleTagFilter(tag)}
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                          <Link href={`/blog/${post.slug}`}>
                            {post.title}
                          </Link>
                        </h3>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            <span className="font-medium">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{estimateReadingTime(post.content || '')} min</span>
                          </div>
                        </div>
                        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            {formatDate(post.date)}
                          </span>
                          <Link
                            href={`/blog/${post.slug}`}
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors group-hover:gap-2"
                          >
                            Lire l&apos;article
                            <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 bg-white shadow-sm"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Précédent
                </Button>
                
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    const showPage = 
                      page === 1 || 
                      page === totalPages || 
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    
                    if (!showPage) {
                      if (page === 2 && currentPage > 4) {
                        return <span key={page} className="px-2 text-gray-400">...</span>
                      }
                      if (page === totalPages - 1 && currentPage < totalPages - 3) {
                        return <span key={page} className="px-2 text-gray-400">...</span>
                      }
                      return null
                    }
                    
                    return (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(page)}
                        className={`min-w-[44px] transition-all ${
                          currentPage === page 
                            ? 'shadow-md scale-110' 
                            : 'bg-white shadow-sm hover:shadow-md hover:scale-105'
                        }`}
                      >
                        {page}
                      </Button>
                    )
                  })}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 bg-white shadow-sm"
                >
                  Suivant
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Empty State */
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <Sparkles className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Aucun article trouvé
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {hasActiveFilters 
                ? "Aucun article ne correspond aux filtres sélectionnés. Essayez d'autres sujets ou supprimez les filtres."
                : "Aucun article n'est disponible pour le moment. Revenez bientôt pour découvrir nos dernières publications."
              }
            </p>
            {hasActiveFilters && (
              <Button onClick={clearFilters} size="lg" className="shadow-lg">
                <X className="mr-2 h-4 w-4" />
                Effacer les filtres
              </Button>
            )}
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 mb-16">
          <Card className="border-0 shadow-2xl bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">Restez informé</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg">
                Ne manquez aucune de nos analyses et découvertes. 
                Suivez-nous pour rester à la pointe de l&apos;innovation technologique.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                    Nous contacter
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    En savoir plus
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}