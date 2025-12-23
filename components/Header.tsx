'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Se estamos em uma página diferente da home, redirecionar para home primeiro
    if (pathname !== '/') {
      e.preventDefault()
      window.location.href = href
    } else {
      // Se estamos na home, fazer scroll suave
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-wine-950/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-12 h-12 md:w-14 md:h-14 flex items-center justify-center">
            {!logoError ? (
              <Image
                src="/logo.png"
                alt="Elbe Braids Logo"
                width={56}
                height={56}
                className="object-contain"
                priority
                onError={() => setLogoError(true)}
              />
            ) : (
              <div className="w-full h-full bg-wine-800/50 rounded-full flex items-center justify-center">
                <span className="text-wine-200 text-xs font-bold">EB</span>
              </div>
            )}
          </div>
          <span className="text-wine-50 font-bold text-lg md:text-xl">
            Elbe Braids
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="text-wine-50 hover:text-wine-200 transition-colors cursor-pointer"
          >
            Início
          </a>
          <a
            href="#sobre"
            onClick={(e) => handleNavClick(e, '#sobre')}
            className="text-wine-50 hover:text-wine-200 transition-colors cursor-pointer"
          >
            Sobre
          </a>
          <a
            href="#galeria"
            onClick={(e) => handleNavClick(e, '#galeria')}
            className="text-wine-50 hover:text-wine-200 transition-colors cursor-pointer"
          >
            Galeria
          </a>
          <a
            href="#catalogo"
            onClick={(e) => handleNavClick(e, '#catalogo')}
            className="text-wine-50 hover:text-wine-200 transition-colors cursor-pointer"
          >
            Catálogo
          </a>
          {pathname?.startsWith('/servico/') ? (
            <a
              href="#agendamento"
              onClick={(e) => {
                e.preventDefault()
                const element = document.querySelector('#agendamento')
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
              }}
              className="text-wine-50 hover:text-wine-200 transition-colors cursor-pointer"
            >
              Agendamento
            </a>
          ) : (
            <a
              href="#agendamento"
              onClick={(e) => handleNavClick(e, '#agendamento')}
              className="text-wine-50 hover:text-wine-200 transition-colors cursor-pointer"
            >
              Agendamento
            </a>
          )}
          <a
            href="https://www.instagram.com/elbebraids/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-wine-50 hover:text-wine-200 transition-colors"
          >
            Instagram
          </a>
        </nav>
      </div>
    </header>
  )
}

