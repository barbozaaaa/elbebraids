'use client'

export default function SobreMim() {
  return (
    <section id="sobre" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Título Principal */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4 text-wine-50">
              Sobre Mim
            </h2>
            <div className="w-24 h-1 bg-wine-600 mx-auto"></div>
          </div>

          {/* Apresentação Principal */}
          <div className="text-center mb-16">
            <h3 className="text-4xl md:text-5xl font-bold text-wine-50 mb-3">
              Isabelly Martins
            </h3>
            <p className="text-wine-300 text-xl md:text-2xl">15 anos • Artista de Tranças</p>
          </div>

          {/* Conteúdo Principal */}
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Introdução */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-wine-600 via-wine-500 to-wine-600 rounded-full"></div>
              <div className="pl-8 md:pl-12">
                <p className="text-wine-100 text-xl md:text-2xl leading-relaxed mb-6">
                  <span className="text-wine-50 font-bold text-2xl md:text-3xl">Oii</span> Eu sou a <span className="text-wine-50 font-bold">Isabelly Martins</span> e tenho 15 anos.
                </p>
              </div>
            </div>

            {/* Primeira experiência */}
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-wine-700 via-wine-600 to-wine-700 rounded-full"></div>
              <div className="pl-8 md:pl-12">
                <p className="text-wine-200 text-lg md:text-xl leading-relaxed mb-6">
                  Desde pequena, sempre fui apaixonada por cabelos e pela arte de criar penteados. Mas foi nas tranças, nos box braids e nos dreadlocks que eu encontrei minha verdadeira paixão.
                </p>
                <p className="text-wine-200 text-lg md:text-xl leading-relaxed">
                  O que começou como um hobby se transformou em uma profissão que me permite expressar minha criatividade todos os dias. Cada cliente que chega ao meu salão traz consigo uma personalidade única, e minha missão é traduzir isso em um visual que eleve sua autoestima e celebre sua individualidade.
                </p>
              </div>
            </div>

            {/* Frase de destaque */}
            <div className="relative my-12">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-wine-500 via-wine-400 to-wine-500 rounded-full"></div>
              <div className="pl-8 md:pl-12">
                <p className="text-wine-50 italic text-2xl md:text-3xl font-medium leading-relaxed border-l-4 border-wine-600 pl-6 py-4">
                  Para mim, trançar não é apenas entrelaçar mechas; é transformar a autoestima e recontar histórias.
                </p>
              </div>
            </div>

          </div>

          {/* Elemento decorativo inferior */}
          <div className="flex items-center justify-center mt-20">
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-wine-600 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-wine-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-wine-600 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

