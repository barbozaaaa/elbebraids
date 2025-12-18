import { notFound } from 'next/navigation'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AgendamentoFormServico from '@/components/AgendamentoFormServico'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import AnimatedBackground from '@/components/AnimatedBackground'
import { getServicoPorSlug } from '@/lib/servicos'
import Link from 'next/link'

export default function ServicoPage({ params }: { params: { slug: string } }) {
  const servico = getServicoPorSlug(params.slug)

  if (!servico) {
    notFound()
  }

  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      
      {/* Hero da página do serviço */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              href="/#catalogo"
              className="inline-block text-wine-300 hover:text-wine-50 mb-6 transition-colors"
            >
              ← Voltar ao Catálogo
            </Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-wine-50">
              {servico.nome}
            </h1>
            <div className="inline-block bg-wine-800/50 border border-wine-700 rounded-lg px-6 py-3 mb-8">
              <p className="text-wine-200 text-sm mb-1">Categoria</p>
              <p className="text-wine-50 text-xl font-semibold">
                {servico.categoria} - {servico.subcategoria}
              </p>
            </div>
            <div className="inline-block bg-wine-600/30 border border-wine-600 rounded-lg px-8 py-4">
              <p className="text-wine-200 text-sm mb-1">Preço</p>
              <p className="text-wine-50 text-3xl font-bold">{servico.preco}</p>
            </div>
          </div>
        </div>
      </section>

      <AgendamentoFormServico servico={servico} />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}

