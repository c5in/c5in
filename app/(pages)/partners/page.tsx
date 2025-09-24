import { Metadata } from 'next'
import { PartnersListing } from './partners-listing'
import { enhancedPartnersLoader } from '@/lib/content'
import { generateSEOMetadata } from '@/components/seo'

export const metadata: Metadata = generateSEOMetadata({
  title: 'Nos Partenaires',
  description: 'Découvrez les organisations qui nous accompagnent dans notre mission d\'innovation technologique au Cameroun et en Afrique centrale.',
  url: '/partners',
  tags: ['partenaires', 'collaboration', 'innovation', 'cameroun', 'technologie'],
})

export default async function PartnersPage() {
  try {
    const partners = await enhancedPartnersLoader.getAll()
    
    // Group partners by type
    const partnersByType = partners.reduce((acc, partner) => {
      const partnerWithType = partner as typeof partner & { type?: string }
      const type = partnerWithType.type || 'industry'
      if (!acc[type]) {
        acc[type] = []
      }
      acc[type].push(partner)
      return acc
    }, {} as Record<string, typeof partners>)

    return (
      <PartnersListing 
        partnersByType={partnersByType}
        totalPartners={partners.length}
      />
    )
  } catch (error) {
    console.error('Error loading partners:', error)
    return (
      <PartnersListing 
        partnersByType={{}}
        totalPartners={0}
      />
    )
  }
}