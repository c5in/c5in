'use client'

import { useEffect } from 'react'
import { cn } from '@/lib/utils'

interface MarkdownContentProps {
  content: string
  className?: string
}

export function MarkdownContent({ content, className }: MarkdownContentProps) {
  useEffect(() => {
    // Add copy buttons to code blocks after component mounts
    const codeBlocks = document.querySelectorAll('.markdown-content pre')
    
    codeBlocks.forEach((block) => {
      // Skip if copy button already exists
      if (block.querySelector('.copy-button')) return
      
      const code = block.querySelector('code')
      if (!code) return
      
      // Create copy button container
      const copyContainer = document.createElement('div')
      copyContainer.className = 'copy-button-container'
      
      // Create copy button
      const copyButton = document.createElement('button')
      copyButton.className = 'copy-button'
      copyButton.setAttribute('aria-label', 'Copier le code')
      copyButton.innerHTML = `
        <svg class="copy-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="m4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        </svg>
        <svg class="check-icon hidden" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20,6 9,17 4,12"/>
        </svg>
      `
      copyButton.title = 'Copier le code'
      
      // Add click handler
      copyButton.addEventListener('click', async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        try {
          // Get the text content, removing any extra whitespace
          const codeText = code.textContent || ''
          await navigator.clipboard.writeText(codeText.trim())
          
          // Show success state
          const copyIcon = copyButton.querySelector('.copy-icon')
          const checkIcon = copyButton.querySelector('.check-icon')
          
          if (copyIcon && checkIcon) {
            copyIcon.classList.add('hidden')
            checkIcon.classList.remove('hidden')
            copyButton.classList.add('copied')
            copyButton.setAttribute('aria-label', 'Code copié !')
            
            // Reset after 2 seconds
            setTimeout(() => {
              copyIcon.classList.remove('hidden')
              checkIcon.classList.add('hidden')
              copyButton.classList.remove('copied')
              copyButton.setAttribute('aria-label', 'Copier le code')
            }, 2000)
          }
        } catch (err) {
          console.error('Failed to copy code:', err)
          
          // Fallback for older browsers
          try {
            const textArea = document.createElement('textarea')
            textArea.value = code.textContent || ''
            document.body.appendChild(textArea)
            textArea.select()
            document.execCommand('copy')
            document.body.removeChild(textArea)
            
            // Show success state even with fallback
            const copyIcon = copyButton.querySelector('.copy-icon')
            const checkIcon = copyButton.querySelector('.check-icon')
            
            if (copyIcon && checkIcon) {
              copyIcon.classList.add('hidden')
              checkIcon.classList.remove('hidden')
              copyButton.classList.add('copied')
              
              setTimeout(() => {
                copyIcon.classList.remove('hidden')
                checkIcon.classList.add('hidden')
                copyButton.classList.remove('copied')
              }, 2000)
            }
          } catch (fallbackErr) {
            console.error('Fallback copy also failed:', fallbackErr)
          }
        }
      })
      
      copyContainer.appendChild(copyButton)
      block.appendChild(copyContainer)
    })
    
    // Clean up event listeners when component unmounts or content changes
    return () => {
      const existingButtons = document.querySelectorAll('.markdown-content .copy-button')
      existingButtons.forEach(button => {
        button.removeEventListener('click', () => {})
      })
    }
  }, [content])

  return (
    <div 
      className={cn(
        "markdown-content prose prose-lg max-w-none",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}