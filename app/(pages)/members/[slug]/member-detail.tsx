'use client'

import Link from 'next/link'
import { Route } from 'next'
import { ArrowLeft, Mail, Linkedin, Twitter, Github, ExternalLink, GraduationCap, Award, Users } from 'lucide-react'
import { Member } from '@/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { MarkdownContent } from '@/components/ui/markdown-content'

interface MemberDetailProps {
  member: Member
  contentHtml: string
  relatedMembers: Member[]
}

export default function MemberDetail({ member, contentHtml, relatedMembers }: MemberDetailProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />
      case 'twitter':
        return <Twitter className="w-5 h-5" />
      case 'github':
        return <Github className="w-5 h-5" />
      case 'orcid':
        return <Award className="w-5 h-5" />
      case 'researchgate':
        return <GraduationCap className="w-5 h-5" />
      default:
        return <ExternalLink className="w-5 h-5" />
    }
  }

  const getSocialLabel = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return 'LinkedIn'
      case 'twitter':
        return 'Twitter'
      case 'github':
        return 'GitHub'
      case 'orcid':
        return 'ORCID'
      case 'researchgate':
        return 'ResearchGate'
      default:
        return platform
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Navigation */}
      <div className="mb-6">
        <Link href="/members" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Retour aux membres
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Member Profile Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardContent className="p-6 text-center">
              {/* Avatar */}
              <div className="mb-6">
                <Avatar className="w-32 h-32 mx-auto ring-4 ring-gray-100">
                  <AvatarImage 
                    src={member.photo} 
                    alt={member.name}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-2xl font-semibold bg-blue-100 text-blue-700">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                {member.featured && (
                  <Badge variant="secondary" className="mt-3">
                    <Award className="w-4 h-4 mr-1" />
                    Membre vedette
                  </Badge>
                )}
              </div>

              {/* Basic Info */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{member.name}</h1>
                <p className="text-lg text-blue-600 font-medium mb-3">{member.title}</p>
                
                <div className="flex items-center justify-center text-gray-600 mb-4">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  <span className="text-sm">{member.affiliation}</span>
                </div>
                
                <p className="text-gray-700 text-sm leading-relaxed">
                  {member.bio}
                </p>
              </div>

              <Separator className="mb-6" />

              {/* Contact & Social Links */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                  Contact & Réseaux
                </h3>
                
                <div className="flex flex-col gap-2">
                  {member.email && (
                    <Link 
                      href={`mailto:${member.email}`}
                      className="inline-flex items-center justify-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span className="text-sm font-medium">Email</span>
                    </Link>
                  )}
                  
                  {member.socialLinks?.map((link, index) => (
                    <Link
                      key={index}
                      href={link.url as Route}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-3 p-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      {getSocialIcon(link.platform)}
                      <span className="text-sm font-medium">{getSocialLabel(link.platform)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Member Content */}
        <div className="lg:col-span-2">
          <div className="space-y-8">
            {/* Detailed Content */}
            {contentHtml && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Profil Détaillé
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MarkdownContent content={contentHtml} />
                </CardContent>
              </Card>
            )}

            {/* Related Members */}
            {relatedMembers.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Autres Membres Vedettes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {relatedMembers.map((relatedMember) => (
                      <Link
                        key={relatedMember.slug}
                        href={`/members/${relatedMember.slug}` as Route}
                        className="block p-4 border rounded-lg hover:shadow-md hover:border-blue-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all">
                            <AvatarImage 
                              src={relatedMember.photo} 
                              alt={relatedMember.name}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-sm font-semibold bg-blue-100 text-blue-700">
                              {getInitials(relatedMember.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                              {relatedMember.name}
                            </h4>
                            <p className="text-sm text-gray-600 truncate">
                              {relatedMember.title}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Link href="/members">
                      <Button variant="outline">
                        Voir tous les membres
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}