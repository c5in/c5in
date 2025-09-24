import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

interface PageHeaderProps {
  badge?: {
    icon: LucideIcon
    text: string
  }
  title: string
  subtitle: string
  description: string
  stats?: Array<{
    value: string | number
    label: string
    color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'emerald'
  }>
  children?: ReactNode
}

const colorClasses = {
  blue: 'text-blue-600',
  green: 'text-green-600', 
  purple: 'text-purple-600',
  orange: 'text-orange-600',
  red: 'text-red-600',
  emerald: 'text-emerald-600'
}

export function PageHeader({ 
  badge, 
  title, 
  subtitle, 
  description, 
  stats, 
  children 
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden mb-16">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
      
      <div className="relative text-center py-16">
        {badge && (
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <badge.icon className="h-4 w-4" />
            {badge.text}
          </div>
        )}
        
        <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
          {title}
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 mb-6">
          {subtitle}
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-12">
          {description}
        </p>
        
        {stats && stats.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className={`grid gap-6 ${
              stats.length === 2 ? 'grid-cols-2' :
              stats.length === 3 ? 'grid-cols-2 md:grid-cols-3' :
              stats.length === 4 ? 'grid-cols-2 md:grid-cols-4' :
              'grid-cols-2 md:grid-cols-3 lg:grid-cols-5'
            }`}>
              {stats.map((stat, index) => (
                <div key={index} className="text-center p-4 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg">
                  <div className={`text-2xl font-bold ${colorClasses[stat.color]}`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {children && (
          <div className="mt-8">
            {children}
          </div>
        )}
      </div>
    </div>
  )
}