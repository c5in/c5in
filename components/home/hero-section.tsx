'use client'

import { Button } from '@/components/ui/button'
import {  ArrowRight, Play, Sparkles } from 'lucide-react'

interface HeroProps {
  title: string
  subtitle: string
  description: string
  ctaButton?: {
    text: string
    href: string
  }
}

export function HeroSection({ title, subtitle, description, ctaButton }: HeroProps) {
  const scrollToNext = () => {
    const nextSection = document.getElementById('research-domains')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const highlights = [
    'Leader en recherche Cloud-Edge-IoT en Afrique Centrale',
    'Partenariats avec les universités internationales',
    'Solutions innovantes pour la transformation numérique',
    'Formation de la prochaine génération de chercheurs'
  ]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Modern Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Subtle Cameroon-inspired gradient overlay */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-green-500/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-yellow-500/5 to-transparent"></div>
          <div className="absolute bottom-0 left-1/2 w-1/2 h-1/2 bg-gradient-to-t from-red-500/3 to-transparent transform -translate-x-1/2"></div>
        </div>
        
        {/* Modern geometric elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-green-400/8 to-blue-400/8 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400/40 rounded-full animate-float"></div>
        <div className="absolute top-1/2 right-1/3 w-3 h-3 bg-green-400/40 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-yellow-400/40 rounded-full animate-float" style={{animationDelay: '3s'}}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.3) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          
          {/* Modern Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm border border-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
            <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
            Innovation • Recherche • Excellence
            <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          </div>

          {/* Hero Title - Plus grand et plus impactant */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-[0.9]">
            <span className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
              {title}
            </span>
            <br />
            <span className="text-slate-800 relative">
              Cameroun
              {/* Subtle underline effect */}
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-green-400 via-red-400 to-yellow-400 rounded-full opacity-60"></div>
            </span>
          </h1>
          
          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-medium text-slate-600 mb-8 leading-relaxed max-w-4xl">
            {subtitle}
          </h2>
          
          {/* Description */}
          <p className="text-lg lg:text-xl text-slate-600 mb-12 leading-relaxed max-w-3xl">
            {description}
          </p>

          {/* Modern Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-4xl w-full">
            {highlights.map((highlight, index) => (
              <div key={index} className="flex items-center justify-center md:justify-start text-slate-700 bg-white/60 backdrop-blur-sm rounded-xl px-6 py-4 shadow-sm border border-slate-100/50 hover:shadow-md transition-all duration-300 group">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mr-4 flex-shrink-0 group-hover:scale-125 transition-transform duration-300"></div>
                <span className="text-sm lg:text-base font-medium">{highlight}</span>
              </div>
            ))}
          </div>
          
          {/* CTA Buttons - Design moderne */}
          <div className="flex flex-col sm:flex-row gap-6 mb-16">
            {ctaButton && (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-6 text-lg font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group border-0 relative overflow-hidden"
                asChild
              >
                <a href={ctaButton.href}>
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center">
                    {ctaButton.text}
                    <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </a>
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-slate-200 bg-white/80 backdrop-blur-sm text-slate-700 hover:bg-white hover:border-slate-300 px-10 py-6 text-lg font-semibold rounded-2xl transition-all duration-300 group shadow-lg hover:shadow-xl"
              asChild
            >
              <a href="#research-domains">
                <Play className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform duration-300" />
                Découvrir nos projets
              </a>
            </Button>
          </div>

          {/* Scroll indicator - Plus élégant */}
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center text-slate-400 hover:text-slate-600 transition-all duration-300 group"
            aria-label="Scroll to next section"
          >
            <span className="text-sm font-medium mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              Découvrir nos domaines
            </span>
            <div className="relative">
              <div className="w-8 h-12 border-2 border-slate-300 rounded-full flex items-end justify-center pb-2 group-hover:border-slate-400 transition-colors duration-300">
                <div className="w-1 h-3 bg-slate-400 rounded-full animate-bounce group-hover:bg-slate-500"></div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}