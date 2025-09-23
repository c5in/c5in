import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogDetail } from './blog-detail'
import { enhancedBlogLoader } from '@/lib/content'

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

    return {
      title: `${post.title} - C5IN Blog`,
      description: post.excerpt,
      authors: [{ name: post.author }],
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: new Date(post.date).toISOString(),
        authors: [post.author],
        tags: post.tags,
        images: post.coverImage ? [
          {
            url: post.coverImage,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : undefined,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : undefined,
      },
    }
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

    return (
      <BlogDetail
        post={post}
        contentHtml={contentHtml || ''}
        relatedPosts={relatedPosts}
      />
    )
  } catch (error) {
    console.error('Error loading blog post:', error)
    notFound()
  }
}