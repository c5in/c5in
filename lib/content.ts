import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeHighlight from 'rehype-highlight'
import rehypeStringify from 'rehype-stringify'
import { z } from 'zod'

// Markdown Parser Interface
export interface MarkdownParser {
  parse<T>(filePath: string): Promise<{
    frontMatter: T
    content: string
    excerpt: string
  }>
  
  renderToHtml(content: string): Promise<string>
}

// Content Validation Schemas
export const baseContentSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().or(z.date()),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  slug: z.string().min(1, 'Slug is required'),
})

export const eventContentSchema = baseContentSchema.extend({
  location: z.string().min(1, 'Location is required'),
  description: z.string().min(1, 'Description is required'),
  endDate: z.string().or(z.date()).optional(),
  program: z.array(z.object({
    time: z.string(),
    title: z.string(),
    speaker: z.string().optional(),
    description: z.string().optional(),
  })).optional(),
  speakers: z.array(z.object({
    name: z.string(),
    affiliation: z.string(),
  })).optional(),
  registrationUrl: z.string().url().optional(),
})

export const blogContentSchema = baseContentSchema.extend({
  author: z.string().min(1, 'Author is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  coverImage: z.string().optional(),
})

export const memberContentSchema = z.object({
  id: z.string().min(1, 'ID is required'),
  slug: z.string().min(1, 'Slug is required'),
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  affiliation: z.string().min(1, 'Affiliation is required'),
  bio: z.string().min(1, 'Bio is required'),
  photo: z.string().min(1, 'Photo is required'),
  email: z.string().email().optional(),
  socialLinks: z.array(z.object({
    platform: z.string(),
    url: z.string().url(),
  })).optional(),
  order: z.number().default(0),
  featured: z.boolean().default(false),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  tags: z.array(z.string()).default([]),
  date: z.string().or(z.date()).optional(),
})

export const publicationContentSchema = baseContentSchema.extend({
  authors: z.array(z.string()).min(1, 'At least one author is required'),
  journal: z.string().min(1, 'Journal/Conference is required'),
  doi: z.string().optional(),
  abstract: z.string().min(1, 'Abstract is required'),
  pdfUrl: z.string().optional(), // Allow relative paths, not just full URLs
  type: z.enum(['journal', 'conference', 'workshop', 'thesis']).default('journal'),
})

// Markdown Parser Implementation
export class MarkdownParserImpl implements MarkdownParser {
  private processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)

  async parse<T>(filePath: string): Promise<{
    frontMatter: T
    content: string
    excerpt: string
  }> {
    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`)
    }

    const fileContent = fs.readFileSync(filePath, 'utf8')
    const { data, content } = matter(fileContent)

    // Generate excerpt from content (first 200 characters)
    const excerpt = content
      .replace(/^#+\s+/gm, '') // Remove markdown headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold formatting
      .replace(/\*(.*?)\*/g, '$1') // Remove italic formatting
      .replace(/`(.*?)`/g, '$1') // Remove inline code formatting
      .replace(/\n+/g, ' ') // Replace newlines with spaces
      .trim()
      .substring(0, 200)
      .replace(/\s+$/, '') + (content.length > 200 ? '...' : '')

    return {
      frontMatter: data as T,
      content,
      excerpt,
    }
  }

  async renderToHtml(content: string): Promise<string> {
    const result = await this.processor.process(content)
    return result.toString()
  }
}

// Content validation functions
export function validateContent<T>(data: unknown, schema: z.ZodSchema<T>): T {
  try {
    return schema.parse(data)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessages = error.issues.map(err => `${err.path.join('.')}: ${err.message}`).join(', ')
      throw new Error(`Content validation failed: ${errorMessages}`)
    }
    throw error
  }
}

export interface ContentLoader<T> {
  getAll(): Promise<T[]>
  getBySlug(slug: string): Promise<T | null>
  getFeatured(limit?: number): Promise<T[]>
  getByTag(tag: string): Promise<T[]>
}

export class MarkdownContentLoader<T> implements ContentLoader<T> {
  private parser = new MarkdownParserImpl()

  constructor(
    private contentDir: string,
    private validationSchema?: z.ZodSchema<T>
  ) {}

  async getAll(): Promise<T[]> {
    const contentPath = path.join(process.cwd(), 'content', this.contentDir)
    
    if (!fs.existsSync(contentPath)) {
      return []
    }

    const files = fs.readdirSync(contentPath)
    const markdownFiles = files.filter(file => file.endsWith('.md'))

    const content = await Promise.all(
      markdownFiles.map(async (file) => {
        const filePath = path.join(contentPath, file)
        const slug = file.replace('.md', '')
        
        try {
          const { frontMatter, excerpt } = await this.parser.parse(filePath)
          
          const contentData = {
            ...(frontMatter as Record<string, unknown>),
            id: slug, // Use slug as id for consistency
            slug,
            excerpt,
          }
          
          // Ensure slug and id are always present
          if (!contentData.slug) {
            contentData.slug = slug
          }
          if (!contentData.id) {
            contentData.id = slug
          }

          // Validate content if schema is provided
          if (this.validationSchema) {
            return validateContent(contentData as T, this.validationSchema)
          }

          return contentData as T
        } catch (error) {
          console.error(`Error loading content file ${file}:`, error)
          return null
        }
      })
    )

    // Filter out null values (failed to load files)
    return content.filter((item): item is NonNullable<typeof item> => item !== null) as T[]
  }

  async getBySlug(slug: string): Promise<T | null> {
    const filePath = path.join(process.cwd(), 'content', this.contentDir, `${slug}.md`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    try {
      const { frontMatter, content, excerpt } = await this.parser.parse(filePath)
      
      const contentData = {
        ...(frontMatter as Record<string, unknown>),
        id: slug, // Use slug as id for consistency
        content,
        excerpt,
        slug,
      }
      
      // Ensure slug and id are always present
      if (!contentData.slug) {
        contentData.slug = slug
      }
      if (!contentData.id) {
        contentData.id = slug
      }

      // Validate content if schema is provided
      if (this.validationSchema) {
        return validateContent(contentData as T, this.validationSchema)
      }

      return contentData as T
    } catch (error) {
      console.error(`Error loading content file ${slug}.md:`, error)
      return null
    }
  }

  async getFeatured(limit?: number): Promise<T[]> {
    const all = await this.getAll()
    const featured = all.filter((item) => (item as Record<string, unknown>).featured === true)
    
    // Sort by date if available (newest first)
    featured.sort((a, b) => {
      const dateA = (a as Record<string, unknown>).date
      const dateB = (b as Record<string, unknown>).date
      
      if (dateA && dateB) {
        return new Date(dateB as string).getTime() - new Date(dateA as string).getTime()
      }
      
      return 0
    })
    
    if (limit) {
      return featured.slice(0, limit)
    }
    
    return featured
  }

  async getByTag(tag: string): Promise<T[]> {
    const all = await this.getAll()
    return all.filter((item) => {
      const tags = (item as Record<string, unknown>).tags as string[] | undefined
      return tags?.includes(tag)
    })
  }

  // Additional utility methods
  async getRecent(limit: number = 10): Promise<T[]> {
    const all = await this.getAll()
    
    // Sort by date (newest first)
    all.sort((a, b) => {
      const dateA = (a as Record<string, unknown>).date
      const dateB = (b as Record<string, unknown>).date
      
      if (dateA && dateB) {
        return new Date(dateB as string).getTime() - new Date(dateA as string).getTime()
      }
      
      return 0
    })
    
    return all.slice(0, limit)
  }

  async getAllTags(): Promise<string[]> {
    const all = await this.getAll()
    const tagSet = new Set<string>()
    
    all.forEach((item) => {
      const tags = (item as Record<string, unknown>).tags as string[] | undefined
      tags?.forEach(tag => tagSet.add(tag))
    })
    
    return Array.from(tagSet).sort()
  }

  async renderContentToHtml(slug: string): Promise<string | null> {
    const item = await this.getBySlug(slug)
    if (!item) return null
    
    const content = (item as Record<string, unknown>).content as string
    if (!content) return null
    
    return this.parser.renderToHtml(content)
  }
}

// Content loader instances with validation
export const eventsLoader = new MarkdownContentLoader('events', eventContentSchema)
export const blogLoader = new MarkdownContentLoader('blog', blogContentSchema)
export const membersLoader = new MarkdownContentLoader('members', memberContentSchema)
export const publicationsLoader = new MarkdownContentLoader('publications', publicationContentSchema)

// Export parser instance for direct use
export const markdownParser = new MarkdownParserImpl()

// Pagination utilities
export interface PaginationOptions {
  page: number
  limit: number
}

export interface PaginatedResult<T> {
  items: T[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    hasNextPage: boolean
    hasPreviousPage: boolean
    limit: number
  }
}

export function paginateItems<T>(
  items: T[],
  options: PaginationOptions
): PaginatedResult<T> {
  const { page, limit } = options
  const totalItems = items.length
  const totalPages = Math.ceil(totalItems / limit)
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  const paginatedItems = items.slice(startIndex, endIndex)
  
  return {
    items: paginatedItems,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      limit,
    },
  }
}

// Filtering and sorting utilities
export type SortOrder = 'asc' | 'desc'

export interface FilterOptions {
  tags?: string[]
  featured?: boolean
  dateFrom?: Date
  dateTo?: Date
  author?: string
  type?: string
}

export interface SortOptions {
  field: string
  order: SortOrder
}

export function filterContent<T>(
  items: T[],
  filters: FilterOptions
): T[] {
  return items.filter((item) => {
    const itemData = item as Record<string, unknown>
    
    // Filter by tags
    if (filters.tags && filters.tags.length > 0) {
      const itemTags = itemData.tags as string[] | undefined
      if (!itemTags || !filters.tags.some(tag => itemTags.includes(tag))) {
        return false
      }
    }
    
    // Filter by featured status
    if (filters.featured !== undefined) {
      if (itemData.featured !== filters.featured) {
        return false
      }
    }
    
    // Filter by date range
    if (filters.dateFrom || filters.dateTo) {
      const itemDate = itemData.date ? new Date(itemData.date as string) : null
      if (!itemDate) return false
      
      if (filters.dateFrom && itemDate < filters.dateFrom) {
        return false
      }
      
      if (filters.dateTo && itemDate > filters.dateTo) {
        return false
      }
    }
    
    // Filter by author
    if (filters.author) {
      const itemAuthor = itemData.author as string | undefined
      const itemAuthors = itemData.authors as string[] | undefined
      
      if (!itemAuthor && !itemAuthors) return false
      
      if (itemAuthor && !itemAuthor.toLowerCase().includes(filters.author.toLowerCase())) {
        return false
      }
      
      if (itemAuthors && !itemAuthors.some(author => 
        author.toLowerCase().includes(filters.author!.toLowerCase())
      )) {
        return false
      }
    }
    
    // Filter by type
    if (filters.type) {
      const itemType = itemData.type as string | undefined
      if (!itemType || itemType !== filters.type) {
        return false
      }
    }
    
    return true
  })
}

export function sortContent<T>(
  items: T[],
  sortOptions: SortOptions
): T[] {
  return [...items].sort((a, b) => {
    const aValue = (a as Record<string, unknown>)[sortOptions.field]
    const bValue = (b as Record<string, unknown>)[sortOptions.field]
    
    // Handle date sorting
    if (sortOptions.field === 'date') {
      const aDate = aValue ? new Date(aValue as string).getTime() : 0
      const bDate = bValue ? new Date(bValue as string).getTime() : 0
      
      return sortOptions.order === 'asc' ? aDate - bDate : bDate - aDate
    }
    
    // Handle string sorting
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      const comparison = aValue.localeCompare(bValue)
      return sortOptions.order === 'asc' ? comparison : -comparison
    }
    
    // Handle number sorting
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOptions.order === 'asc' ? aValue - bValue : bValue - aValue
    }
    
    // Default: no sorting
    return 0
  })
}

// Enhanced content loader with advanced filtering and pagination
export class EnhancedContentLoader<T> extends MarkdownContentLoader<T> {
  async getFiltered(
    filters: FilterOptions,
    sortOptions?: SortOptions,
    paginationOptions?: PaginationOptions
  ): Promise<PaginatedResult<T> | T[]> {
    let items = await this.getAll()
    
    // Apply filters
    items = filterContent(items, filters)
    
    // Apply sorting
    if (sortOptions) {
      items = sortContent(items, sortOptions)
    }
    
    // Apply pagination if requested
    if (paginationOptions) {
      return paginateItems(items, paginationOptions)
    }
    
    return items
  }
  
  async searchContent(
    query: string,
    fields: string[] = ['title', 'content', 'excerpt'],
    paginationOptions?: PaginationOptions
  ): Promise<PaginatedResult<T> | T[]> {
    const items = await this.getAll()
    const searchQuery = query.toLowerCase()
    
    const filteredItems = items.filter((item) => {
      const itemData = item as Record<string, unknown>
      
      return fields.some(field => {
        const fieldValue = itemData[field]
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchQuery)
        }
        if (Array.isArray(fieldValue)) {
          return fieldValue.some(val => 
            typeof val === 'string' && val.toLowerCase().includes(searchQuery)
          )
        }
        return false
      })
    })
    
    if (paginationOptions) {
      return paginateItems(filteredItems, paginationOptions)
    }
    
    return filteredItems
  }
  
  async getRelatedContent(
    slug: string,
    limit: number = 3
  ): Promise<T[]> {
    const currentItem = await this.getBySlug(slug)
    if (!currentItem) return []
    
    const currentTags = ((currentItem as Record<string, unknown>).tags as string[]) || []
    if (currentTags.length === 0) return []
    
    const allItems = await this.getAll()
    
    // Calculate relevance score based on shared tags
    const relatedItems = allItems
      .filter(item => (item as Record<string, unknown>).slug !== slug)
      .map(item => {
        const itemTags = ((item as Record<string, unknown>).tags as string[]) || []
        const sharedTags = currentTags.filter(tag => itemTags.includes(tag))
        
        return {
          item,
          relevanceScore: sharedTags.length,
        }
      })
      .filter(({ relevanceScore }) => relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
      .map(({ item }) => item)
    
    return relatedItems
  }
}

// Enhanced content loader instances
export const enhancedEventsLoader = new EnhancedContentLoader('events', eventContentSchema)
export const enhancedBlogLoader = new EnhancedContentLoader('blog', blogContentSchema)
export const enhancedMembersLoader = new EnhancedContentLoader('members', memberContentSchema)
export const enhancedPublicationsLoader = new EnhancedContentLoader('publications', publicationContentSchema)

// Convenience functions for homepage
export async function getLatestEvents(limit: number = 4) {
  const events = await eventsLoader.getRecent(limit)
  return events.map(event => {
    const eventWithSlug = event as typeof event & { slug: string; excerpt: string }
    return {
      id: eventWithSlug.slug,
      title: eventWithSlug.title,
      date: eventWithSlug.date,
      location: eventWithSlug.location,
      excerpt: eventWithSlug.excerpt || '',
      slug: eventWithSlug.slug
    }
  })
}

export async function getLatestBlogPosts(limit: number = 3) {
  const posts = await blogLoader.getRecent(limit)
  return posts.map(post => {
    const postWithSlug = post as typeof post & { slug: string; excerpt: string }
    return {
      id: postWithSlug.slug,
      title: postWithSlug.title,
      author: postWithSlug.author,
      date: postWithSlug.date,
      excerpt: postWithSlug.excerpt || '',
      tags: postWithSlug.tags,
      slug: postWithSlug.slug
    }
  })
}

export async function getFeaturedMembers() {
  const featured = await membersLoader.getFeatured()
  // If no featured members, get all members sorted by order
  if (featured.length === 0) {
    const all = await membersLoader.getAll()
    return all.sort((a, b) => {
      const orderA = (a as Record<string, unknown>).order as number || 0
      const orderB = (b as Record<string, unknown>).order as number || 0
      return orderA - orderB
    }).map(member => {
      const memberWithSlug = member as typeof member & { slug: string; excerpt: string }
      return {
        ...memberWithSlug,
        id: memberWithSlug.slug,
        slug: memberWithSlug.slug
      }
    })
  }
  return featured.map(member => {
    const memberWithSlug = member as typeof member & { slug: string; excerpt: string }
    return {
      ...memberWithSlug,
      id: memberWithSlug.slug,
      slug: memberWithSlug.slug
    }
  })
}

export async function getPartners() {
  // For now, return empty array since we don't have partner content yet
  // This will be populated when partner content is added
  return []
}