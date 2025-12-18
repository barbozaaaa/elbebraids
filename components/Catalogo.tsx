'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { todosServicos, gerarSlug } from '@/lib/servicos'

export default function Catalogo() {
  // Organizar serviços por categoria e subcategoria
  const servicosOrganizados = useMemo(() => ({
    masculina: {
      basica: todosServicos.filter(s => s.categoria === 'Masculina' && s.subcategoria === 'Básica'),
      simetria: todosServicos.filter(s => s.categoria === 'Masculina' && s.subcategoria === 'Simetria'),
      outras: todosServicos.filter(s => s.categoria === 'Masculina' && (s.subcategoria === 'Outros' || s.subcategoria === 'Fulani')),
    },
    feminina: {
      boxBraids: todosServicos.filter(s => s.categoria === 'Feminina' && s.subcategoria === 'Box Braids'),
      fulani: todosServicos.filter(s => s.categoria === 'Feminina' && s.subcategoria === 'Fulani'),
      ghana: todosServicos.filter(s => s.categoria === 'Feminina' && s.subcategoria === 'Ghana'),
      tiara: todosServicos.filter(s => s.categoria === 'Feminina' && s.subcategoria === 'Tiara'),
    },
  }), [])
  return (
    <section id="catalogo" className="py-20 relative">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-wine-50">
          Catálogo de Serviços
        </h2>
        <p className="text-center text-wine-200 mb-12">
          Clique em um serviço para ver detalhes e agendar
        </p>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Masculina Básica */}
          <div className="bg-wine-800/30 rounded-lg p-6 md:p-8 border border-wine-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-wine-50 mb-6 pb-3 border-b border-wine-700">
              Masculina Básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicosOrganizados.masculina.basica.map((servico) => (
                <Link
                  key={servico.id}
                  href={`/servico/${gerarSlug(servico.nome)}`}
                  className="bg-wine-900/50 rounded-lg p-4 border border-wine-700/30 hover:border-wine-600 hover:bg-wine-900/70 transition-all cursor-pointer group"
                >
                  <p className="text-wine-100 font-medium mb-2 group-hover:text-wine-50">{servico.nome}</p>
                  <p className="text-wine-300 text-lg font-semibold">{servico.preco}</p>
                  <p className="text-wine-400 text-sm mt-2">
                    Clique para agendar →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Masculina Simetria */}
          <div className="bg-wine-800/30 rounded-lg p-6 md:p-8 border border-wine-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-wine-50 mb-6 pb-3 border-b border-wine-700">
              Masculina Simetria
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicosOrganizados.masculina.simetria.map((servico) => (
                <Link
                  key={servico.id}
                  href={`/servico/${gerarSlug(servico.nome)}`}
                  className="bg-wine-900/50 rounded-lg p-4 border border-wine-700/30 hover:border-wine-600 hover:bg-wine-900/70 transition-all cursor-pointer group"
                >
                  <p className="text-wine-100 font-medium mb-2 group-hover:text-wine-50">{servico.nome}</p>
                  <p className="text-wine-300 text-lg font-semibold">{servico.preco}</p>
                  <p className="text-wine-400 text-sm mt-2">
                    Clique para agendar →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Masculina Outras */}
          <div className="bg-wine-800/30 rounded-lg p-6 md:p-8 border border-wine-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-wine-50 mb-6 pb-3 border-b border-wine-700">
              Masculina - Outros Estilos
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {servicosOrganizados.masculina.outras.map((servico) => (
                <Link
                  key={servico.id}
                  href={`/servico/${gerarSlug(servico.nome)}`}
                  className="bg-wine-900/50 rounded-lg p-4 border border-wine-700/30 hover:border-wine-600 hover:bg-wine-900/70 transition-all cursor-pointer group"
                >
                  <p className="text-wine-100 font-medium mb-2 group-hover:text-wine-50">{servico.nome}</p>
                  <p className="text-wine-300 text-lg font-semibold">{servico.preco}</p>
                  <p className="text-wine-400 text-sm mt-2">
                    Clique para agendar →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Feminina Box Braids */}
          <div className="bg-wine-800/30 rounded-lg p-6 md:p-8 border border-wine-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-wine-50 mb-6 pb-3 border-b border-wine-700">
              Feminina - Box Braids
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicosOrganizados.feminina.boxBraids.map((servico) => (
                <Link
                  key={servico.id}
                  href={`/servico/${gerarSlug(servico.nome)}`}
                  className="bg-wine-900/50 rounded-lg p-4 border border-wine-700/30 hover:border-wine-600 hover:bg-wine-900/70 transition-all cursor-pointer group"
                >
                  <p className="text-wine-100 font-medium mb-2 group-hover:text-wine-50">{servico.nome}</p>
                  <p className="text-wine-300 text-lg font-semibold">{servico.preco}</p>
                  <p className="text-wine-400 text-sm mt-2">
                    Clique para agendar →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Feminina Fulani */}
          <div className="bg-wine-800/30 rounded-lg p-6 md:p-8 border border-wine-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-wine-50 mb-6 pb-3 border-b border-wine-700">
              Feminina - Fulani
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {servicosOrganizados.feminina.fulani.map((servico) => (
                <Link
                  key={servico.id}
                  href={`/servico/${gerarSlug(servico.nome)}`}
                  className="bg-wine-900/50 rounded-lg p-4 border border-wine-700/30 hover:border-wine-600 hover:bg-wine-900/70 transition-all cursor-pointer group"
                >
                  <p className="text-wine-100 font-medium mb-2 group-hover:text-wine-50">{servico.nome}</p>
                  <p className="text-wine-300 text-lg font-semibold">{servico.preco}</p>
                  <p className="text-wine-400 text-sm mt-2">
                    Clique para agendar →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Feminina Ghana */}
          <div className="bg-wine-800/30 rounded-lg p-6 md:p-8 border border-wine-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-wine-50 mb-6 pb-3 border-b border-wine-700">
              Feminina - Ghana Braids
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicosOrganizados.feminina.ghana.map((servico) => (
                <Link
                  key={servico.id}
                  href={`/servico/${gerarSlug(servico.nome)}`}
                  className="bg-wine-900/50 rounded-lg p-4 border border-wine-700/30 hover:border-wine-600 hover:bg-wine-900/70 transition-all cursor-pointer group"
                >
                  <p className="text-wine-100 font-medium mb-2 group-hover:text-wine-50">{servico.nome}</p>
                  <p className="text-wine-300 text-lg font-semibold">{servico.preco}</p>
                  <p className="text-wine-400 text-sm mt-2">
                    Clique para agendar →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Feminina Tiara */}
          <div className="bg-wine-800/30 rounded-lg p-6 md:p-8 border border-wine-700/50">
            <h3 className="text-2xl md:text-3xl font-bold text-wine-50 mb-6 pb-3 border-b border-wine-700">
              Tiara
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {servicosOrganizados.feminina.tiara.map((servico) => (
                <Link
                  key={servico.id}
                  href={`/servico/${gerarSlug(servico.nome)}`}
                  className="bg-wine-900/50 rounded-lg p-4 border border-wine-700/30 hover:border-wine-600 hover:bg-wine-900/70 transition-all cursor-pointer group"
                >
                  <p className="text-wine-100 font-medium mb-2 group-hover:text-wine-50">{servico.nome}</p>
                  <p className="text-wine-300 text-lg font-semibold">{servico.preco}</p>
                  <p className="text-wine-400 text-sm mt-2">
                    Clique para agendar →
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
