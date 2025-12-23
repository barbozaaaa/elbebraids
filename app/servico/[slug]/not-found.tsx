import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      <section className="pt-32 pb-20 min-h-screen flex items-center justify-center bg-wine-950">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold mb-6 text-wine-50">404</h1>
          <p className="text-2xl text-wine-200 mb-8">
            Serviço não encontrado
          </p>
          <Link
            href="/#catalogo"
            className="inline-block bg-wine-600 hover:bg-wine-700 text-wine-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Voltar ao Catálogo
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}





