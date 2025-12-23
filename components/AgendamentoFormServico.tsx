'use client'

import { useState, useEffect } from 'react'
import { Servico } from '@/lib/servicos'
import { criarAgendamento, buscarHorariosOcupados, verificarHorarioDisponivel } from '@/lib/agendamentos'

interface AgendamentoFormServicoProps {
  servico: Servico
}

// Horários disponíveis
const HORARIOS_DISPONIVEIS = [
  '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', 
  '16:00', '17:00', '18:00', '19:00', '20:00'
]

export default function AgendamentoFormServico({ servico }: AgendamentoFormServicoProps) {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    data: '',
    horario: '',
    observacoes: '',
  })

  const [submitted, setSubmitted] = useState(false)
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([])
  const [loadingHorarios, setLoadingHorarios] = useState(false)
  const [errorHorario, setErrorHorario] = useState('')

  // Carregar horários ocupados quando a data mudar
  useEffect(() => {
    const carregarHorariosOcupados = async () => {
      if (formData.data) {
        setLoadingHorarios(true)
        setErrorHorario('')
        try {
          const ocupados = await buscarHorariosOcupados(formData.data)
          setHorariosOcupados(ocupados || [])
          // Se o horário selecionado estiver ocupado, limpar a seleção
          setFormData(prev => {
            if (prev.horario && ocupados.includes(prev.horario)) {
              setErrorHorario('Este horário já está ocupado. Por favor, escolha outro.')
              return { ...prev, horario: '' }
            }
            return prev
          })
        } catch (error) {
          console.error('Erro ao carregar horários:', error)
          // Mesmo com erro, mostrar os horários disponíveis
          setHorariosOcupados([])
          setErrorHorario('Não foi possível verificar horários ocupados. Tente novamente.')
        } finally {
          setLoadingHorarios(false)
        }
      } else {
        setHorariosOcupados([])
        setLoadingHorarios(false)
      }
    }
    carregarHorariosOcupados()
  }, [formData.data])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
    // Limpar erro quando mudar a data
    if (name === 'data') {
      setErrorHorario('')
      setFormData(prev => ({ ...prev, horario: '' }))
    }
  }

  const handleHorarioClick = (horario: string) => {
    if (horariosOcupados.includes(horario)) {
      setErrorHorario('Este horário já está ocupado. Por favor, escolha outro.')
      return
    }
    setFormData({
      ...formData,
      horario: horario,
    })
    setErrorHorario('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar se o horário foi selecionado
    if (!formData.horario) {
      setErrorHorario('Por favor, selecione um horário.')
      return
    }
    
    // Validar se o horário ainda está disponível antes de enviar
    if (formData.data && formData.horario) {
      const disponivel = await verificarHorarioDisponivel(formData.data, formData.horario)
      if (!disponivel) {
        setErrorHorario('Este horário foi ocupado enquanto você preenchia o formulário. Por favor, escolha outro horário.')
        // Recarregar horários ocupados
        const ocupados = await buscarHorariosOcupados(formData.data)
        setHorariosOcupados(ocupados)
        return
      }
    }

    try {
      await criarAgendamento({
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email || undefined,
        data: formData.data,
        horario: formData.horario,
        servico: servico.nome,
        servicoId: servico.id,
        preco: servico.preco,
        observacoes: formData.observacoes || undefined,
      })
      setSubmitted(true)
      
      // Limpar formulário após 3 segundos
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          nome: '',
          telefone: '',
          email: '',
          data: '',
          horario: '',
          observacoes: '',
        })
        setHorariosOcupados([])
        setErrorHorario('')
      }, 3000)
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error)
      alert('Erro ao enviar agendamento. Tente novamente.')
    }
  }

  return (
    <section id="agendamento" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-wine-800/30 rounded-lg p-6 mb-8 border border-wine-700/50">
            <h3 className="text-2xl font-bold text-wine-50 mb-2">Serviço Selecionado</h3>
            <p className="text-wine-200 text-lg">{servico.nome}</p>
            <p className="text-wine-300 text-xl font-semibold mt-2">{servico.preco}</p>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-wine-50">
            Agendar Consulta
          </h2>
          <p className="text-center text-wine-200 mb-12">
            Preencha os dados abaixo para agendar sua consulta
          </p>

          {submitted ? (
            <div className="bg-green-600/20 border-2 border-green-500 text-green-200 p-6 rounded-lg text-center">
              <p className="text-xl font-semibold">
                Obrigado! Seu agendamento foi recebido.
              </p>
              <p className="mt-2">Entraremos em contato em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="nome"
                  className="block text-wine-100 mb-2 font-medium"
                >
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 placeholder-wine-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                  placeholder="Seu nome completo"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="telefone"
                    className="block text-wine-100 mb-2 font-medium"
                  >
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    required
                    value={formData.telefone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 placeholder-wine-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-wine-100 mb-2 font-medium"
                  >
                    E-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 placeholder-wine-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="data"
                  className="block text-wine-100 mb-2 font-medium"
                >
                  Data Preferencial *
                </label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  required
                  value={formData.data}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-wine-100 mb-2 font-medium">
                  Horário Preferencial *
                </label>
                {!formData.data ? (
                  <p className="text-wine-400 text-sm">
                    Por favor, selecione uma data primeiro para ver os horários disponíveis.
                  </p>
                ) : loadingHorarios ? (
                  <div className="text-wine-300 text-center py-4">
                    Verificando horários disponíveis...
                  </div>
                ) : (
                  <div>
                    <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2 mb-2">
                      {HORARIOS_DISPONIVEIS.map((horario) => {
                        const ocupado = horariosOcupados.includes(horario)
                        const selecionado = formData.horario === horario
                        return (
                          <button
                            key={horario}
                            type="button"
                            onClick={() => handleHorarioClick(horario)}
                            disabled={ocupado}
                            style={{ 
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none'
                            }}
                            className={`
                              px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-200
                              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-wine-500
                              border-none
                              ${
                                selecionado
                                  ? 'bg-wine-600 text-wine-50 shadow-md'
                                  : ocupado
                                  ? 'bg-wine-900/30 text-wine-500 cursor-not-allowed opacity-40 line-through'
                                  : 'bg-wine-800/40 text-wine-50 hover:bg-wine-700/60 hover:shadow-md'
                              }
                            `}
                          >
                            {horario}
                          </button>
                        )
                      })}
                    </div>
                    {errorHorario && (
                      <p className="text-red-400 text-sm mt-2">{errorHorario}</p>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label
                  htmlFor="observacoes"
                  className="block text-wine-100 mb-2 font-medium"
                >
                  Observações
                </label>
                <textarea
                  id="observacoes"
                  name="observacoes"
                  rows={4}
                  value={formData.observacoes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 placeholder-wine-400 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent resize-none"
                  placeholder="Alguma observação ou informação adicional..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-wine-600 hover:bg-wine-700 text-wine-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Enviar Agendamento
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

