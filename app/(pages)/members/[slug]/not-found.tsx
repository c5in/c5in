import Link from 'next/link'
import { Users, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function MemberNotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <Users className="w-16 h-16 text-gray-400 mx-auto" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Membre non trouvé
        </h1>
        
        <p className="text-gray-600 mb-8">
          Le membre que vous recherchez n&apos;existe pas ou a été supprimé.
        </p>
        
        <div className="space-y-4">
          <Link href="/members">
            <Button className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux membres
            </Button>
          </Link>
          
          <Link href="/">
            <Button variant="outline" className="w-full">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}