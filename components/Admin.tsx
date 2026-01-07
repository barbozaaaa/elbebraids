'use client'

import { useEffect, useState } from 'react'
import { 
  buscarAgendamentos, 
  atualizarStatusAgendamento, 
  deletarAgendamento,
  Agendamento 
} from '@/lib/agendamentos'
import { popularServicosSeNaoExistem } from '@/lib/seed-servicos'

export default function Admin() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([])
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState<string | null>(null)
  const [filtroStatus, setFiltroStatus] = useState<'todos' | Agendamento['status']>('todos')
  const [busca, setBusca] = useState('')
  const [populandoServicos, setPopulandoServicos] = useState(false)

  useEffect(() => {
    // Verifica se está na rota /#adm
    const checkHash = () => {
      setIsAdmin(window.location.hash === '#adm')
    }
    
    checkHash()
    window.addEventListener('hashchange', checkHash)
    
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  useEffect(() => {
    if (isAdmin) {
      // Pequeno delay para garantir que o componente está montado
      const timer = setTimeout(() => {
        carregarAgendamentos()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [isAdmin])

  const carregarAgendamentos = async () => {
    setLoading(true)
    setErro(null)
    try {
      console.log('Iniciando busca de agendamentos...')
      const dados = await buscarAgendamentos()
      console.log('Agendamentos carregados:', dados)
      setAgendamentos(dados || [])
      if ((dados || []).length === 0) {
        setErro('Nenhum agendamento encontrado no banco de dados.')
      }
    } catch (error) {
      console.error('Erro ao carregar agendamentos:', error)
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
      setErro(`Erro ao carregar agendamentos: ${errorMessage}. Verifique o console para mais detalhes.`)
      setAgendamentos([])
    } finally {
      setLoading(false)
    }
  }

  const handleAtualizarStatus = async (id: string, novoStatus: Agendamento['status']) => {
    try {
      await atualizarStatusAgendamento(id, novoStatus)
      await carregarAgendamentos()
    } catch (error) {
      console.error('Erro ao atualizar status:', error)
      alert('Erro ao atualizar status')
    }
  }

  const handleDeletar = async (id: string) => {
    if (!confirm('Tem certeza que deseja deletar este agendamento?')) {
      return
    }
    try {
      await deletarAgendamento(id)
      await carregarAgendamentos()
    } catch (error) {
      console.error('Erro ao deletar agendamento:', error)
      alert('Erro ao deletar agendamento')
    }
  }

  const handlePopularServicos = async () => {
    if (!confirm('Deseja popular o banco de dados com os serviços iniciais? Isso só criará serviços que ainda não existem.')) {
      return
    }
    setPopulandoServicos(true)
    try {
      const resultado = await popularServicosSeNaoExistem()
      alert(resultado.mensagem)
    } catch (error) {
      console.error('Erro ao popular serviços:', error)
      alert('Erro ao popular serviços. Verifique o console para mais detalhes.')
    } finally {
      setPopulandoServicos(false)
    }
  }

  const agendamentosFiltrados = agendamentos.filter(ag => {
    const matchStatus = filtroStatus === 'todos' || ag.status === filtroStatus
    const matchBusca = busca === '' || 
      ag.nome.toLowerCase().includes(busca.toLowerCase()) ||
      ag.telefone.includes(busca) ||
      ag.servico?.toLowerCase().includes(busca.toLowerCase())
    return matchStatus && matchBusca
  })

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-600/20 text-green-300 border-green-500'
      case 'cancelado':
        return 'bg-red-600/20 text-red-300 border-red-500'
      case 'concluido':
        return 'bg-blue-600/20 text-blue-300 border-blue-500'
      default:
        return 'bg-wine-600/20 text-wine-300 border-wine-500'
    }
  }

  const getStatusLabel = (status?: string) => {
    switch (status) {
      case 'confirmado':
        return 'Confirmado'
      case 'cancelado':
        return 'Cancelado'
      case 'concluido':
        return 'Concluído'
      default:
        return 'Pendente'
    }
  }

  // Função para extrair valor numérico do preço
  const extrairValorPreco = (preco?: string): number => {
    if (!preco) return 0
    
    // Remove tudo exceto números, vírgula e ponto
    let valorLimpo = preco.replace(/[^\d,.-]/g, '')
    
    // Se não encontrou nada, retorna 0
    if (!valorLimpo) return 0
    
    // Se tem vírgula e ponto, assume que vírgula é decimal (formato brasileiro)
    if (valorLimpo.includes(',') && valorLimpo.includes('.')) {
      // Remove pontos (milhares) e substitui vírgula por ponto
      valorLimpo = valorLimpo.replace(/\./g, '').replace(',', '.')
    } else if (valorLimpo.includes(',')) {
      // Se só tem vírgula, pode ser decimal ou milhar
      // Se tem mais de 3 dígitos antes da vírgula, é milhar
      const partes = valorLimpo.split(',')
      if (partes[0].length > 3) {
        // É milhar, remove vírgula
        valorLimpo = valorLimpo.replace(',', '')
      } else {
        // É decimal, substitui vírgula por ponto
        valorLimpo = valorLimpo.replace(',', '.')
      }
    }
    
    // Tenta converter para número
    const numero = parseFloat(valorLimpo)
    
    return isNaN(numero) ? 0 : numero
  }

  // Calcular total faturado (apenas agendamentos concluídos)
  const calcularTotalFaturado = (): number => {
    return agendamentos
      .filter(ag => ag.status === 'concluido')
      .reduce((total, ag) => total + extrairValorPreco(ag.preco), 0)
  }

  // Calcular total faturado no mês atual
  const calcularTotalMesAtual = (): number => {
    const hoje = new Date()
    const mesAtual = hoje.getMonth()
    const anoAtual = hoje.getFullYear()

    return agendamentos
      .filter(ag => {
        if (ag.status !== 'concluido') return false
        
        const dataAg = typeof ag.data === 'string' ? new Date(ag.data) : ag.data
        return dataAg.getMonth() === mesAtual && dataAg.getFullYear() === anoAtual
      })
      .reduce((total, ag) => total + extrairValorPreco(ag.preco), 0)
  }

  // Formatar valor monetário
  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  if (!isAdmin) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-wine-950/95 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-wine-900 border border-wine-700 rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto my-8">
        <div className="p-6 border-b border-wine-700 sticky top-0 bg-wine-900 z-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-3xl font-bold text-wine-50">Painel Administrativo</h2>
            <div className="flex gap-2 items-center">
              <button
                onClick={carregarAgendamentos}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-wine-700 hover:bg-wine-600 text-wine-50 text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Recarregar agendamentos"
              >
                🔄 {loading ? 'Carregando...' : 'Recarregar'}
              </button>
              <button
                onClick={() => {
                  window.location.hash = ''
                  setIsAdmin(false)
                }}
                className="text-wine-300 hover:text-wine-50 transition-colors text-2xl"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Filtros e Busca */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por nome, telefone ou serviço..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-wine-800/50 border border-wine-700 text-wine-50 placeholder-wine-400 focus:outline-none focus:ring-2 focus:ring-wine-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFiltroStatus('todos')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filtroStatus === 'todos'
                    ? 'bg-wine-600 text-wine-50'
                    : 'bg-wine-800/50 text-wine-200 hover:bg-wine-700/50'
                }`}
              >
                Todos
              </button>
              <button
                onClick={() => setFiltroStatus('concluido')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filtroStatus === 'concluido'
                    ? 'bg-wine-600 text-wine-50'
                    : 'bg-wine-800/50 text-wine-200 hover:bg-wine-700/50'
                }`}
              >
                Concluídos
              </button>
              <button
                onClick={() => setFiltroStatus('cancelado')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filtroStatus === 'cancelado'
                    ? 'bg-wine-600 text-wine-50'
                    : 'bg-wine-800/50 text-wine-200 hover:bg-wine-700/50'
                }`}
              >
                Cancelados
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          {erro && (
            <div className="mb-4 p-4 bg-red-900/30 border border-red-700 rounded-lg">
              <p className="text-red-300 mb-2">{erro}</p>
              <button
                onClick={carregarAgendamentos}
                disabled={loading}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors disabled:opacity-50"
              >
                Tentar Novamente
              </button>
            </div>
          )}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-wine-300">Carregando agendamentos...</p>
            </div>
          ) : agendamentos.length === 0 && !erro ? (
            <div className="text-center py-12">
              <p className="text-wine-300 mb-4">Nenhum agendamento encontrado.</p>
              <button
                onClick={carregarAgendamentos}
                className="px-4 py-2 rounded-lg bg-wine-600 hover:bg-wine-700 text-wine-50 transition-colors"
              >
                Tentar Novamente
              </button>
            </div>
          ) : agendamentosFiltrados.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-wine-300">Nenhum agendamento encontrado com os filtros aplicados.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {agendamentosFiltrados.map((agendamento) => (
                <div
                  key={agendamento.id}
                  className="bg-wine-800/30 rounded-lg p-4 border border-wine-700/50 hover:border-wine-600 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-wine-50">{agendamento.nome}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(agendamento.status)}`}>
                          {getStatusLabel(agendamento.status)}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-wine-200 text-sm">
                        <p><span className="text-wine-400">Telefone:</span> {agendamento.telefone}</p>
                        {agendamento.email && (
                          <p><span className="text-wine-400">E-mail:</span> {agendamento.email}</p>
                        )}
                        <p><span className="text-wine-400">Data:</span> {new Date(agendamento.data).toLocaleDateString('pt-BR')}</p>
                        <p><span className="text-wine-400">Horário:</span> {agendamento.horario}</p>
                        {agendamento.servico && (
                          <p className="md:col-span-2">
                            <span className="text-wine-400">Serviço:</span> {agendamento.servico} - {agendamento.preco}
                          </p>
                        )}
                        {agendamento.observacoes && (
                          <p className="md:col-span-2">
                            <span className="text-wine-400">Observações:</span> {agendamento.observacoes}
                          </p>
                        )}
                        {agendamento.createdAt && (
                          <p className="md:col-span-2 text-wine-500 text-xs">
                            Criado em: {agendamento.createdAt.toLocaleString('pt-BR')}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => handleAtualizarStatus(agendamento.id!, 'concluido')}
                        disabled={agendamento.status === 'concluido'}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          agendamento.status === 'concluido'
                            ? 'bg-blue-600/30 text-blue-300 border-blue-600/50 cursor-not-allowed'
                            : 'bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border-blue-600/30'
                        }`}
                      >
                        Concluído
                      </button>
                      <button
                        onClick={() => handleAtualizarStatus(agendamento.id!, 'cancelado')}
                        disabled={agendamento.status === 'cancelado'}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                          agendamento.status === 'cancelado'
                            ? 'bg-red-600/30 text-red-300 border-red-600/50 cursor-not-allowed'
                            : 'bg-red-600/20 hover:bg-red-600/30 text-red-300 border-red-600/30'
                        }`}
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Botão para popular serviços */}
          <div className="mt-8 pt-8 border-t border-wine-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-wine-100">Banco de Dados</h3>
              <button
                onClick={handlePopularServicos}
                disabled={populandoServicos}
                className="px-4 py-2 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-sm font-medium transition-colors border border-blue-600/30 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {populandoServicos ? 'Populando...' : 'Popular Serviços no Banco'}
              </button>
            </div>
            <p className="text-wine-400 text-sm mb-4">
              Use este botão para popular o banco de dados Firestore com os serviços iniciais. 
              Serviços que já existem não serão duplicados.
            </p>
          </div>

          {/* Contagem de Caixa */}
          <div className="mt-8 pt-8 border-t border-wine-700">
            <h3 className="text-xl font-semibold text-wine-100 mb-4">💰 Contagem de Caixa</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-900/30 rounded-lg p-6 border-2 border-green-700">
                <p className="text-green-300 text-sm font-medium mb-2">Total Faturado</p>
                <p className="text-4xl font-bold text-green-100">
                  {formatarMoeda(calcularTotalFaturado())}
                </p>
                <p className="text-green-400 text-xs mt-2">
                  {agendamentos.filter(a => a.status === 'concluido').length} serviço(s) concluído(s)
                </p>
              </div>
              <div className="bg-blue-900/30 rounded-lg p-6 border-2 border-blue-700">
                <p className="text-blue-300 text-sm font-medium mb-2">Faturado este Mês</p>
                <p className="text-4xl font-bold text-blue-100">
                  {formatarMoeda(calcularTotalMesAtual())}
                </p>
                <p className="text-blue-400 text-xs mt-2">
                  {agendamentos.filter(ag => {
                    if (ag.status !== 'concluido') return false
                    const hoje = new Date()
                    const dataAg = typeof ag.data === 'string' ? new Date(ag.data) : ag.data
                    return dataAg.getMonth() === hoje.getMonth() && 
                           dataAg.getFullYear() === hoje.getFullYear()
                  }).length} serviço(s) este mês
                </p>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="mt-8 pt-8 border-t border-wine-700">
            <h3 className="text-xl font-semibold text-wine-100 mb-4">Estatísticas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-wine-800/50 rounded-lg p-4 border border-wine-700">
                <p className="text-wine-400 text-sm">Total</p>
                <p className="text-2xl font-bold text-wine-50 mt-2">{agendamentos.length}</p>
              </div>
              <div className="bg-wine-800/50 rounded-lg p-4 border border-wine-700">
                <p className="text-wine-400 text-sm">Concluídos</p>
                <p className="text-2xl font-bold text-wine-50 mt-2">
                  {agendamentos.filter(a => a.status === 'concluido').length}
                </p>
              </div>
              <div className="bg-wine-800/50 rounded-lg p-4 border border-wine-700">
                <p className="text-wine-400 text-sm">Cancelados</p>
                <p className="text-2xl font-bold text-wine-50 mt-2">
                  {agendamentos.filter(a => a.status === 'cancelado').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
