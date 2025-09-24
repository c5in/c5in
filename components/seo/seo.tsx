import { Metadata } from 'next'
import { siteConfig } from '@/lib/config'
import { EventContent, BlogContent, Member, PublicationContent } from '@/types'

export interface SEOProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  publishedTime?: string
  modifiedTime?: string
  author?: string
  tags?: string[]
  noIndex?: boolean
  canonical?: string
}

export interface ContentSEOProps {
  content: EventContent | BlogContent | Member | PublicationContent
  type: 'event' | 'blog' | 'member' | 'publication'
  url?: string
}

/**
 * Generate metadata for Next.js pages
 */
export function generateSEOMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  modifiedTime,
  author,
  tags,
  noIndex = false,
  canonical,
}: SEOProps): Metadata {
  // Don't add site name here since it's handled by the layout template
  const seoTitle = title || siteConfig.seo.defaultTitle
  const seoDescription = description || siteConfig.seo.defaultDescription
  const seoUrl = url ? `${siteConfig.seo.siteUrl}${url}` : siteConfig.seo.siteUrl
  const seoImage = image ? `${siteConfig.seo.siteUrl}${image}` : siteConfig.seo.openGraph.images[0].url
  
  // Generate canonical URL - use provided canonical or derive from URL
  const canonicalUrl = canonical || seoUrl

  const metadata: Metadata = {
    title: seoTitle,
    description: seoDescription,
    keywords: tags?.join(', '),
    authors: author ? [{ name: author }] : [{ name: siteConfig.name }],
    robots: noIndex ? 'noindex,nofollow' : 'index,follow',
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: type as 'website' | 'article' | 'profile',
      locale: siteConfig.seo.openGraph.locale,
      url: seoUrl,
      title: seoTitle,
      description: seoDescription,
      siteName: siteConfig.seo.openGraph.siteName,
      images: [
        {
          url: seoImage,
          width: 1200,
          height: 630,
          alt: seoTitle,
        },
      ],
      publishedTime,
      modifiedTime,
      authors: author ? [author] : undefined,
      tags,
    },
    twitter: {
      card: siteConfig.seo.twitter.cardType as 'summary' | 'summary_large_image' | 'app' | 'player',
      site: siteConfig.seo.twitter.site,
      creator: siteConfig.seo.twitter.handle,
      title: seoTitle,
      description: seoDescription,
      images: [seoImage],
    },
  }

  return metadata
}

/**
 * Generate metadata for content pages (events, blog, members, publications)
 */
export function generateContentSEOMetadata({
  content,
  type,
  url,
}: ContentSEOProps): Metadata {
  const baseUrl = url || `/${type === 'member' ? 'members' : type}/${content.slug}`
  
  // Helper function to get description based on content type
  const getContentDescription = (content: EventContent | BlogContent | Member | PublicationContent): string | undefined => {
    if ('description' in content) {
      return content.description
    }
    if ('abstract' in content) {
      return content.abstract
    }
    if ('bio' in content) {
      return content.bio
    }
    return content.excerpt
  }

  // Helper function to get tags safely
  const getContentTags = (content: EventContent | BlogContent | Member | PublicationContent): string[] => {
    if ('tags' in content) {
      return content.tags
    }
    return []
  }

  let seoProps: SEOProps = {
    title: content.title,
    description: content.excerpt || getContentDescription(content),
    url: baseUrl,
    tags: getContentTags(content),
  }

  // Type-specific metadata
  switch (type) {
    case 'event':
      const event = content as EventContent
      seoProps = {
        ...seoProps,
        type: 'article',
        publishedTime: new Date(event.date).toISOString(),
        description: event.description || event.excerpt,
      }
      break

    case 'blog':
      const blog = content as BlogContent
      seoProps = {
        ...seoProps,
        type: 'article',
        author: blog.author,
        publishedTime: new Date(blog.date).toISOString(),
        image: blog.coverImage,
      }
      break

    case 'member':
      const member = content as Member
      seoProps = {
        ...seoProps,
        type: 'profile',
        description: member.bio || member.excerpt,
        image: member.photo,
      }
      break

    case 'publication':
      const publication = content as PublicationContent
      seoProps = {
        ...seoProps,
        type: 'article',
        publishedTime: new Date(publication.date).toISOString(),
        description: publication.abstract || publication.excerpt,
      }
      break
  }

  return generateSEOMetadata(seoProps)
}

