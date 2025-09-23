import { ReactNode } from 'react'
import { CameroonBackground } from './cameroon-background'

interface MainLayoutProps {
  children: ReactNode
  backgroundVariant?: 'default' | 'subtle' | 'minimal'
  className?: string
}

export function MainLayout({ children, backgroundVariant = 'subtle', className = '' }: MainLayoutProps) {
  return (
    <div className={`relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-slate-50 ${className}`}>
      <CameroonBackground variant={backgroundVariant} />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}