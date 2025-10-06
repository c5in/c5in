import { ReactNode } from 'react'
import { LucideIcon, ChevronRight, Home } from 'lucide-react'
import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: LucideIcon
}

interface PageHeaderProps {
  badge?: {
    icon: LucideIcon
    text: string
  }
  title: string
  subtitle?: string
  description: string
  breadcrumb?: BreadcrumbItem[]
  children?: ReactNode
}

export function PageHeader({ 
  badge, 
  title, 
  subtitle, 
  description, 
  breadcrumb,
  children 
}: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden mb-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-transparent" />
      
      <div className="relative py-12">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="flex items-center space-x-2 text-sm mb-8 px-4 md:px-8">
            <Link 
              href="/" 
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="h-4 w-4 mr-1" />
              Accueil
            </Link>
            {breadcrumb.map((item, index) => (
              <div key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                {item.href ? (
                  <a 
                    href={item.href}
                    className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                    {item.label}
                  </a>
                ) : (
                  <span className="flex items-center text-gray-900 font-medium">
                    {item.icon && <item.icon className="h-4 w-4 mr-1" />}
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </nav>
        )}

        {/* Header content */}
        <div className="text-center px-4 md:px-8">
          {badge && (
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <badge.icon className="h-4 w-4" />
              {badge.text}
            </div>
          )}
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 mb-6">
              {subtitle}
            </h2>
          )}
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-light mb-8">
            {description}
          </p>
          
          {children && (
            <div className="mt-8">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}