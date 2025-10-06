// Configuration des annonces pour la page d'accueil
// Vous pouvez facilement changer l'annonce active en modifiant ce fichier

export interface AnnouncementConfig {
  id: string
  type: 'event' | 'urgent' | 'info' | 'featured'
  title: string
  message: string
  actionText?: string
  actionUrl?: string
  date?: string
  dismissible?: boolean
  active: boolean
  priority: number // Plus le nombre est élevé, plus la priorité est haute
}

export const announcements: AnnouncementConfig[] = [
  {
    id: 'workshop-2025',
    type: 'event',
    title: '🎉 Workshop Cloud Computing 2025 - Inscriptions Ouvertes !',
    message: 'Rejoignez-nous le 15 mars 2025 pour un workshop intensif sur les dernières innovations en Cloud Computing et Edge Computing. Places limitées !',
    actionText: 'S\'inscrire maintenant',
    actionUrl: '/events/workshop-cloud-computing-2025',
    date: '15 Mars 2025',
    dismissible: true,
    active: false,
    priority: 10
  },
  {
    id: 'new-publication',
    type: 'featured',
    title: '📚 Nouvelle Publication Scientifique',
    message: 'Notre dernière recherche sur l\'optimisation Cloud-Edge vient d\'être acceptée dans une revue internationale de premier plan.',
    actionText: 'Lire l\'article',
    actionUrl: '/publications/cloud-edge-optimization-2025',
    dismissible: true,
    active: true,
    priority: 8
  },
  {
    id: 'partnership-announcement',
    type: 'info',
    title: '🤝 Nouveau Partenariat Stratégique',
    message: 'C5IN annonce un partenariat avec l\'Université de Douala pour renforcer la recherche en IoT et Green Computing.',
    actionText: 'En savoir plus',
    actionUrl: '/about',
    dismissible: true,
    active: false,
    priority: 6
  },
  {
    id: 'urgent-deadline',
    type: 'urgent',
    title: '⏰ Derniers Jours pour Candidater',
    message: 'Il ne reste que quelques jours pour soumettre votre candidature au programme de formation en Federated Learning.',
    actionText: 'Candidater',
    actionUrl: '/events/formation-federated-learning',
    date: 'Échéance: 30 Jan 2025',
    dismissible: true,
    active: false,
    priority: 9
  },
  {
    id: 'media-coverage',
    type: 'featured',
    title: '📺 C5IN dans les Médias',
    message: 'Notre réseau d\'innovation fait la une des journaux nationaux pour ses contributions à la transformation numérique du Cameroun.',
    actionText: 'Voir l\'article',
    actionUrl: '/blog',
    dismissible: true,
    active: true,
    priority: 5
  }
]

// Fonction pour obtenir l'annonce active avec la plus haute priorité
export function getActiveAnnouncement(): AnnouncementConfig | null {
  const activeAnnouncements = announcements.filter(a => a.active)
  
  if (activeAnnouncements.length === 0) {
    return null
  }
  
  // Trier par priorité décroissante et retourner la première
  return activeAnnouncements.sort((a, b) => b.priority - a.priority)[0]
}

// Fonction pour obtenir toutes les annonces actives triées par priorité
export function getActiveAnnouncements(): AnnouncementConfig[] {
  return announcements
    .filter(a => a.active)
    .sort((a, b) => b.priority - a.priority)
}

// Fonction pour activer/désactiver une annonce
export function toggleAnnouncement(id: string, active: boolean): void {
  const announcement = announcements.find(a => a.id === id)
  if (announcement) {
    announcement.active = active
  }
}

// Exemples d'utilisation :
// 1. Pour changer l'annonce active, modifiez le champ 'active' dans le tableau ci-dessus
// 2. Pour créer une nouvelle annonce, ajoutez un nouvel objet au tableau
// 3. Pour changer la priorité, modifiez le champ 'priority'