/**
 * Generate JSON-LD structured data for events
 */
export function generateEventStructuredData(event: EventContent, url: string) {
  const eventUrl = `${siteConfig.seo.siteUrl}${url}`
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.title,
    description: event.description,
    startDate: new Date(event.date).toISOString(),
    endDate: event.endDate ? new Date(event.endDate).toISOString() : undefined,
    location: {
      '@type': 'Place',
      name: event.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Yaoundé',
        addressCountry: 'CM',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.seo.siteUrl,
    },
    url: eventUrl,
    image: `${siteConfig.seo.siteUrl}/images/events/${event.slug}.jpg`,
    offers: event.registrationUrl ? {
      '@type': 'Offer',
      url: event.registrationUrl,
      price: '0',
      priceCurrency: 'XAF',
      availability: 'https://schema.org/InStock',
    } : undefined,
    performer: event.speakers?.map(speaker => ({
      '@type': 'Person',
      name: speaker.name,
      affiliation: speaker.affiliation,
    })),
  }
}

/**
 * Generate JSON-LD structured data for blog articles
 */
export function generateArticleStructuredData(article: BlogContent, url: string) {
  const articleUrl = `${siteConfig.seo.siteUrl}${url}`
  
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.coverImage ? `${siteConfig.seo.siteUrl}${article.coverImage}` : undefined,
    datePublished: new Date(article.date).toISOString(),
    dateModified: new Date(article.date).toISOString(),
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.seo.siteUrl}${siteConfig.logo}`,
      },
    },
    url: articleUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': articleUrl,
    },
    keywords: article.tags.join(', '),
  }
}

/**
 * Generate JSON-LD structured data for publications
 */
export function generatePublicationStructuredData(publication: PublicationContent, url: string) {
  const publicationUrl = `${siteConfig.seo.siteUrl}${url}`
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: publication.title,
    abstract: publication.abstract,
    datePublished: new Date(publication.date).toISOString(),
    author: publication.authors.map(author => ({
      '@type': 'Person',
      name: author,
    })),
    publisher: {
      '@type': 'Organization',
      name: publication.journal,
    },
    url: publicationUrl,
    identifier: publication.doi ? {
      '@type': 'PropertyValue',
      propertyID: 'DOI',
      value: publication.doi,
    } : undefined,
    keywords: publication.tags.join(', '),
    isPartOf: {
      '@type': 'PublicationIssue',
      isPartOf: {
        '@type': 'PublicationVolume',
        isPartOf: {
          '@type': 'Periodical',
          name: publication.journal,
        },
      },
    },
  }
}

/**
 * Generate JSON-LD structured data for organization
 */
export function generateOrganizationStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.seo.siteUrl,
    logo: `${siteConfig.seo.siteUrl}${siteConfig.logo}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      email: siteConfig.contact.email,
      availableLanguage: ['French', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.contact.address,
      addressLocality: 'Yaoundé',
      addressCountry: 'CM',
    },
    sameAs: siteConfig.social.map(social => social.url),
    foundingDate: '2024',
    areaServed: {
      '@type': 'Country',
      name: 'Cameroon',
    },
    knowsAbout: [
      'Cloud Computing',
      'Edge Computing',
      'Internet of Things',
      'Green Computing',
      'Federated Learning',
    ],
  }
}

/**
 * Generate JSON-LD structured data for website
 */
export function generateWebsiteStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.seo.siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.seo.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: {
        '@type': 'ImageObject',
        url: `${siteConfig.seo.siteUrl}${siteConfig.logo}`,
      },
    },
  }
}