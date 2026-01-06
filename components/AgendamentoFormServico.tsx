'use client'

import { useState, useEffect } from 'react'
import { Servico } from '@/lib/servicos'

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

  const handleDateSelect = (date: Date) => {
    const dateString = date.toISOString().split('T')[0]
    setSelectedDate(dateString)
    setFormData({
      ...formData,
      data: dateString,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Aqui você pode adicionar a lógica para enviar os dados ao Firebase
      console.log('Formulário enviado:', {
        ...formData,
        servico: servico.nome,
        preco: servico.preco,
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
      }, 3000)
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error)
      alert('Erro ao enviar agendamento. Tente novamente.')
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
                  <h3 className="text-2xl font-semibold text-wine-50 mb-4">Escolha o Horário *</h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                    {timeSlots.map((time, index) => {
                      const isSelected = formData.horario === time

                      return (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setFormData({ ...formData, horario: time })}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                            isSelected
                              ? 'bg-wine-600 border-wine-500 text-wine-50'
                              : 'bg-wine-800/50 border-wine-700 text-wine-200 hover:border-wine-600 hover:bg-wine-800/70'
                          }`}
                        >
                          {time}
                        </button>
                      )
                    })}
                  </div>
                  <input
                    type="hidden"
                    name="horario"
                    value={formData.horario}
                    required
                  />
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
