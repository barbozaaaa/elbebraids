'use client'

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-wine-50 animate-fade-in">
            Elbe Braids
          </h1>
          <p className="text-2xl md:text-4xl font-light mb-4 text-wine-200 animate-fade-in-delayed">
            Salão de Tranças
          </p>
          <p className="text-xl md:text-2xl mb-8 text-wine-300 italic animate-fade-in-delayed-2">
            Trança é Arte
          </p>
          <p className="text-lg md:text-xl mb-12 text-wine-200 max-w-2xl mx-auto animate-fade-in-delayed-3">
            Escolha um serviço no catálogo abaixo para ver detalhes e agendar sua consulta
          </p>
          
          {/* Scroll indicator */}
          <div className="flex flex-col items-center justify-center mt-8 animate-bounce-slow">
            <a
              href="#catalogo"
              className="text-wine-200 hover:text-wine-50 transition-colors text-lg font-medium mb-2 flex items-center gap-2 group"
            >
              <span>Explore nossos serviços</span>
              <svg
                className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

