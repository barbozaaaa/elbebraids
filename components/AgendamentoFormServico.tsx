'use client'

import { useState, useEffect } from 'react'
import { Servico } from '@/lib/servicos'
import { criarAgendamento, buscarAgendamentos, verificarConflitoHorario } from '@/lib/agendamentos'

interface AgendamentoFormServicoProps {
  servico: Servico
}

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
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [erro, setErro] = useState<string | null>(null)
  const [horariosOcupados, setHorariosOcupados] = useState<Set<string>>(new Set())
  const [carregandoHorarios, setCarregandoHorarios] = useState(false)

  // Gerar os próximos 20 dias
  const generateNext20Days = () => {
    const days = []
    const today = new Date()
    today.setHours(0, 0, 0, 0) // Resetar horas para início do dia

    for (let i = 0; i < 20; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      days.push(date)
    }

    return days
  }

  // Gerar horários de 1h30 em 1h30
  const generateTimeSlots = () => {
    const slots = []
    const startMinutes = 8 * 60 // Começar às 8:00 (480 minutos)
    const endMinutes = 18 * 60 // Terminar às 18:00 (1080 minutos)
    const intervalMinutes = 90 // Intervalo de 1h30 (90 minutos)
    
    let currentMinutes = startMinutes
    
    while (currentMinutes < endMinutes) {
      const hours = Math.floor(currentMinutes / 60)
      const minutes = currentMinutes % 60
      slots.push(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`)
      currentMinutes += intervalMinutes
    }

    return slots
  }

  const availableDays = generateNext20Days()
  const timeSlots = generateTimeSlots()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Carregar horários ocupados quando uma data é selecionada
  useEffect(() => {
    if (selectedDate) {
      carregarHorariosOcupados(selectedDate)
      
      // Atualizar horários ocupados a cada 30 segundos enquanto uma data estiver selecionada
      const interval = setInterval(() => {
        carregarHorariosOcupados(selectedDate)
      }, 30000) // 30 segundos
      
      return () => clearInterval(interval)
    } else {
      setHorariosOcupados(new Set())
    }
  }, [selectedDate])

  const carregarHorariosOcupados = async (data: string) => {
    // Não mostrar loading se já estiver carregando (evita flicker)
    if (!carregandoHorarios) {
      setCarregandoHorarios(true)
    }
    
    try {
      const agendamentos = await buscarAgendamentos()
      const ocupados = new Set<string>()
      
      // Filtrar agendamentos na mesma data que não estão cancelados
      // IMPORTANTE: Verifica TODOS os agendamentos, independente do serviço
      const dataSelecionada = new Date(data)
      agendamentos.forEach(ag => {
        const dataAg = typeof ag.data === 'string' ? new Date(ag.data) : ag.data
        const mesmaData = dataAg.toDateString() === dataSelecionada.toDateString()
        const naoCancelado = ag.status !== 'cancelado'
        
        // Adiciona o horário como ocupado se estiver na mesma data e não cancelado
        // Isso garante que horários ocupados aparecem em TODOS os serviços
        if (mesmaData && naoCancelado && ag.horario) {
          ocupados.add(ag.horario.trim())
        }
      })
      
      setHorariosOcupados(ocupados)
    } catch (error) {
      console.error('Erro ao carregar horários ocupados:', error)
    } finally {
      setCarregandoHorarios(false)
    }
  }

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    setSelectedDate(dateString)
    setFormData({
      ...formData,
      data: dateString,
      horario: '', // Limpar horário quando mudar a data
    })
    setErro(null) // Limpar erros anteriores
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErro(null)
    
    try {
      // Verificar conflito novamente antes de criar (double-check)
      const temConflito = await verificarConflitoHorario(formData.data, formData.horario)
      
      if (temConflito) {
        setErro('Este horário já está ocupado. Por favor, escolha outro horário.')
        // Recarregar horários ocupados
        await carregarHorariosOcupados(formData.data)
        return
      }

      // Salvar agendamento no Firebase
      await criarAgendamento({
        nome: formData.nome,
        telefone: formData.telefone,
        email: formData.email || undefined,
        data: formData.data,
        horario: formData.horario,
        servico: servico.nome,
        preco: servico.preco,
        observacoes: formData.observacoes || undefined,
        status: 'pendente',
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
        setSelectedDate('')
        setHorariosOcupados(new Set())
      }, 3000)
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      
      if (errorMessage.includes('ocupado') || errorMessage.includes('horário')) {
        setErro(errorMessage)
        // Recarregar horários ocupados
        if (formData.data) {
          await carregarHorariosOcupados(formData.data)
        }
      } else {
        setErro('Erro ao enviar agendamento. Tente novamente.')
      }
    }
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    })
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  return (
    <section id="agendamento" className="py-20 bg-wine-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-wine-50">
            Agendar {servico.nome}
          </h2>
          <p className="text-center text-wine-200 mb-12">
            Escolha a data e horário para seu agendamento
          </p>

          {submitted ? (
            <div className="bg-green-600/20 border-2 border-green-500 text-green-200 p-6 rounded-lg text-center">
              <p className="text-xl font-semibold">
                Obrigado! Seu agendamento foi recebido.
              </p>
              <p className="mt-2">Entraremos em contato em breve.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Informações do Serviço */}
              <div className="bg-wine-800/30 border border-wine-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-wine-50 mb-2">{servico.nome}</h3>
                <p className="text-wine-300">{servico.preco}</p>
              </div>

              {/* Dados Pessoais */}
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-wine-50">Dados Pessoais</h3>
                
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
              </div>

              {/* Seleção de Data */}
              <div>
                <h3 className="text-2xl font-semibold text-wine-50 mb-4">Escolha a Data *</h3>
                <div className="max-w-md mx-auto space-y-2">
                  {availableDays.map((day, index) => {
                    const dateString = day.toISOString().split('T')[0]
                    const isSelected = selectedDate === dateString
                    const isTodayDate = isToday(day)

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleDateSelect(day)}
                        className={`w-full p-3 rounded-lg border-2 transition-all duration-200 text-left ${
                          isSelected
                            ? 'bg-wine-600 border-wine-500 text-wine-50'
                            : 'bg-wine-800/50 border-wine-700 text-wine-200 hover:border-wine-600 hover:bg-wine-800/70'
                        } ${isTodayDate ? 'ring-2 ring-wine-400' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-sm font-medium">
                              {formatDate(day)}
                            </div>
                            {isTodayDate && (
                              <div className="text-xs text-wine-300 mt-1">Hoje</div>
                            )}
                          </div>
                          {isSelected && (
                            <div className="text-wine-50">✓</div>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
                <input
                  type="hidden"
                  name="data"
                  value={formData.data}
                  required
                />
              </div>

              {/* Seleção de Horário */}
              {selectedDate && (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-semibold text-wine-50">Escolha o Horário *</h3>
                    <button
                      type="button"
                      onClick={() => carregarHorariosOcupados(selectedDate)}
                      disabled={carregandoHorarios}
                      className="px-3 py-1.5 rounded-lg bg-wine-700 hover:bg-wine-600 text-wine-50 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Atualizar horários disponíveis"
                    >
                      {carregandoHorarios ? 'Atualizando...' : '🔄 Atualizar'}
                    </button>
                  </div>
                  {carregandoHorarios ? (
                    <p className="text-wine-300 text-center py-4">Carregando horários disponíveis...</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                        {timeSlots.map((time, index) => {
                          const isSelected = formData.horario === time
                          const isOcupado = horariosOcupados.has(time.trim())

                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => {
                                if (!isOcupado) {
                                  setFormData({ ...formData, horario: time })
                                  setErro(null)
                                }
                              }}
                              disabled={isOcupado}
                              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                                isOcupado
                                  ? 'bg-red-900/30 border-red-700 text-red-400 cursor-not-allowed opacity-60'
                                  : isSelected
                                  ? 'bg-wine-600 border-wine-500 text-wine-50'
                                  : 'bg-wine-800/50 border-wine-700 text-wine-200 hover:border-wine-600 hover:bg-wine-800/70'
                              }`}
                              title={isOcupado ? 'Horário ocupado' : `Selecionar ${time}`}
                            >
                              {time}
                              {isOcupado && <span className="block text-xs mt-1">Ocupado</span>}
                            </button>
                          )
                        })}
                      </div>
                      {horariosOcupados.size > 0 && (
                        <div className="mt-3 text-center">
                          <p className="text-wine-400 text-sm">
                            {horariosOcupados.size} horário(s) já ocupado(s) nesta data
                          </p>
                          <p className="text-wine-500 text-xs mt-1">
                            (Horários ocupados aparecem em todos os serviços)
                          </p>
                        </div>
                      )}
                    </>
                  )}
                  <input
                    type="hidden"
                    name="horario"
                    value={formData.horario}
                    required
                  />
                </div>
              )}

              {/* Mensagem de Erro */}
              {erro && (
                <div className="bg-red-900/30 border-2 border-red-500 text-red-200 p-4 rounded-lg">
                  <p className="font-semibold">{erro}</p>
                </div>
              )}

              {/* Observações */}
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

              {/* Botão de Envio */}
              <button
                type="submit"
                disabled={!formData.data || !formData.horario}
                className="w-full bg-wine-600 hover:bg-wine-700 disabled:bg-wine-800 disabled:cursor-not-allowed text-wine-50 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Confirmar Agendamento
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
