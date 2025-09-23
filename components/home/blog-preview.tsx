import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, User, Tag, ArrowRight, BookOpen } from 'lucide-react'
import Link from 'next/link'
import type { BlogPreview as BlogPreviewType } from '@/types'
import { Route } from 'next'

interface BlogPreviewProps {
  posts: BlogPreviewType[]
  maxItems: number
}

export function BlogPreview({ posts, maxItems }: BlogPreviewProps) {
  const displayPosts = posts.slice(0, maxItems)

  const formatDate = (date: Date | string) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date))
  }

  return (
    <section className="py-16 sm:py-24 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Dernières Actualités
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Découvrez nos derniers articles sur les innovations technologiques et les avancées de la recherche
          </p>
        </div>
        
        {displayPosts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayPosts.map((post) => (
                <Card 
                  key={post.id} 
                  className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white border-slate-200 h-full flex flex-col"
                >
                  <CardHeader className="pb-4 flex-shrink-0">
                    <div className="flex items-center justify-between text-sm text-slate-500 mb-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2" />
                        <time dateTime={new Date(post.date).toISOString()}>
                          {formatDate(post.date)}
                        </time>
                      </div>
                    </div>
                    <CardTitle className="text-xl font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 line-clamp-2 mb-3">
                      {post.title}
                    </CardTitle>
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <span 
                            key={tag}
                            className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600"
                          >
                            <Tag className="w-3 h-3 mr-1" />
                            {tag}
                          </span>
                        ))}
                        {post.tags.length > 3 && (
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                            +{post.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="pt-0 flex-grow flex flex-col">
                    <CardDescription className="text-sm text-slate-600 leading-relaxed line-clamp-3 mb-6 flex-grow">
                      {post.excerpt}
                    </CardDescription>
                    <Link 
                      href={`/blog/${post.slug}` as Route}
                      className="inline-flex items-center text-sm font-medium text-blue-700 hover:text-blue-800 transition-colors duration-300 mt-auto"
                    >
                      Lire la suite
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
                <Link href={"/blog" as Route}>
                  Voir Tous les Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-slate-600 mb-2">
              Aucun article disponible
            </h3>
            <p className="text-slate-500">
              Restez connecté pour découvrir nos prochains articles
            </p>
          </div>
        )}
      </div>
    </section>
  )
}