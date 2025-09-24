'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { BlogContent } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
//import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Calendar, 
  User, 
  Tag, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  X,
  Clock,
  //Eye,
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
  searchQuery,
  availableTags
}: BlogListingProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = useCallback(() => {
    setIsSearching(true)
    const params = new URLSearchParams(searchParams.toString())
    
    if (localSearchQuery.trim()) {
      params.set('search', localSearchQuery.trim())
    } else {
      params.delete('search')
    }
    
    params.delete('page')
    
    router.push(`/blog?${params.toString()}`)
    setTimeout(() => setIsSearching(false), 500)
  }, [localSearchQuery, searchParams, router])

  // Auto-search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (localSearchQuery !== (searchQuery || '')) {
        handleSearch()
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [localSearchQuery, searchQuery, handleSearch])

  const handleTagFilter = (tag: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (selectedTag === tag) {
      params.delete('tag')
    } else {
      params.set('tag', tag)
    }
    
    params.delete('page')
    
    router.push(`/blog?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    
    router.push(`/blog?${params.toString()}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const clearFilters = () => {
    setLocalSearchQuery('')
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

  const hasActiveFilters = selectedTag || searchQuery
  const featuredPost = posts[0] // First post as featured

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
        
        <div className="relative container mx-auto px-4 pt-16 pb-12">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              Blog C5IN
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
              Expertise & Insights
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light">
              Découvrez les dernières actualités et analyses sur le Cloud Computing, Edge Computing, 
              IoT, Green Computing et Federated Learning par les experts du C5IN.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 transition-colors ${isSearching ? 'text-blue-600 animate-pulse' : 'text-gray-400'}`} />
              <Input
                type="text"
                placeholder="Rechercher dans nos articles..."
                value={localSearchQuery}
                onChange={(e) => setLocalSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg bg-white/80 backdrop-blur-sm border-0 shadow-lg focus:shadow-xl transition-all duration-300 rounded-2xl"
              />
              {localSearchQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLocalSearchQuery('')}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-full hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{totalPosts}</div>
                <div className="text-sm text-gray-600">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">{availableTags.length}</div>
                <div className="text-sm text-gray-600">Sujets</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">5</div>
                <div className="text-sm text-gray-600">Experts</div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* View Mode Toggle */}
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

              {/* Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 bg-white shadow-sm"
              >
                <Filter className="h-4 w-4" />
                Filtres
                {hasActiveFilters && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center text-xs">
                    {(selectedTag ? 1 : 0) + (searchQuery ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl shadow-lg border p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filtres
              </h3>
              {hasActiveFilters && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Tout effacer
                </Button>
              )}
            </div>

            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-6">
                <div className="text-sm font-medium text-gray-700 mb-3">Filtres actifs :</div>
                <div className="flex flex-wrap gap-2">
                  {searchQuery && (
                    <Badge variant="default" className="flex items-center gap-2">
                      <Search className="h-3 w-3" />
                      &quot;{searchQuery}&quot;
                      <X className="h-3 w-3 cursor-pointer" onClick={() => {
                        setLocalSearchQuery('')
                        handleSearch()
                      }} />
                    </Badge>
                  )}
                  {selectedTag && (
                    <Badge variant="default" className="flex items-center gap-2">
                      <Tag className="h-3 w-3" />
                      {selectedTag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleTagFilter(selectedTag)} />
                    </Badge>
                  )}
                </div>
              </div>
            )}

            {/* Tag Filters */}
            <div>
              <div className="text-sm font-medium text-gray-700 mb-3">Filtrer par sujet :</div>
              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleTagFilter(tag)}
                    className="transition-all hover:scale-105"
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

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
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Aucun article trouvé
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {hasActiveFilters 
                ? "Aucun article ne correspond à vos critères de recherche. Essayez d'autres mots-clés ou supprimez les filtres."
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