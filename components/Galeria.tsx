'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Imagem {
  id: number
  src: string
  alt: string
  categoria?: string
}

// Para adicionar imagens:
// 1. Coloque as imagens na pasta /public/galeria/
// 2. Adicione os objetos abaixo com as informações das imagens
// 3. Exemplo: { id: 1, src: '/galeria/tranca1.jpg', alt: 'Box Braids', categoria: 'Box Braids' }

const imagens: Imagem[] = [
  // Exemplos (descomente e ajuste quando tiver as imagens):
  // { id: 1, src: '/galeria/box-braids-1.jpg', alt: 'Box Braids - Cliente 1', categoria: 'Box Braids' },
  // { id: 2, src: '/galeria/fulani-1.jpg', alt: 'Fulani - Cliente 1', categoria: 'Fulani' },
  // { id: 3, src: '/galeria/ghana-1.jpg', alt: 'Ghana Braids - Cliente 1', categoria: 'Ghana' },
  // { id: 4, src: '/galeria/simetria-1.jpg', alt: 'Simetria Masculina', categoria: 'Simetria' },
  // { id: 5, src: '/galeria/boho-1.jpg', alt: 'Boho Braids', categoria: 'Boho' },
]

export default function Galeria() {
  const [imagemSelecionada, setImagemSelecionada] = useState<Imagem | null>(null)
  const [categoriaFiltro, setCategoriaFiltro] = useState<string>('todos')

  const categorias = ['todos', 'Box Braids', 'Fulani', 'Ghana', 'Simetria', 'Boho', 'Outros']
  
  const imagensFiltradas = categoriaFiltro === 'todos' 
    ? imagens 
    : imagens.filter(img => img.categoria === categoriaFiltro)

  // Se não houver imagens, mostra um placeholder informativo
  if (imagens.length === 0) {
    return (
      <section id="galeria" className="py-20 relative">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-wine-50">
            Nossos Trabalhos
          </h2>
          <p className="text-center text-wine-200 mb-12">
            Galeria de trabalhos realizados
          </p>
          
          <div className="max-w-2xl mx-auto bg-wine-800/30 rounded-lg p-12 border border-wine-700/50 text-center">
            <div className="text-6xl mb-4">📸</div>
            <p className="text-wine-200 text-lg mb-4">
              Adicione suas fotos na pasta <code className="bg-wine-900/50 px-2 py-1 rounded">/public/galeria</code>
            </p>
            <p className="text-wine-300 text-sm">
              As imagens aparecerão aqui automaticamente quando forem adicionadas.
            </p>
            <p className="text-wine-400 text-sm mt-4 italic">
              Ou siga nosso Instagram para ver todos os trabalhos:{' '}
              <a
                href="https://www.instagram.com/elbebraids/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-wine-200 hover:text-wine-50 underline"
              >
                @elbebraids
              </a>
            </p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="galeria" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-wine-50">
          Nossos Trabalhos
        </h2>
        <p className="text-center text-wine-200 mb-12">
          Confira alguns de nossos trabalhos realizados
        </p>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaFiltro(categoria)}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                categoriaFiltro === categoria
                  ? 'bg-wine-600 text-wine-50'
                  : 'bg-wine-800/50 text-wine-200 hover:bg-wine-700/50'
              }`}
            >
              {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
            </button>
          ))}
        </div>

        {/* Grid de Imagens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {imagensFiltradas.map((imagem) => (
            <div
              key={imagem.id}
              onClick={() => setImagemSelecionada(imagem)}
              className="relative aspect-square bg-wine-800/30 rounded-lg overflow-hidden cursor-pointer group border border-wine-700/30 hover:border-wine-600 transition-all duration-300"
            >
              <Image
                src={imagem.src}
                alt={imagem.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wine-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-wine-50 font-medium">{imagem.alt}</p>
                  {imagem.categoria && (
                    <p className="text-wine-300 text-sm">{imagem.categoria}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {imagensFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-wine-300">Nenhuma imagem encontrada nesta categoria.</p>
          </div>
        )}
      </div>

      {/* Modal de Imagem Ampliada */}
      {imagemSelecionada && (
        <div
          className="fixed inset-0 bg-wine-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setImagemSelecionada(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full">
            <button
              onClick={() => setImagemSelecionada(null)}
              className="absolute top-4 right-4 text-wine-50 hover:text-wine-200 text-4xl font-bold z-10 bg-wine-900/80 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ×
            </button>
            <div className="relative aspect-auto bg-wine-900 rounded-lg overflow-hidden">
              <Image
                src={imagemSelecionada.src}
                alt={imagemSelecionada.alt}
                width={1200}
                height={1200}
                className="object-contain w-full h-full"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-wine-50 text-xl font-semibold">{imagemSelecionada.alt}</p>
              {imagemSelecionada.categoria && (
                <p className="text-wine-300">{imagemSelecionada.categoria}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

