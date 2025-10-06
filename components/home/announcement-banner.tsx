'use client'

import { useState } from 'react'
// import Link from 'next/link'
// import { Route } from 'next'
import { X, Calendar, AlertCircle, Info, Star, ArrowRight, Clock } from 'lucide-react'

interface AnnouncementBannerProps {
  type?: 'event' | 'urgent' | 'info' | 'featured'
  title: string
  message: string
  actionText?: string
  actionUrl?: string
  date?: string
  dismissible?: boolean
}

const typeConfig = {
  event: {
    icon: Calendar,
    bgColor: 'from-blue-600 to-blue-700',
    badgeColor: 'bg-blue-100 text-blue-800',
    badgeText: 'Événement'
  },
  urgent: {
    icon: AlertCircle,
    bgColor: 'from-red-600 to-red-700',
    badgeColor: 'bg-red-100 text-red-800',
    badgeText: 'Urgent'
  },
  info: {
    icon: Info,
    bgColor: 'from-green-600 to-green-700',
    badgeColor: 'bg-green-100 text-green-800',
    badgeText: 'Information'
  },
  featured: {
    icon: Star,
    bgColor: 'from-purple-600 to-purple-700',
    badgeColor: 'bg-purple-100 text-purple-800',
    badgeText: 'À la une'
  }
}

export function AnnouncementBanner({
  type = 'info',
  title,
  message,
  actionText,
  actionUrl,
  date,
  dismissible = true
}: AnnouncementBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  
  if (!isVisible) return null
  
  const config = typeConfig[type]
  const IconComponent = config.icon

  const handleDismiss = () => {
    // console.log('🔥 DISMISS CLICKED!')
    // alert('Bouton de fermeture cliqué!')
    setIsVisible(false)
  }

//   const handleActionClick = () => {
//     console.log('🔥 ACTION CLICKED!')
//     alert('Bouton d\'action cliqué!')
//   }

  return (
    <div className="relative overflow-hidden z-10">
      <div className={`bg-gradient-to-r ${config.bgColor} relative z-20`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left content */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <IconComponent className="w-5 h-5 text-white" />
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1">
                  <span className={`${config.badgeColor} px-2 py-1 rounded-full text-xs font-medium`}>
                    {config.badgeText}
                  </span>
                  {date && (
                    <div className="flex items-center gap-1 text-white/80 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{date}</span>
                    </div>
                  )}
                </div>
                
                <div className="text-white">
                  <h3 className="font-semibold text-sm md:text-base leading-tight mb-1">
                    {title}
                  </h3>
                  <p className="text-white/90 text-xs md:text-sm leading-relaxed line-clamp-2">
                    {message}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right buttons */}
            <div className="flex items-center gap-3 flex-shrink-0 z-30">
              {/* Action button */}
              {actionText && actionUrl && (
                <a 
                  href={actionUrl}
                  //onClick={handleActionClick}
                  className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition-all duration-200 text-sm font-medium cursor-pointer"
                  style={{ pointerEvents: 'auto' }}
                >
                  {actionText}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              )}
              
              {/* Dismiss button */}
              {dismissible && (
                <button
                  onClick={handleDismiss}
                  className="p-2 bg-white/20 text-white hover:bg-white/30 rounded-md transition-all duration-200 cursor-pointer"
                  aria-label="Fermer l'annonce"
                  type="button"
                  style={{ pointerEvents: 'auto' }}
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      </div>
    </div>
  )
}