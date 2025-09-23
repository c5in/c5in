import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { enhancedMembersLoader, markdownParser } from '@/lib/content'
import { Member } from '@/types'
import MemberDetail from './member-detail'

interface MemberPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateMetadata({ params }: MemberPageProps): Promise<Metadata> {
  const resolvedParams = await params
  const member = await enhancedMembersLoader.getBySlug(resolvedParams.slug)
  
  if (!member) {
    return {
      title: 'Membre non trouvé | C5IN',
      description: 'Le membre demandé n\'existe pas.',
    }
  }

  return {
    title: `${member.name} | C5IN`,
    description: member.bio,
    openGraph: {
      title: `${member.name} | C5IN`,
      description: member.bio,
      type: 'profile',
      images: member.photo ? [
        {
          url: member.photo,
          width: 400,
          height: 400,
          alt: member.name,
        }
      ] : undefined,
    },
  }
}

export async function generateStaticParams() {
  const members = await enhancedMembersLoader.getAll()
  
  return members.map((member) => ({
    slug: member.slug,
  }))
}

export default async function MemberPage({ params }: MemberPageProps) {
  const resolvedParams = await params
  const member = await enhancedMembersLoader.getBySlug(resolvedParams.slug)
  
  if (!member) {
    notFound()
  }

  // Get the full content with markdown rendered to HTML
  let contentHtml = ''
  if (member.content) {
    try {
      contentHtml = await markdownParser.renderToHtml(member.content)
    } catch (error) {
      console.error('Error rendering member content:', error)
    }
  }

  // Get related members (same affiliation or featured members)
  const relatedMembersResult = await enhancedMembersLoader.getFiltered(
    { 
      featured: true 
    },
    { field: 'order', order: 'asc' }
  )
  
  const relatedMembers = Array.isArray(relatedMembersResult) 
    ? relatedMembersResult as Member[]
    : relatedMembersResult.items as Member[]

  // Filter out current member and limit to 3
  const filteredRelatedMembers = relatedMembers
    .filter(m => m.slug !== member.slug)
    .slice(0, 3)

  return (
    <MemberDetail 
      member={member}
      contentHtml={contentHtml}
      relatedMembers={filteredRelatedMembers}
    />
  )
}