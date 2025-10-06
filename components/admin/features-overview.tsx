import { siteConfig } from '@/lib/config'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle, 
  XCircle, 
  Settings, 
  Eye,
  EyeOff,
  Globe,
  Monitor
} from 'lucide-react'

interface FeaturesOverviewProps {
  showDetails?: boolean
}

export function FeaturesOverview({ showDetails = false }: FeaturesOverviewProps) {
  const { features } = siteConfig

  const StatusIcon = ({ enabled }: { enabled: boolean }) => 
    enabled ? (
      <CheckCircle className="w-4 h-4 text-green-600" />
    ) : (
      <XCircle className="w-4 h-4 text-red-500" />
    )

  const StatusBadge = ({ enabled }: { enabled: boolean }) => (
    <Badge variant={enabled ? "default" : "secondary"} className="ml-2">
      {enabled ? "Activé" : "Désactivé"}
    </Badge>
  )

  if (!showDetails) {
    return (
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-center gap-2 mb-3">
          <Settings className="w-5 h-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">État des fonctionnalités</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <StatusIcon enabled={features.pages.blog} />
            <span>Blog</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon enabled={features.pages.events} />
            <span>Événements</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon enabled={features.pages.publications} />
            <span>Publications</span>
          </div>
          <div className="flex items-center gap-2">
            <StatusIcon enabled={features.pages.partners} />
            <span>Partenaires</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Pages Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Pages du site</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {Object.entries(features.pages).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <StatusIcon enabled={enabled} />
                  <span className="font-medium capitalize">{key}</span>
                </div>
                <StatusBadge enabled={enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Components Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Monitor className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold">Composants</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {Object.entries(features.components).map(([key, enabled]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <StatusIcon enabled={enabled} />
                  <span className="font-medium capitalize">{key}</span>
                </div>
                <StatusBadge enabled={enabled} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold">Actions rapides</h3>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Pour activer/désactiver une page : Modifier <code>lib/config.ts</code></p>
            <p>• Les pages désactivées retournent automatiquement une erreur 404</p>
            <p>• La navigation affiche seulement les pages activées</p>
            <p>• Redémarrez le serveur après modification</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/**
 * Composant pour afficher l'état d'une fonctionnalité spécifique
 */
interface FeatureStatusProps {
  feature: string
  enabled: boolean
  description?: string
}

export function FeatureStatus({ feature, enabled, description }: FeatureStatusProps) {
  return (
    <div className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg bg-white">
      {enabled ? (
        <Eye className="w-5 h-5 text-green-600" />
      ) : (
        <EyeOff className="w-5 h-5 text-gray-400" />
      )}
      
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium capitalize">{feature}</span>
          <StatusBadge enabled={enabled} />
        </div>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
    </div>
  )
}

const StatusBadge = ({ enabled }: { enabled: boolean }) => (
  <Badge variant={enabled ? "default" : "secondary"} className="ml-2">
    {enabled ? "Activé" : "Désactivé"}
  </Badge>
)