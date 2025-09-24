'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, X, Tag } from 'lucide-react'

interface ContentFiltersProps {
  availableTags: string[]
  selectedTag?: string
  onTagFilter: (tag: string) => void
  onClearFilters: () => void
  hasActiveFilters: boolean
}

export function ContentFilters({
  availableTags,
  selectedTag,
  onTagFilter,
  onClearFilters,
  hasActiveFilters
}: ContentFiltersProps) {
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="space-y-6">
      {/* Filter Toggle */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="bg-white/80 border-slate-200 hover:bg-white hover:border-blue-300 rounded-xl font-medium shadow-lg"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filtres par thématique
          {hasActiveFilters && (
            <Badge className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              1
            </Badge>
          )}
        </Button>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="bg-white rounded-2xl shadow-lg border p-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtres
            </h3>
            {hasActiveFilters && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                Tout effacer
              </Button>
            )}
          </div>

          {/* Active Filters */}
          {hasActiveFilters && (
            <div className="mb-6">
              <div className="text-sm font-medium text-gray-700 mb-3">Filtres actifs :</div>
              <div className="flex flex-wrap gap-2">
                {selectedTag && (
                  <Badge variant="default" className="flex items-center gap-2">
                    <Tag className="h-3 w-3" />
                    {selectedTag}
                    <X 
                      className="h-3 w-3 cursor-pointer" 
                      onClick={() => onTagFilter(selectedTag)} 
                    />
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Tag Filters */}
          <div>
            <div className="text-sm font-medium text-gray-700 mb-3">Filtrer par sujet :</div>
            <div className="flex flex-wrap gap-2">
              {availableTags.map((tag) => (
                <Button
                  key={tag}
                  variant={selectedTag === tag ? "default" : "outline"}
                  size="sm"
                  onClick={() => onTagFilter(tag)}
                  className="transition-all hover:scale-105"
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}