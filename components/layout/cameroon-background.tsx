interface CameroonBackgroundProps {
  variant?: 'default' | 'subtle' | 'minimal'
  className?: string
}

export function CameroonBackground({ variant = 'default', className = '' }: CameroonBackgroundProps) {
  const getOpacity = () => {
    switch (variant) {
      case 'subtle': return 'opacity-5'
      case 'minimal': return 'opacity-3'
      default: return 'opacity-8'
    }
  }

  const getBlurIntensity = () => {
    switch (variant) {
      case 'subtle': return 'blur-3xl'
      case 'minimal': return 'blur-3xl'
      default: return 'blur-2xl'
    }
  }

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Flag-inspired geometric shapes */}
      <div className={`absolute top-0 left-0 w-1/3 h-full bg-gradient-to-br from-green-100 to-green-50 ${getOpacity()}`}></div>
      <div className={`absolute top-0 left-1/3 w-1/3 h-full bg-gradient-to-br from-red-100 to-red-50 ${getOpacity()}`}></div>
      <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-br from-yellow-100 to-yellow-50 ${getOpacity()}`}></div>
      
      {/* Subtle flag pattern overlay */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-0 left-0 w-1/3 h-full bg-green-500"></div>
        <div className="absolute top-0 left-1/3 w-1/3 h-full bg-red-500"></div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-yellow-500"></div>
      </div>
      
      {/* Central star element - only for default variant */}
      {variant === 'default' && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 opacity-8">
              <svg viewBox="0 0 24 24" className="w-full h-full text-yellow-600 fill-current">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
          </div>
        </div>
      )}
      
      {/* Decorative circles with flag colors */}
      <div className={`absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-100 to-yellow-100 rounded-full opacity-10 ${getBlurIntensity()}`}></div>
      <div className={`absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-100 to-green-100 rounded-full opacity-10 ${getBlurIntensity()}`}></div>
      <div className={`absolute top-20 right-20 w-60 h-60 bg-gradient-to-br from-yellow-100 to-red-100 rounded-full opacity-8 ${getBlurIntensity()}`}></div>
      
      {/* Subtle geometric patterns - only for default and subtle variants */}
      {variant !== 'minimal' && (
        <>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-green-400 rounded-full opacity-15 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-6 h-6 bg-red-400 rounded-full opacity-15 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-yellow-400 rounded-full opacity-15 animate-pulse" style={{animationDelay: '2s'}}></div>
        </>
      )}
    </div>
  )
}