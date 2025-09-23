'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, AlertCircle, Send, Loader2 } from 'lucide-react'

interface FormData {
  name: string
  email: string
  subject: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const [submitMessage, setSubmitMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Le nom est obligatoire'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Le nom doit contenir au moins 2 caractères'
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'L\'email est obligatoire'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Veuillez entrer une adresse email valide'
      }
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Le sujet est obligatoire'
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Le sujet doit contenir au moins 5 caractères'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Le message est obligatoire'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Le message doit contenir au moins 10 caractères'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setStatus('submitting')
    setSubmitMessage('')

    try {
      // Simulate form submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // For now, we'll simulate a successful submission
      // In a real implementation, you would send the data to your backend
      console.log('Form submitted:', formData)
      
      setStatus('success')
      setSubmitMessage('Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.')
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      })
      
    } catch (error) {
      setStatus('error')
      setSubmitMessage('Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.')
      console.error('Form submission error:', error)
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <div>
      {/* Success/Error Messages */}
      {status === 'success' && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
              <p className="text-green-800">{submitMessage}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {status === 'error' && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
              <p className="text-red-800">{submitMessage}</p>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-slate-700 font-semibold text-base block">
            Nom complet *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full text-base px-4 py-3 min-h-[48px] rounded-lg border-2 transition-all duration-200 touch-manipulation ${errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'}`}
            placeholder="Votre nom complet"
            disabled={isSubmitting}
            autoComplete="name"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-600 flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-700 font-semibold text-base block">
            Adresse email *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full text-base px-4 py-3 min-h-[48px] rounded-lg border-2 transition-all duration-200 touch-manipulation ${errors.email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'}`}
            placeholder="votre.email@exemple.com"
            disabled={isSubmitting}
            autoComplete="email"
            inputMode="email"
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600 flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Subject Field */}
        <div className="space-y-2">
          <Label htmlFor="subject" className="text-slate-700 font-semibold text-base block">
            Sujet *
          </Label>
          <Input
            id="subject"
            type="text"
            value={formData.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            className={`w-full text-base px-4 py-3 min-h-[48px] rounded-lg border-2 transition-all duration-200 touch-manipulation ${errors.subject ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'}`}
            placeholder="Objet de votre message"
            disabled={isSubmitting}
            autoComplete="off"
          />
          {errors.subject && (
            <p className="mt-2 text-sm text-red-600 flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{errors.subject}</span>
            </p>
          )}
        </div>

        {/* Message Field */}
        <div className="space-y-2">
          <Label htmlFor="message" className="text-slate-700 font-semibold text-base block">
            Message *
          </Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className={`w-full text-base px-4 py-3 min-h-[140px] sm:min-h-[120px] rounded-lg border-2 transition-all duration-200 touch-manipulation resize-vertical ${errors.message ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-slate-300 focus:border-blue-500 focus:ring-blue-500'}`}
            placeholder="Décrivez votre demande, projet ou question..."
            disabled={isSubmitting}
            rows={6}
          />
          {errors.message && (
            <p className="mt-2 text-sm text-red-600 flex items-start">
              <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{errors.message}</span>
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4 sm:pt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 text-base rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation min-h-[52px] flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                <span>Envoi en cours...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-3" />
                <span>Envoyer le message</span>
              </>
            )}
          </Button>
        </div>

        {/* Required Fields Note */}
        <p className="text-sm text-slate-600 text-center pt-2">
          * Champs obligatoires
        </p>
      </form>
    </div>
  )
}