import { HeroSection } from '@/components/home/hero-section'
import { AnnouncementBanner } from '@/components/home/announcement-banner'
import { ResearchDomains } from '@/components/home/research-domains'
import { EventsPreview } from '@/components/home/events-preview'
import { BlogPreview } from '@/components/home/blog-preview'
import { MembersCarousel } from '@/components/home/members-carousel'
import { PartnersCarousel } from '@/components/home/partners-carousel'
import { FeatureGate } from '@/hooks/usePageAccess'
import { StructuredData, generateOrganizationStructuredData, generateWebsiteStructuredData, combineStructuredData } from '@/components/seo'
import { researchDomains } from '@/lib/config'
import { getLatestEvents, getLatestBlogPosts, getFeaturedMembers, getFeaturedPartners } from '@/lib/content'
import { getActiveAnnouncement } from '@/lib/announcements'

export default async function Home() {
  // Load content data
  const [events, blogPosts, members, partners] = await Promise.all([
    getLatestEvents(4),
    getLatestBlogPosts(3),
    getFeaturedMembers(),
    getFeaturedPartners(6)
  ])

  // Get active announcement
  const activeAnnouncement = getActiveAnnouncement()

  // Generate structured data for homepage
  const structuredData = combineStructuredData(
    generateOrganizationStructuredData(),
    generateWebsiteStructuredData()
  )

  return (
    <>
      <StructuredData data={structuredData} />
      <main className="min-h-screen">
        {/* Hero Section */}
        <HeroSection
          title="C5IN"
          subtitle="Cameroon Cloud-Edge-IoT Innovation Network"
          description="Le premier réseau de recherche et d'innovation du Cameroun dédié aux technologies Cloud, Edge Computing et IoT. Nous développons des solutions innovantes pour accélérer la transformation numérique en Afrique centrale et former la prochaine génération de chercheurs et d'ingénieurs."
          ctaButton={{
            text: "Découvrir nos projets",
            href: "/about"
          }}
        />

        {/* Announcement Banner */}
        {activeAnnouncement && (
          <AnnouncementBanner
            type={activeAnnouncement.type}
            title={activeAnnouncement.title}
            message={activeAnnouncement.message}
            actionText={activeAnnouncement.actionText}
            actionUrl={activeAnnouncement.actionUrl}
            date={activeAnnouncement.date}
            dismissible={activeAnnouncement.dismissible}
          />
        )}

        {/* Research Domains Section */}
        <ResearchDomains domains={researchDomains} />

        {/* Events Preview Section - Affiché seulement si activé */}
        <FeatureGate feature="events">
          <EventsPreview events={events} maxItems={4} />
        </FeatureGate>

        {/* Blog Preview Section - Affiché seulement si activé */}
        <FeatureGate feature="blog">
          <BlogPreview posts={blogPosts} maxItems={3} />
        </FeatureGate>

        {/* Members Carousel Section */}
        <MembersCarousel members={members} autoPlay={true} showDots={true} />

        {/* Partners Carousel Section - Affiché seulement si activé */}
        <FeatureGate feature="partners">
          <PartnersCarousel partners={partners} autoPlay={true} />
        </FeatureGate>
      </main>
    </>
  );
}
