import { PageHeader } from './page-header'
import { Info, Users, Cloud, Calendar } from 'lucide-react'

// Exemple d'utilisation du composant PageHeader

export function PageHeaderExample() {
  return (
    <>
      {/* Exemple 1: Page simple avec breadcrumb */}
      <PageHeader
        title="Documentation"
        description="Trouvez toutes les informations nécessaires pour utiliser nos services et technologies"
        breadcrumb={[
          { label: "Ressources", href: "/resources" },
          { label: "Documentation" }
        ]}
      />

      {/* Exemple 2: Page avec badge et breadcrumb complexe */}
      <PageHeader
        badge={{ icon: Info, text: "À propos" }}
        title="Innovation & Excellence"
        subtitle="Réseau Camerounais d'Innovation"
        description="Le Cameroon Cloud-Edge-IoT Innovation Network est le premier réseau de recherche et d'innovation du Cameroun dédié aux technologies émergentes."
        breadcrumb={[
          { label: "À propos", icon: Info }
        ]}
      />

      {/* Exemple 3: Page avec breadcrumb multi-niveaux */}
      <PageHeader
        badge={{ icon: Cloud, text: "Technologies" }}
        title="Cloud Computing"
        subtitle="Solutions Cloud Avancées"
        description="Découvrez nos solutions cloud computing de nouvelle génération pour l'Afrique"
        breadcrumb={[
          { label: "Technologies", href: "/technologies", icon: Cloud },
          { label: "Cloud Computing" }
        ]}
      />

      {/* Exemple 4: Page d'événement avec breadcrumb détaillé */}
      <PageHeader
        badge={{ icon: Calendar, text: "Événement" }}
        title="Conférence Edge & IoT 2025"
        description="La plus grande conférence sur les technologies Edge Computing et IoT en Afrique centrale"
        breadcrumb={[
          { label: "Événements", href: "/events", icon: Calendar },
          { label: "Conférences", href: "/events/conferences" },
          { label: "Edge & IoT 2025" }
        ]}
      />

      {/* Exemple 5: Page équipe avec enfants personnalisés */}
      <PageHeader
        title="Notre Équipe"
        subtitle="Les experts derrière C5IN"
        description="Rencontrez l'équipe de chercheurs et d'innovateurs qui construisent l'avenir technologique du Cameroun"
        breadcrumb={[
          { label: "À propos", href: "/about" },
          { label: "Équipe", icon: Users }
        ]}
      >
        <div className="flex flex-wrap gap-4 justify-center">
          <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
            15+ Membres
          </span>
          <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
            5 Domaines d&apos;expertise
          </span>
          <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
            3 Universités partenaires
          </span>
        </div>
      </PageHeader>
    </>
  )
}