import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Cloud, Cpu, Wifi, Leaf, Brain } from 'lucide-react'
import { ResearchDomain } from '@/types'

interface ResearchDomainsProps {
  domains: ResearchDomain[]
}

const iconMap = {
  cloud: Cloud,
  cpu: Cpu,
  wifi: Wifi,
  leaf: Leaf,
  brain: Brain,
}

const colorMap = {
  blue: 'text-blue-600 bg-blue-50 border-blue-200',
  green: 'text-green-600 bg-green-50 border-green-200',
  purple: 'text-purple-600 bg-purple-50 border-purple-200',
  emerald: 'text-emerald-600 bg-emerald-50 border-emerald-200',
  orange: 'text-orange-600 bg-orange-50 border-orange-200',
}

export function ResearchDomains({ domains }: ResearchDomainsProps) {
  return (
    <section id="research-domains" className="py-12 sm:py-16 md:py-24 bg-white/70 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 mb-3 sm:mb-4">
            Nos Domaines de Recherche
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed px-2">
            Découvrez les domaines d&apos;expertise de C5IN et nos contributions à l&apos;innovation technologique en Afrique
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {domains.map((domain) => {
            const IconComponent = iconMap[domain.icon as keyof typeof iconMap]
            const colorClasses = colorMap[domain.color as keyof typeof colorMap]
            
            return (
              <Card 
                key={domain.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-slate-200 touch-manipulation"
              >
                <CardHeader className="text-center pb-3 sm:pb-4 px-4 sm:px-6 pt-6">
                  <div className={`w-14 sm:w-16 h-14 sm:h-16 mx-auto rounded-full flex items-center justify-center mb-3 sm:mb-4 ${colorClasses} group-hover:scale-110 transition-transform duration-300`}>
                    {IconComponent && <IconComponent className="w-7 sm:w-8 h-7 sm:h-8" />}
                  </div>
                  <CardTitle className="text-base sm:text-lg font-semibold text-slate-900 group-hover:text-blue-700 transition-colors duration-300 leading-tight">
                    {domain.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 px-4 sm:px-6 pb-6">
                  <CardDescription className="text-sm text-slate-600 leading-relaxed text-center">
                    {domain.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}