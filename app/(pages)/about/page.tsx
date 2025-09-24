import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { researchDomains } from '@/lib/config'
import { generateSEOMetadata } from '@/components/seo'
import { Cloud, Cpu, Wifi, Leaf, Brain, Users, Target, Lightbulb, Calendar } from 'lucide-react'

export const metadata: Metadata = generateSEOMetadata({
  title: 'À propos',
  description: 'Découvrez C5IN, le réseau d\'innovation camerounais spécialisé dans les technologies Cloud, Edge Computing et IoT. Notre mission, vision et domaines d\'activité.',
  url: '/about',
  tags: ['à propos', 'mission', 'vision', 'innovation', 'cameroun', 'recherche'],
})

const iconMap = {
  cloud: Cloud,
  cpu: Cpu,
  wifi: Wifi,
  leaf: Leaf,
  brain: Brain,
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Page Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
          À propos de C5IN
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          Le Cameroon Cloud-Edge-IoT Innovation Network est le premier réseau de recherche 
          et d&apos;innovation du Cameroun dédié aux technologies émergentes.
        </p>
      </div>

      {/* Qui Sommes-Nous Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Users className="h-8 w-8 text-blue-600 mr-4" />
          <h2 className="text-3xl font-bold text-slate-900">Qui Sommes-Nous</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              C5IN est un réseau collaboratif qui rassemble des chercheurs, des ingénieurs, 
              des étudiants et des professionnels de l&apos;industrie autour des technologies 
              Cloud, Edge Computing et IoT. Fondé en 2024, notre réseau vise à accélérer 
              l&apos;innovation technologique au Cameroun et en Afrique centrale.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              Nous sommes basés au Campus Ngoa-Ekellé de l&apos;Université de Yaoundé I et 
              collaborons avec des institutions académiques, des entreprises technologiques 
              et des organisations internationales pour développer des solutions adaptées 
              aux défis locaux.
            </p>
          </div>
          <Card className="bg-gradient-to-br from-blue-50 to-slate-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Nos Valeurs</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Innovation collaborative et ouverte</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Excellence académique et scientifique</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Impact social et économique</span>
                </li>
                <li className="flex items-start">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span>Développement durable</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Notre Vision Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Target className="h-8 w-8 text-blue-600 mr-4" />
          <h2 className="text-3xl font-bold text-slate-900">Notre Vision</h2>
        </div>
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-12 text-center">
            <p className="text-2xl font-medium leading-relaxed">
              &quot;Faire du Cameroun un hub d&apos;innovation technologique en Afrique centrale, 
              où les technologies Cloud, Edge et IoT transforment positivement la société 
              et l&apos;économie.&quot;
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Notre Mission Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Lightbulb className="h-8 w-8 text-blue-600 mr-4" />
          <h2 className="text-3xl font-bold text-slate-900">Notre Mission</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-l-4 border-l-blue-600">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Recherche & Innovation</h3>
              <p className="text-slate-700">
                Conduire des recherches de pointe dans les domaines du Cloud, Edge Computing 
                et IoT, en développant des solutions adaptées aux contextes africains.
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-600">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Formation & Éducation</h3>
              <p className="text-slate-700">
                Former la prochaine génération de chercheurs, ingénieurs et entrepreneurs 
                dans les technologies émergentes à travers des programmes innovants.
              </p>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-600">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">Collaboration & Partenariat</h3>
              <p className="text-slate-700">
                Créer des synergies entre le monde académique, l&apos;industrie et les institutions 
                pour accélérer le transfert de technologies.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Nos Domaines d'Activité Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Brain className="h-8 w-8 text-blue-600 mr-4" />
          <h2 className="text-3xl font-bold text-slate-900">Nos Domaines d&apos;Activité</h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchDomains.map((domain) => {
            const IconComponent = iconMap[domain.icon as keyof typeof iconMap]
            return (
              <Card key={domain.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className={`p-3 rounded-lg bg-${domain.color}-100 mr-4`}>
                      <IconComponent className={`h-6 w-6 text-${domain.color}-600`} />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">{domain.title}</h3>
                  </div>
                  <p className="text-slate-700">{domain.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Notre Parcours Section */}
      <section className="mb-16">
        <div className="flex items-center mb-8">
          <Calendar className="h-8 w-8 text-blue-600 mr-4" />
          <h2 className="text-3xl font-bold text-slate-900">Notre Parcours</h2>
        </div>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px h-full w-0.5 bg-blue-200"></div>
          
          <div className="space-y-8">
            {/* Timeline Item 1 */}
            <div className="relative flex items-center md:justify-center">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow"></div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-blue-600 mb-2">2024 - Janvier</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Création du Réseau</h3>
                    <p className="text-slate-700">
                      Lancement officiel de C5IN avec les premiers membres fondateurs 
                      de l&apos;Université de Yaoundé I et de l&apos;ENSP.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative flex items-center md:justify-center">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow"></div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8 md:ml-auto">
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-green-600 mb-2">2024 - Mars</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Premier Workshop</h3>
                    <p className="text-slate-700">
                      Organisation du premier workshop sur le Cloud Computing 
                      avec plus de 100 participants de toute l&apos;Afrique centrale.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative flex items-center md:justify-center">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow"></div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                <Card className="bg-purple-50 border-purple-200">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-purple-600 mb-2">2024 - Juin</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Partenariats Internationaux</h3>
                    <p className="text-slate-700">
                      Signature d&apos;accords de collaboration avec des universités 
                      européennes et des entreprises technologiques internationales.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Timeline Item 4 */}
            <div className="relative flex items-center md:justify-center">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-blue-600 rounded-full border-4 border-white shadow"></div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:pl-8 md:ml-auto">
                <Card className="bg-orange-50 border-orange-200">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-orange-600 mb-2">2024 - Septembre</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Premiers Projets de Recherche</h3>
                    <p className="text-slate-700">
                      Lancement de trois projets de recherche majeurs en Edge Computing, 
                      IoT agricole et Green Computing.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Timeline Item 5 - Future */}
            <div className="relative flex items-center md:justify-center">
              <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-slate-400 rounded-full border-4 border-white shadow"></div>
              <div className="ml-12 md:ml-0 md:w-1/2 md:pr-8">
                <Card className="bg-slate-50 border-slate-200">
                  <CardContent className="p-6">
                    <div className="text-sm font-semibold text-slate-600 mb-2">2025 - Objectifs</div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">Expansion Régionale</h3>
                    <p className="text-slate-700">
                      Extension du réseau à d&apos;autres pays d&apos;Afrique centrale et 
                      lancement du programme de formation certifiante.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="p-12">
            <h2 className="text-3xl font-bold mb-4">Rejoignez-nous</h2>
            <p className="text-xl mb-8 opacity-90">
              Participez à la transformation numérique de l&apos;Afrique centrale
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                Nous Contacter
              </a>
              <Link
                href="/members"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Découvrir nos Membres
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}