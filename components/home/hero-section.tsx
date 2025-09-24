'use client'

import { Button } from '@/components/ui/button'
import {  Zap, ArrowRight, Play, Sparkles, Code, Brain, Globe, Rocket } from 'lucide-react'

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

  const techIcons = [Code, Brain, Globe, Rocket]

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Arrière-plan complexe et dynamique */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient de base plus riche */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"></div>
        
        {/* Couches de dégradés camerounais */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-green-600/20 via-green-500/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-yellow-500/20 via-yellow-400/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-red-600/20 via-red-500/10 to-transparent"></div>
        </div>
        
        {/* Motifs géométriques complexes */}
        <div className="absolute inset-0">
          {/* Cercles animés */}
          <div className="absolute top-20 right-32 w-96 h-96 bg-gradient-to-r from-blue-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-80 h-80 bg-gradient-to-r from-green-400/15 to-emerald-400/15 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-yellow-400/15 to-orange-400/15 rounded-full blur-3xl animate-pulse transform -translate-x-1/2 -translate-y-1/2" style={{animationDelay: '1s'}}></div>
          
          {/* Formes géométriques */}
          <div className="absolute top-32 left-1/4 w-20 h-20 border border-green-400/30 rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-40 right-1/4 w-16 h-16 border border-yellow-400/30 rotate-12 animate-pulse"></div>
          <div className="absolute top-1/2 right-32 w-12 h-12 bg-red-400/20 transform rotate-45 animate-bounce" style={{animationDelay: '0.5s'}}></div>
        </div>
        
        {/* Grille technologique */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        {/* Particules flottantes avec positions fixes */}
        {[
          { left: 15, top: 20, delay: 0, duration: 4 },
          { left: 85, top: 15, delay: 1, duration: 5 },
          { left: 25, top: 70, delay: 2, duration: 3.5 },
          { left: 75, top: 80, delay: 0.5, duration: 4.5 },
          { left: 45, top: 30, delay: 3, duration: 4 },
          { left: 10, top: 50, delay: 1.5, duration: 3.8 },
          { left: 90, top: 60, delay: 2.5, duration: 5.2 },
          { left: 35, top: 85, delay: 3.5, duration: 3.2 },
          { left: 65, top: 10, delay: 4, duration: 4.8 },
          { left: 20, top: 40, delay: 0.8, duration: 3.6 },
          { left: 80, top: 25, delay: 2.2, duration: 4.2 },
          { left: 50, top: 75, delay: 1.8, duration: 5.5 },
          { left: 30, top: 55, delay: 3.2, duration: 3.9 },
          { left: 70, top: 45, delay: 4.5, duration: 4.3 },
          { left: 55, top: 90, delay: 2.8, duration: 3.7 }
        ].map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative container mx-auto px-6 lg:px-12 xl:px-16 pt-20 pb-16">
        <div className="grid lg:grid-cols-12 gap-8 items-center min-h-[85vh]">
          
          {/* Colonne principale - Contenu */}
          <div className="lg:col-span-7 text-white">
            
            {/* Badge premium */}
            <div className="inline-flex items-center px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full text-sm font-semibold mb-8 shadow-xl hover:bg-white/15 transition-all duration-300 group">
              <Sparkles className="w-4 h-4 mr-2 text-yellow-400 group-hover:rotate-12 transition-transform duration-300" />
              Innovation • Recherche • Excellence
              <div className="ml-3 flex space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{animationDelay: '0.3s'}}></div>
                <div className="w-1 h-1 bg-yellow-400 rounded-full animate-pulse" style={{animationDelay: '0.6s'}}></div>
              </div>
            </div>

            {/* Titre principal */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight sm:leading-[0.9]">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-200 bg-clip-text text-transparent">
                {title}
              </span>
              <br />
              <span className="relative text-white">
                Cameroun
                {/* Effet de soulignement dynamique */}
                <div className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-green-400 via-red-400 to-yellow-400 rounded-full transform scale-x-0 animate-scale-x"></div>
              </span>
            </h1>
            
            {/* Sous-titre */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-blue-100 mb-4 sm:mb-6 leading-relaxed max-w-2xl">
              {subtitle}
            </h2>
            
            {/* Description avec style */}
            <div className="relative">
              <div className="absolute -left-2 sm:-left-4 top-0 w-0.5 sm:w-1 h-full bg-gradient-to-b from-blue-400 to-transparent rounded-full"></div>
              <p className="text-base sm:text-lg text-slate-300 mb-6 sm:mb-8 leading-relaxed max-w-2xl pl-3 sm:pl-4">
                {description}
              </p>
            </div>

            {/* Points clés avec design moderne */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-8 sm:mb-10 max-w-3xl">
              {[
                'Leader Cloud-Edge-IoT Afrique Centrale',
                'Partenariats universitaires internationaux',
                'Solutions transformation numérique',
                'Formation chercheurs nouvelle génération'
              ].map((text, index) => (
                <div key={index} className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-3 sm:py-3 border border-white/10 hover:bg-white/10 transition-all duration-300 group touch-manipulation">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full group-hover:scale-125 transition-transform duration-300 flex-shrink-0"></div>
                  <span className="text-sm sm:text-sm font-medium text-slate-200 leading-tight">{text}</span>
                </div>
              ))}
            </div>
            
            {/* Boutons CTA avec effets avancés */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
              {ctaButton && (
                <Button 
                  size="lg" 
                  className="relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 group border-0 overflow-hidden touch-manipulation min-h-[48px] w-full sm:w-auto"
                  asChild
                >
                  <a href={ctaButton.href}>
                    {/* Effet de brillance au hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                    <span className="relative z-10 flex items-center justify-center">
                      {ctaButton.text}
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </a>
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white/30 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:border-white/50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold rounded-xl transition-all duration-300 group touch-manipulation min-h-[48px] w-full sm:w-auto"
                asChild
              >
                <a href="#research-domains" className="flex items-center justify-center">
                  <Play className="w-4 sm:w-5 h-4 sm:h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Découvrir nos projets
                </a>
              </Button>
            </div>
          </div>

          {/* Colonne droite - Éléments visuels */}
          <div className="lg:col-span-5 relative">
            
            {/* Hub technologique central */}
            <div className="relative w-full max-w-md mx-auto">
              {/* Cercle principal */}
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full backdrop-blur-sm border border-white/10 shadow-2xl"></div>
                
                {/* Centre avec logo/icône */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center">
                  <Zap className="w-12 h-12 text-yellow-400" />
                </div>
                
                {/* Icônes technologiques orbitales */}
                {techIcons.map((Icon, index) => {
                  const angle = (index * 90) - 45;
                  const radius = 120;
                  const x = Math.cos(angle * Math.PI / 180) * radius;
                  const y = Math.sin(angle * Math.PI / 180) * radius;
                  
                  return (
                    <div
                      key={index}
                      className="absolute w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-full backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition-all duration-300 cursor-pointer group"
                      style={{
                        left: `calc(50% + ${x}px - 32px)`,
                        top: `calc(50% + ${y}px - 32px)`,
                        animation: `orbit 20s linear infinite`,
                        animationDelay: `${index * -5}s`
                      }}
                    >
                      <Icon className="w-8 h-8 text-blue-300 group-hover:text-white transition-colors duration-300" />
                    </div>
                  );
                })}
                
                {/* Anneaux orbitaux */}
                <div className="absolute inset-8 border border-white/5 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-16 border border-white/5 rounded-full animate-spin-slower"></div>
              </div>
            </div>

            {/* Cartes flottantes */}
            <div className="absolute top-20 -right-8 w-48 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-sm">Recherche Active</span>
              </div>
              <p className="text-slate-300 text-xs">15+ projets en cours de développement</p>
            </div>

            <div className="absolute bottom-32 -left-8 w-52 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 shadow-xl hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                <span className="text-white font-semibold text-sm">Innovation Hub</span>
              </div>
              <p className="text-slate-300 text-xs">Centre d&apos;excellence technologique</p>
            </div>
          </div>
        </div>

        {/* Indicateur de scroll moderne */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <button
            onClick={scrollToNext}
            className="flex flex-col items-center text-white/60 hover:text-white transition-all duration-300 group"
            aria-label="Scroll to next section"
          >
            <span className="text-xs font-medium mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              Découvrir nos domaines
            </span>
            <div className="relative">
              <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-end justify-center pb-1 group-hover:border-white/60 transition-colors duration-300">
                <div className="w-0.5 h-2 bg-white/60 rounded-full animate-bounce group-hover:bg-white"></div>
              </div>
            </div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        @keyframes orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes scale-x {
          0% { transform: scaleX(0); }
          100% { transform: scaleX(1); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        .animate-spin-slower {
          animation: spin 25s linear infinite;
        }
        .animate-scale-x {
          animation: scale-x 2s ease-out 0.5s forwards;
        }
      `}</style>
    </section>
  )
}