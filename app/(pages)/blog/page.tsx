import { Metadata } from 'next'
import { Suspense } from 'react'
import { BlogListing } from './blog-listing'
import { enhancedBlogLoader } from '@/lib/content'
import { generateSEOMetadata } from '@/components/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Blog',
  description: 'Découvrez les dernières actualités et analyses sur le Cloud Computing, Edge Computing, IoT, Green Computing et Federated Learning par les experts du C5IN.',
  url: '/blog',
  tags: ['blog', 'actualités', 'cloud computing', 'edge computing', 'iot', 'green computing', 'federated learning'],
})

export default async function BlogPage() {
  const itemsPerPage = 9

  try {
    // Get all posts for static generation
    const allPosts = await enhancedBlogLoader.getAll()
    
    // Sort by date (newest first)
    allPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return dateB - dateA
    })
    
    const totalPosts = allPosts.length
    const totalPages = Math.ceil(totalPosts / itemsPerPage)
    const posts = allPosts.slice(0, itemsPerPage) // First page only for static generation

    // Get all available tags for filtering
    const allTags = await enhancedBlogLoader.getAllTags()

    return (
      <Suspense fallback={<div>Chargement...</div>}>
        <BlogListing
          posts={posts}
          currentPage={1}
          totalPages={totalPages}
          totalPosts={totalPosts}
          selectedTag={undefined}
          searchQuery={undefined}
          availableTags={allTags}
        />
      </Suspense>
    )
  } catch (error) {
    console.error('Error loading blog posts:', error)
    
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Blog</h1>
          <p className="text-gray-600">
            Une erreur s&apos;est produite lors du chargement des articles. Veuillez réessayer plus tard.
          </p>
        </div>
      </div>
    )
  }
}