'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { BlogContent } from '@/types'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { MarkdownContent } from '@/components/ui/markdown-content'
import { Progress } from '@/components/ui/progress'
import { 
  Calendar,  
  Tag, 
  ArrowLeft, 
  Share2, 
  Clock,
  ChevronRight,
  Eye,
  Heart,
  Bookmark,
  Twitter,
  Linkedin,
  Facebook,
  Copy,
  ChevronUp
} from 'lucide-react'

interface BlogDetailProps {
  post: BlogContent
  contentHtml: string
  relatedPosts: BlogContent[]
}

export function BlogDetail({ post, contentHtml, relatedPosts }: BlogDetailProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [shareMenuOpen, setShareMenuOpen] = useState(false)
  const [copySuccess, setCopySuccess] = useState(false)

  useEffect(() => {
    const updateReadingProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      
      setReadingProgress(progress)
      setShowScrollTop(scrollTop > 300)
    }

    window.addEventListener('scroll', updateReadingProgress)
    return () => window.removeEventListener('scroll', updateReadingProgress)
  }, [])

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / wordsPerMinute)
    return readingTime
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleShare = async (platform?: string) => {
    const url = window.location.href
    const title = post.title
    const text = post.excerpt || title

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank')
    } else if (platform === 'linkedin') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'facebook') {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    } else if (platform === 'copy') {
      try {
        await navigator.clipboard.writeText(url)
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    } else if (navigator.share) {
      try {
        await navigator.share({ title, text, url })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    }
    setShareMenuOpen(false)
  }

  const readingTime = estimateReadingTime(post.content || '')

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <Progress value={readingProgress} className="h-1 rounded-none" />
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-3 z-40">
        {/* Scroll to top */}
        {showScrollTop && (
          <Button
            size="icon"
            className="rounded-full shadow-lg bg-white text-gray-700 hover:bg-gray-50 border"
            onClick={scrollToTop}
          >
            <ChevronUp className="h-5 w-5" />
          </Button>
        )}

        {/* Share menu */}
        <div className="relative">
          <Button
            size="icon"
            className="rounded-full shadow-lg bg-blue-600 hover:bg-blue-700"
            onClick={() => setShareMenuOpen(!shareMenuOpen)}
          >
            <Share2 className="h-5 w-5" />
          </Button>
          
          {shareMenuOpen && (
            <div className="absolute right-0 bottom-14 bg-white rounded-lg shadow-xl border p-2 min-w-[200px]">
              <div className="flex flex-col gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-3"
                  onClick={() => handleShare('twitter')}
                >
                  <Twitter className="h-4 w-4 text-blue-400" />
                  Twitter
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-3"
                  onClick={() => handleShare('linkedin')}
                >
                  <Linkedin className="h-4 w-4 text-blue-600" />
                  LinkedIn
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-3"
                  onClick={() => handleShare('facebook')}
                >
                  <Facebook className="h-4 w-4 text-blue-800" />
                  Facebook
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start gap-3"
                  onClick={() => handleShare('copy')}
                >
                  <Copy className="h-4 w-4 text-gray-600" />
                  {copySuccess ? 'Copié !' : 'Copier le lien'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <article className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
        {/* Hero Section */}
        <div className="relative">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5" />
          
          <div className="relative container mx-auto px-4 pt-20 pb-12 max-w-4xl">
            {/* Back to blog link */}
            <div className="mb-8">
              <Link
                href="/blog"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors font-medium"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Retour au blog
              </Link>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                  <Badge 
                    variant="secondary" 
                    className="hover:bg-blue-100 hover:text-blue-800 cursor-pointer transition-colors px-3 py-1"
                  >
                    {tag}
                  </Badge>
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed font-light">
                {post.excerpt}
              </p>
            )}

            {/* Meta information */}
            <div className="flex flex-wrap items-center gap-8 text-gray-600 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{post.author}</p>
                  <p className="text-sm text-gray-500">Expert C5IN</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-gray-400" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <span>{readingTime} min de lecture</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-gray-400" />
                <span>2.3k vues</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-4 mb-8">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 ${isLiked ? 'text-red-600 border-red-200 bg-red-50' : ''}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                {isLiked ? 'Aimé' : 'J\'aime'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`flex items-center gap-2 ${isBookmarked ? 'text-blue-600 border-blue-200 bg-blue-50' : ''}`}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                {isBookmarked ? 'Sauvegardé' : 'Sauvegarder'}
              </Button>
            </div>
          </div>
        </div>

        {/* Cover image */}
        {post.coverImage && (
          <div className="container mx-auto px-4 max-w-5xl mb-16">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Article content */}
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-16">
            <div className="prose prose-lg prose-gray max-w-none
                          prose-headings:font-bold prose-headings:text-gray-900 
                          prose-headings:tracking-tight
                          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                          prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4
                          prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-lg
                          prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                          prose-strong:text-gray-900 prose-strong:font-semibold
                          prose-code:text-blue-600 prose-code:bg-gray-100 prose-code:px-1 prose-code:rounded
                          prose-blockquote:border-l-4 prose-blockquote:border-blue-500 
                          prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6 
                          prose-blockquote:rounded-r-lg prose-blockquote:my-8
                          prose-ul:text-gray-700 prose-ol:text-gray-700
                          prose-li:text-gray-700 prose-li:leading-relaxed">
              <MarkdownContent content={contentHtml} />
            </div>
          </div>
        </div>

        {/* Article footer */}
        <footer className="container mx-auto px-4 max-w-4xl pb-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Tags section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Tag className="h-4 w-4 text-white" />
                </div>
                Sujets abordés
              </h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag) => (
                  <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`}>
                    <Badge 
                      variant="outline" 
                      className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 cursor-pointer transition-all px-4 py-2 text-sm font-medium"
                    >
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>

            <Separator className="my-12" />

            {/* Author section */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                À propos de l&apos;auteur
              </h3>
              <div className="flex items-start gap-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {post.author.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-xl text-gray-900 mb-2">{post.author}</h4>
                  <p className="text-blue-600 font-medium mb-3">Expert C5IN & Consultant Technologique</p>
                  <p className="text-gray-600 leading-relaxed">
                    Expert en solutions technologiques innovantes avec plus de 10 ans d&apos;expérience 
                    dans le domaine du numérique et de l&apos;accompagnement des entreprises dans leur 
                    transformation digitale.
                  </p>
                </div>
              </div>
            </div>

            {/* Related posts */}
            {relatedPosts.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  Articles recommandés
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedPost) => (
                    <Card key={relatedPost.slug} className="group h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-gray-50 to-white">
                      <CardHeader className="pb-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {relatedPost.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h4 className="font-bold text-lg text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors leading-tight">
                          <Link href={`/blog/${relatedPost.slug}`}>
                            {relatedPost.title}
                          </Link>
                        </h4>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                          <span className="font-medium">{relatedPost.author}</span>
                          <span>•</span>
                          <span>{formatDate(relatedPost.date)}</span>
                        </div>
                        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
                          {relatedPost.excerpt}
                        </p>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm transition-colors group-hover:gap-2"
                        >
                          Lire l&apos;article
                          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Call to action */}
            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Restons en contact</h3>
                <p className="text-blue-100 mb-6">
                  Découvrez tous nos articles et restez informé des dernières tendances technologiques.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/blog">
                    <Button variant="secondary" className="flex items-center gap-2">
                      <ArrowLeft className="h-4 w-4" />
                      Tous les articles
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white hover:text-gray-900">
                      Nous contacter
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </article>
    </>
  )
}