import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogDetail } from './blog-detail'
import { enhancedBlogLoader } from '@/lib/content'
import { generateContentSEOMetadata, StructuredData, generateArticleStructuredData } from '@/components/seo'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const post = await enhancedBlogLoader.getBySlug(resolvedParams.slug)
    
    if (!post) {
      return {
        title: 'Article non trouvé - C5IN',
        description: 'L\'article demandé n\'existe pas.',
      }
    }

    return generateContentSEOMetadata({
      content: post,
      type: 'blog',
      url: `/blog/${post.slug}`,
    })
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Erreur - C5IN',
      description: 'Une erreur s\'est produite lors du chargement de l\'article.',
    }
  }
}

export async function generateStaticParams() {
  try {
    const posts = await enhancedBlogLoader.getAll()
    return posts.map((post) => ({
      slug: post.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  try {
    const resolvedParams = await params
    const post = await enhancedBlogLoader.getBySlug(resolvedParams.slug)
    
    if (!post) {
      notFound()
    }

    // Get related posts
    const relatedPosts = await enhancedBlogLoader.getRelatedContent(resolvedParams.slug, 3)

    // Render content to HTML
    const contentHtml = await enhancedBlogLoader.renderContentToHtml(resolvedParams.slug)

    // Generate structured data
    const structuredData = generateArticleStructuredData(post, `/blog/${post.slug}`)

    return (
      <>
        <StructuredData data={structuredData} />
        <BlogDetail
          post={post}
          contentHtml={contentHtml || ''}
          relatedPosts={relatedPosts}
        />
      </>
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}