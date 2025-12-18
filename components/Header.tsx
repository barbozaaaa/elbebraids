'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-wine-950/95 backdrop-blur-sm shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
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
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#home"
            className="text-wine-50 hover:text-wine-200 transition-colors"
          >
            Início
          </a>
          <a
            href="#sobre"
            className="text-wine-50 hover:text-wine-200 transition-colors"
          >
            Sobre
          </a>
          <a
            href="#galeria"
            className="text-wine-50 hover:text-wine-200 transition-colors"
          >
            Galeria
          </a>
          <a
            href="#catalogo"
            className="text-wine-50 hover:text-wine-200 transition-colors"
          >
            Catálogo
          </a>
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

