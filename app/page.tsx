import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Galeria from '@/components/Galeria'
import SobreMim from '@/components/SobreMim'
import Catalogo from '@/components/Catalogo'
import Footer from '@/components/Footer'
import Admin from '@/components/Admin'
import WhatsAppFloat from '@/components/WhatsAppFloat'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <AnimatedBackground />
      <Header />
      <Hero />
      <Galeria />
      <Catalogo />
      <SobreMim />
      <Footer />
      <Admin />
      <WhatsAppFloat />
    </main>
  )
}

