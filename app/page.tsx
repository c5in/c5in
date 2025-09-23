import { HeroSection } from '@/components/home/hero-section'
import { ResearchDomains } from '@/components/home/research-domains'
import { EventsPreview } from '@/components/home/events-preview'
import { BlogPreview } from '@/components/home/blog-preview'
import { MembersCarousel } from '@/components/home/members-carousel'
import { PartnersCarousel } from '@/components/home/partners-carousel'
import { researchDomains } from '@/lib/config'
import { getLatestEvents, getLatestBlogPosts, getFeaturedMembers, getPartners } from '@/lib/content'

export default async function Home() {
  // Load content data
  const [events, blogPosts, members, partners] = await Promise.all([
    getLatestEvents(4),
    getLatestBlogPosts(3),
    getFeaturedMembers(),
    getPartners()
  ])

  return (
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

      {/* Research Domains Section */}
      <ResearchDomains domains={researchDomains} />

      {/* Events Preview Section */}
      <EventsPreview events={events} maxItems={4} />

      {/* Blog Preview Section */}
      <BlogPreview posts={blogPosts} maxItems={3} />

      {/* Members Carousel Section */}
      <MembersCarousel members={members} autoPlay={true} showDots={true} />

      {/* Partners Carousel Section */}
      <PartnersCarousel partners={partners} autoPlay={true} />
    </main>
  );
}
