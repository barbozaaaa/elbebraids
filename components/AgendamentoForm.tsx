'use client'

import { useState } from 'react'

export default function AgendamentoForm() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    data: '',
    horario: '',
    tipoTranca: '',
    observacoes: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aqui você pode adicionar a lógica para enviar os dados
    console.log('Formulário enviado:', formData)
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
        tipoTranca: '',
        observacoes: '',
      })
    }, 3000)
  }

  return (
    <section id="agendamento" className="py-20 bg-wine-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    className="w-full px-4 py-3 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="horario"
                    className="block text-wine-100 mb-2 font-medium"
                  >
                    Horário Preferencial *
                  </label>
                  <input
                    type="time"
                    id="horario"
                    name="horario"
                    required
                    value={formData.horario}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="tipoTranca"
                  className="block text-wine-100 mb-2 font-medium"
                >
                  Tipo de Trança
                </label>
                <select
                  id="tipoTranca"
                  name="tipoTranca"
                  value={formData.tipoTranca}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 focus:outline-none focus:ring-2 focus:ring-wine-500 focus:border-transparent"
                >
                  <option value="">Selecione o tipo de trança</option>
                  <option value="box-braids">Box Braids</option>
                  <option value="cornrows">Cornrows</option>
                  <option value="fulani">Fulani Braids</option>
                  <option value="twist">Twist</option>
                  <option value="outros">Outros</option>
                </select>
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

