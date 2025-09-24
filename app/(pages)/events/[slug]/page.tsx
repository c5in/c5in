import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { enhancedEventsLoader } from '@/lib/content'
import { EventContent } from '@/types'
import { generateContentSEOMetadata, StructuredData, generateEventStructuredData } from '@/components/seo'
import EventDetail from './event-detail'

interface EventPageProps {
  params: Promise<{
    slug: string
  }>
}

async function getEventData(slug: string) {
  try {
    const event = await enhancedEventsLoader.getBySlug(slug)
    if (!event) {
      return {
        event: null,
        relatedEvents: [],
        contentHtml: null,
        error: 'Événement non trouvé'
      }
    }

    // Get related events
    const relatedEvents = await enhancedEventsLoader.getRelatedContent(slug, 3)
    
    // Render content to HTML
    const contentHtml = await enhancedEventsLoader.renderContentToHtml(slug)

    return {
      event,
      relatedEvents,
      contentHtml,
      error: null
    }
  } catch (error) {
    console.error('Error loading event:', error)
    return {
      event: null,
      relatedEvents: [],
      contentHtml: null,
      error: 'Erreur lors du chargement de l\'événement'
    }
  }
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { slug } = await params
  const { event } = await getEventData(slug)
  
  if (!event) {
    return {
      title: 'Événement non trouvé | C5IN',
      description: 'L\'événement demandé n\'a pas été trouvé.',
    }
  }

  return generateContentSEOMetadata({
    content: event,
    type: 'event',
    url: `/events/${event.slug}`,
  })
}

export async function generateStaticParams() {
  try {
    const events = await enhancedEventsLoader.getAll()
    return events.map((event) => ({
      slug: event.slug,
    }))
  } catch (error) {
    console.error('Error generating static params for events:', error)
    return []
  }
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params
  const { event, relatedEvents, contentHtml, error } = await getEventData(slug)

  if (error || !event) {
    notFound()
  }

  // Generate structured data
  const structuredData = generateEventStructuredData(event as EventContent, `/events/${event.slug}`)

  return (
    <>
      <StructuredData data={structuredData} />
      <EventDetail 
        event={event as EventContent}
        relatedEvents={relatedEvents as EventContent[]}
        contentHtml={contentHtml}
      />
    </>
  )
}