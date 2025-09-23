// Base content interface
export interface BaseContent {
  slug: string
  title: string
  date: Date | string
  tags: string[]
  featured: boolean
  excerpt?: string
  content?: string
}

// Core content types
export interface Member {
  id: string
  slug: string
  name: string
  title: string
  affiliation: string
  bio: string
  photo: string
  email?: string
  socialLinks?: SocialLink[]
  order: number
  featured: boolean
  content?: string
  excerpt?: string
}

export interface EventContent extends BaseContent {
  location: string
  description: string
  endDate?: Date | string
  program?: ProgramItem[]
  speakers?: Speaker[]
  registrationUrl?: string
}

export interface BlogContent extends BaseContent {
  author: string
  coverImage?: string
}

export interface PublicationContent extends BaseContent {
  authors: string[]
  journal: string
  doi?: string
  abstract: string
  pdfUrl?: string
  type: 'journal' | 'conference' | 'workshop' | 'thesis'
}

// Supporting types
export interface SocialLink {
  platform: string
  url: string
}

export interface ProgramItem {
  time: string
  title: string
  speaker?: string
  description?: string
}

export interface Speaker {
  name: string
  affiliation: string
  bio?: string
}

export interface Partner {
  id: string
  name: string
  logo: string
  website?: string
  description?: string
}

// Navigation and layout types
export interface NavigationItem {
  label: string
  href: string
  children?: NavigationItem[]
}

export interface ContactInfo {
  address: string
  phone: string
  email: string
  hours: string
}

// Site configuration
export interface SiteConfig {
  name: string
  description: string
  url: string
  logo: string
  social: SocialLink[]
  contact: ContactInfo
  navigation: NavigationItem[]
  theme: ThemeConfig
  seo: SEOConfig
}

export interface ThemeConfig {
  colors: {
    primary: string
    secondary: string
    accent: string
    neutral: string[]
  }
  fonts: {
    heading: string
    body: string
    mono: string
  }
  spacing: {
    xs: string
    sm: string
    md: string
    lg: string
    xl: string
    '2xl': string
    '3xl': string
  }
}

export interface SEOConfig {
  defaultTitle: string
  titleTemplate: string
  defaultDescription: string
  siteUrl: string
  openGraph: {
    type: string
    locale: string
    siteName: string
    images: Array<{
      url: string
      width: number
      height: number
      alt: string
    }>
  }
  twitter: {
    handle: string
    site: string
    cardType: string
  }
}

// Research domains
export interface ResearchDomain {
  id: string
  title: string
  description: string
  icon: string
  color: string
}

// Content loading and filtering types
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

export interface SearchOptions {
  query: string
  fields?: string[]
  filters?: FilterOptions
  sort?: SortOptions
  pagination?: PaginationOptions
}

// Content loader interface
export interface ContentLoader<T> {
  getAll(): Promise<T[]>
  getBySlug(slug: string): Promise<T | null>
  getFeatured(limit?: number): Promise<T[]>
  getByTag(tag: string): Promise<T[]>
  getRecent(limit?: number): Promise<T[]>
  getAllTags(): Promise<string[]>
  renderContentToHtml(slug: string): Promise<string | null>
}

export interface EnhancedContentLoader<T> extends ContentLoader<T> {
  getFiltered(
    filters: FilterOptions,
    sortOptions?: SortOptions,
    paginationOptions?: PaginationOptions
  ): Promise<PaginatedResult<T> | T[]>
  
  searchContent(
    query: string,
    fields?: string[],
    paginationOptions?: PaginationOptions
  ): Promise<PaginatedResult<T> | T[]>
  
  getRelatedContent(slug: string, limit?: number): Promise<T[]>
}

// Markdown parser interface
export interface MarkdownParser {
  parse<T>(filePath: string): Promise<{
    frontMatter: T
    content: string
    excerpt: string
  }>
  
  renderToHtml(content: string): Promise<string>
}

// Component prop types
export interface HeroProps {
  title: string
  subtitle: string
  description: string
  ctaButton?: {
    text: string
    href: string
  }
}

export interface ResearchDomainsProps {
  domains: ResearchDomain[]
}

export interface EventPreview {
  id: string
  title: string
  date: Date | string
  location: string
  excerpt: string
  slug: string
}

export interface EventsPreviewProps {
  events: EventPreview[]
  maxItems: number
}

export interface BlogPreview {
  id: string
  title: string
  author: string
  date: Date | string
  excerpt: string
  tags: string[]
  slug: string
}

export interface BlogPreviewProps {
  posts: BlogPreview[]
  maxItems: number
}

export interface MembersCarouselProps {
  members: Member[]
  autoPlay?: boolean
  showDots?: boolean
}

export interface PartnersCarouselProps {
  partners: Partner[]
  autoPlay?: boolean
}

export interface HeaderProps {
  navigation: NavigationItem[]
  logo: string
  siteName: string
}

export interface FooterProps {
  socialLinks: SocialLink[]
  contactInfo: ContactInfo
  navigation: NavigationItem[]
}

// Form types
export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export interface ContactFormProps {
  onSubmit: (data: ContactFormData) => Promise<void>
  isSubmitting?: boolean
}

// Utility types
export type ContentType = 'event' | 'blog' | 'member' | 'publication'

export type ContentItem = EventContent | BlogContent | Member | PublicationContent

export type WithSlug<T> = T & { slug: string }

export type WithExcerpt<T> = T & { excerpt: string }

export type WithContent<T> = T & { content: string }

export type ContentPreview<T extends BaseContent> = Pick<T, 'title' | 'slug' | 'date' | 'excerpt' | 'featured' | 'tags'>

// Error types
export interface ContentError {
  type: 'validation' | 'parsing' | 'loading' | 'rendering'
  message: string
  file?: string
  field?: string
}

// API response types
export interface APIResponse<T> {
  data: T
  success: boolean
  error?: string
}

export interface PaginatedAPIResponse<T> extends APIResponse<T[]> {
  pagination: PaginatedResult<T>['pagination']
}