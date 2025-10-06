import { SiteConfig, ResearchDomain } from '@/types'

export const siteConfig: SiteConfig = {
  name: "C5IN",
  description: "Réseau d'innovation camerounais spécialisé dans les technologies Cloud, Edge Computing et IoT",
  url: "https://c5in.org",
  logo: "/images/logo.png",
  social: [
    {
      platform: "twitter",
      url: "https://twitter.com/c5in_cameroon"
    },
    {
      platform: "linkedin",
      url: "https://linkedin.com/company/c5in"
    },
    {
      platform: "github",
      url: "https://github.com/c5in"
    }
  ],
  contact: {
    address: "Campus Ngoa-Ekellé, Université de Yaoundé I, Yaoundé, Cameroun",
    phone: "+237 6XX XXX XXX",
    email: "contact@c5in.org",
    hours: "Lundi - Vendredi: 8h00 - 17h00"
  },
  navigation: [
    {
      label: "Accueil",
      href: "/",
      enabled: true
    },
    {
      label: "À propos",
      href: "/about",
      enabled: true
    },
    {
      label: "Événements",
      href: "/events",
      enabled: true  // Désactivé pour le moment
    },
    {
      label: "Blog",
      href: "/blog",
      enabled: false  // Désactivé pour le moment
    },
    {
      label: "Membres",
      href: "/members",
      enabled: true
    },
    {
      label: "Publications",
      href: "/publications",
      enabled: false  // Désactivé pour le moment
    },
    {
      label: "Partenaires",
      href: "/partners",
      enabled: false  // Désactivé pour le moment
    },
    {
      label: "Contact",
      href: "/contact",
      enabled: true
    }
  ],
  features: {
    pages: {
      about: true,
      blog: false,        // Désactivé pour le moment
      events: true,      // Désactivé pour le moment
      members: true,
      publications: false, // Désactivé pour le moment
      partners: false,    // Désactivé pour le moment
      contact: true
    },
    components: {
      search: false,      // À développer plus tard
      newsletter: false,  // À développer plus tard
      analytics: false,   // À configurer plus tard
      darkMode: false     // À développer plus tard
    }
  },
  theme: {
    colors: {
      primary: "#1e40af",
      secondary: "#64748b",
      accent: "#0ea5e9",
      neutral: ["#ffffff", "#f8fafc", "#e2e8f0", "#0f172a", "#475569"]
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
      mono: "JetBrains Mono"
    },
    spacing: {
      xs: "4px",
      sm: "8px",
      md: "16px",
      lg: "24px",
      xl: "32px",
      "2xl": "48px",
      "3xl": "64px"
    }
  },
  seo: {
    defaultTitle: "C5IN - Cameroon Cloud-Edge-IoT Innovation Network",
    titleTemplate: "%s | C5IN",
    defaultDescription: "Réseau d'innovation camerounais spécialisé dans les technologies Cloud, Edge Computing et IoT",
    siteUrl: "https://c5in.org",
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "C5IN",
      images: [
        {
          url: "https://c5in.org/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "C5IN - Cameroon Cloud-Edge-IoT Innovation Network"
        }
      ]
    },
    twitter: {
      handle: "@c5in_cameroon",
      site: "@c5in_cameroon",
      cardType: "summary_large_image"
    }
  }
}

export const researchDomains: ResearchDomain[] = [
  {
    id: "cloud",
    title: "Cloud Computing",
    description: "Architectures et services cloud distribués pour l'Afrique",
    icon: "cloud",
    color: "blue"
  },
  {
    id: "edge",
    title: "Edge Computing",
    description: "Traitement de données en périphérie pour réduire la latence",
    icon: "cpu",
    color: "green"
  },
  {
    id: "iot",
    title: "Internet of Things",
    description: "Réseaux d'objets connectés et systèmes intelligents",
    icon: "wifi",
    color: "purple"
  },
  {
    id: "green",
    title: "Green Computing",
    description: "Solutions informatiques durables et éco-responsables",
    icon: "leaf",
    color: "emerald"
  },
  {
    id: "federated",
    title: "Federated Learning",
    description: "Apprentissage automatique distribué et préservation de la vie privée",
    icon: "brain",
    color: "orange"
  }
]