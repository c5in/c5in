'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { 
  Calendar, 
  MapPin, 
  Users, 
  //Clock, 
  ExternalLink, 
  Share2,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Star,
  Heart
} from 'lucide-react'
import { EventContent } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
//import { Separator } from '@/components/ui/separator'
import { MarkdownContent } from '@/components/ui/markdown-content'
import { Route } from 'next'

interface EventDetailProps {
  event: EventContent
  relatedEvents: EventContent[]
  contentHtml: string | null
}

function Breadcrumb({ event }: { event: EventContent }) {
  return (
    <nav className="flex items-center space-x-2 text-sm text-slate-600 mb-8">
      <Link href="/" className="hover:text-blue-600 transition-all duration-200 hover:underline">
        Accueil
      </Link>
      <ChevronRight className="w-4 h-4 text-slate-400" />
      <Link href={"/events" as Route } className="hover:text-blue-600 transition-all duration-200 hover:underline">
        Événements
      </Link>
      <ChevronRight className="w-4 h-4 text-slate-400" />
      <span className="text-slate-900 font-medium line-clamp-1">
        {event.title}
      </span>
    </nav>
  )
}

function ShareButton({ event }: { event: EventContent }) {
  const [copied, setCopied] = useState(false)
  const [showShareMenu, setShowShareMenu] = useState(false)

  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareText = `${event.title} - ${event.description.substring(0, 100)}...`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareOnTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowShareMenu(!showShareMenu)}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-blue-300 hover:shadow-md transition-all duration-200"
      >
        <Share2 className="w-4 h-4" />
        Partager
      </Button>

      {showShareMenu && (
        <div className="absolute right-0 top-full mt-2 w-52 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-xl z-10 overflow-hidden">
          <div className="p-2 space-y-1">
            <button
              onClick={copyToClipboard}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
              <span className={copied ? 'text-green-600 font-medium' : 'text-slate-700'}>
                {copied ? 'Copié !' : 'Copier le lien'}
              </span>
            </button>
            <button
              onClick={shareOnTwitter}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 rounded-lg transition-colors text-slate-700"
            >
              <ExternalLink className="w-4 h-4 text-slate-600" />
              Partager sur Twitter
            </button>
            <button
              onClick={shareOnLinkedIn}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm hover:bg-blue-50 rounded-lg transition-colors text-slate-700"
            >
              <ExternalLink className="w-4 h-4 text-slate-600" />
              Partager sur LinkedIn
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

function EventMeta({ event }: { event: EventContent }) {
  const eventDate = new Date(event.date)
  const endDate = event.endDate ? new Date(event.endDate) : null
  const isMultiDay = endDate && endDate.getTime() !== eventDate.getTime()

  return (
    <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></div>
          Informations pratiques
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
          <div className="p-2 rounded-lg bg-blue-100">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900 mb-1">
              {format(eventDate, 'EEEE dd MMMM yyyy', { locale: fr })}
            </div>
            {isMultiDay && (
              <div className="text-sm text-slate-600 mb-1">
                au {format(endDate, 'EEEE dd MMMM yyyy', { locale: fr })}
              </div>
            )}
            <div className="text-sm text-blue-600 font-medium bg-blue-100 px-2 py-1 rounded-md inline-block">
              {format(eventDate, 'HH:mm', { locale: fr })}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-100">
          <div className="p-2 rounded-lg bg-emerald-100">
            <MapPin className="w-5 h-5 text-emerald-600" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-slate-900">{event.location}</div>
          </div>
        </div>

        {event.speakers && event.speakers.length > 0 && (
          <div className="flex items-start gap-4 p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
            <div className="p-2 rounded-lg bg-purple-100">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <div className="font-semibold text-slate-900 mb-3">
                Intervenant{event.speakers.length > 1 ? 's' : ''}
              </div>
              <div className="space-y-3">
                {event.speakers.map((speaker, index) => (
                  <div key={index} className="bg-white/60 rounded-lg p-3 border border-white/40">
                    <div className="font-medium text-slate-900">{speaker.name}</div>
                    <div className="text-sm text-purple-600 font-medium">{speaker.affiliation}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {event.registrationUrl && (
          <div className="pt-2">
            <Link 
              href={event.registrationUrl as Route } 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                <ExternalLink className="w-5 h-5 mr-2" />
                S&apos;inscrire à l&apos;événement
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function ProgramSection({ event }: { event: EventContent }) {
  if (!event.program || event.program.length === 0) return null

  return (
    <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-orange-600 to-red-600 rounded-full"></div>
          Programme
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {event.program.map((item, index) => (
            <div key={index} className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-100 hover:shadow-md transition-all duration-200">
              <div className="w-20 text-sm font-bold text-orange-600 shrink-0 bg-orange-100 px-3 py-2 rounded-lg text-center">
                {item.time}
              </div>
              <div className="flex-1">
                <div className="font-semibold text-slate-900 mb-1">{item.title}</div>
                {item.speaker && (
                  <div className="text-sm text-orange-600 font-medium mb-2 bg-orange-100 px-2 py-1 rounded-md inline-block">
                    Par {item.speaker}
                  </div>
                )}
                {item.description && (
                  <div className="text-sm text-slate-700 leading-relaxed">
                    {item.description}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function RelatedEvents({ events }: { events: EventContent[] }) {
  if (events.length === 0) return null

  return (
    <Card className="border-0 shadow-xl bg-gradient-to-br from-white to-slate-50/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent flex items-center gap-2">
          <div className="w-2 h-6 bg-gradient-to-b from-teal-600 to-cyan-600 rounded-full"></div>
          Événements similaires
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.slug} className="border border-slate-100 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
              <Link 
                href={`/events/${event.slug}` as Route }
                className="block p-4 bg-gradient-to-r from-teal-50 to-cyan-50 hover:from-teal-100 hover:to-cyan-100 transition-all duration-200"
              >
                <div className="font-semibold text-slate-900 mb-2 line-clamp-2">
                  {event.title}
                </div>
                <div className="text-sm text-teal-600 font-medium mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {format(new Date(event.date), 'dd MMMM yyyy', { locale: fr })}
                  <span className="text-slate-400">•</span>
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <div className="text-sm text-slate-700 line-clamp-2 leading-relaxed">
                  {event.excerpt || event.description}
                </div>
              </Link>
            </div>
          ))}
        </div>
        <div className="mt-6">
          <Link href={"/events" as Route }>
            <Button variant="outline" size="sm" className="w-full h-11 border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300 font-medium rounded-xl transition-all duration-200">
              Voir tous les événements
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default function EventDetail({ event, relatedEvents, contentHtml }: EventDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumb event={event} />
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8 relative">
              {/* Background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl -z-10 transform -rotate-1"></div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/50">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    {event.featured && (
                      <div className="mb-4">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0 px-3 py-1 font-medium shadow-md">
                          <Star className="w-4 h-4 mr-1" />
                          Événement à la une
                        </Badge>
                      </div>
                    )}
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4 leading-tight">
                      {event.title}
                    </h1>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-red-300 text-slate-600 hover:text-red-600 transition-all duration-200">
                      <Heart className="w-4 h-4" />
                    </Button>
                    <ShareButton event={event} />
                  </div>
                </div>
                
                <p className="text-lg text-slate-700 mb-6 leading-relaxed">
                  {event.description}
                </p>
                
                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag) => (
                      <Link key={tag} href={`/events?tag=${encodeURIComponent(tag)}` as Route }>
                        <Badge 
                          variant="outline" 
                          className="bg-white/60 border-slate-200 text-slate-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 cursor-pointer px-3 py-1 font-medium"
                        >
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            {contentHtml && (
              <div className="mb-8">
                <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <MarkdownContent content={contentHtml} />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-8">
              <Link href={"/events" as Route }>
                <Button variant="outline" className="bg-white/80 backdrop-blur-sm border-slate-200 hover:bg-white hover:border-slate-300 h-11 px-6 font-medium rounded-xl">
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Retour aux événements
                </Button>
              </Link>
              
              {event.registrationUrl && (
                <Link 
                  href={event.registrationUrl as Route } 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 h-11 px-6 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    S&apos;inscrire
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <EventMeta event={event} />
            <ProgramSection event={event} />
            <RelatedEvents events={relatedEvents} />
          </div>
        </div>
      </div>
    </div>
  )
}