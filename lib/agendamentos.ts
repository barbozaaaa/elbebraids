import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  where,
  Timestamp 
} from 'firebase/firestore'
import { db } from './firebase'

export interface Agendamento {
  id?: string
  nome: string
  telefone: string
  email?: string
  data: string | Date
  horario: string
  servico?: string
  preco?: string
  observacoes?: string
  status?: 'pendente' | 'confirmado' | 'cancelado' | 'concluido'
  createdAt?: Date
}

// Converter dados do Firestore para Agendamento
const converterAgendamento = (doc: any): Agendamento => {
  const data = doc.data()
  return {
    id: doc.id,
    nome: data.nome || '',
    telefone: data.telefone || '',
    email: data.email || '',
    data: data.data?.toDate ? data.data.toDate() : data.data,
    horario: data.horario || '',
    servico: data.servico || '',
    preco: data.preco || '',
    observacoes: data.observacoes || '',
    status: data.status || 'pendente',
    createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
  }
}

// Buscar todos os agendamentos
export const buscarAgendamentos = async (): Promise<Agendamento[]> => {
  try {
    console.log('Iniciando busca de agendamentos no Firestore...')
    
    // Garantir que db está inicializado
    if (!db) {
      console.error('Firestore não está inicializado')
      throw new Error('Firestore não está inicializado. Verifique a configuração do Firebase.')
    }
    
    console.log('Firestore inicializado, buscando agendamentos...')
    const agendamentosRef = collection(db, 'agendamentos')
    
    // Tenta buscar com orderBy primeiro, se falhar, busca sem orderBy
    try {
      const q = query(agendamentosRef, orderBy('createdAt', 'desc'))
      const querySnapshot = await getDocs(q)
      console.log(`Encontrados ${querySnapshot.docs.length} agendamentos com orderBy`)
      
      const agendamentos = querySnapshot.docs.map(doc => converterAgendamento(doc))
      return agendamentos
    } catch (orderByError: any) {
      // Se o erro for relacionado a índice, tenta sem orderBy
      if (orderByError?.code === 'failed-precondition' || orderByError?.message?.includes('index')) {
        console.warn('Índice não encontrado, buscando sem orderBy...')
        const querySnapshot = await getDocs(agendamentosRef)
        console.log(`Encontrados ${querySnapshot.docs.length} agendamentos sem orderBy`)
        
        const agendamentos = querySnapshot.docs.map(doc => converterAgendamento(doc))
        // Ordena manualmente por data de criação (mais recente primeiro)
        return agendamentos.sort((a, b) => {
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
          return dateB - dateA
        })
      }
      throw orderByError
    }
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido'
    console.error('Detalhes do erro:', {
      message: errorMessage,
      error: error
    })
    throw error
  }
}

// Verificar se já existe agendamento no mesmo horário
export const verificarConflitoHorario = async (
  data: string | Date,
  horario: string
): Promise<boolean> => {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }

    // Converter data para formato comparável
    let dataComparavel: Date
    if (typeof data === 'string') {
      dataComparavel = new Date(data)
    } else {
      dataComparavel = data
    }
    
    // Normalizar data para início do dia para comparação
    const inicioDia = new Date(dataComparavel)
    inicioDia.setHours(0, 0, 0, 0)
    
    const fimDia = new Date(dataComparavel)
    fimDia.setHours(23, 59, 59, 999)

    const agendamentosRef = collection(db, 'agendamentos')
    
    // Tentar buscar com query composta primeiro
    try {
      const q = query(
        agendamentosRef,
        where('data', '>=', Timestamp.fromDate(inicioDia)),
        where('data', '<=', Timestamp.fromDate(fimDia))
      )
      
      const querySnapshot = await getDocs(q)
      
      // Verificar se há agendamento no mesmo horário que não esteja cancelado
      const conflito = querySnapshot.docs.some(doc => {
        const agendamento = converterAgendamento(doc)
        // Comparar horários (normalizar formato)
        const horarioExistente = agendamento.horario?.trim() || ''
        const horarioNovo = horario.trim()
        
        // Verificar se é o mesmo horário e se não está cancelado
        return horarioExistente === horarioNovo && 
               agendamento.status !== 'cancelado'
      })
      
      return conflito
    } catch (queryError: any) {
      // Se a query composta falhar (falta de índice), buscar todos e filtrar
      if (queryError?.code === 'failed-precondition' || queryError?.message?.includes('index')) {
        console.warn('Índice não encontrado, buscando todos os agendamentos para filtrar...')
        const querySnapshot = await getDocs(agendamentosRef)
        
        // Filtrar manualmente
        const conflito = querySnapshot.docs.some(doc => {
          const agendamento = converterAgendamento(doc)
          
          // Verificar se é na mesma data
          const dataAg = typeof agendamento.data === 'string' 
            ? new Date(agendamento.data) 
            : agendamento.data
          const mesmaData = dataAg.toDateString() === dataComparavel.toDateString()
          
          if (!mesmaData) return false
          
          // Comparar horários (normalizar formato)
          const horarioExistente = agendamento.horario?.trim() || ''
          const horarioNovo = horario.trim()
          
          // Verificar se é o mesmo horário e se não está cancelado
          return horarioExistente === horarioNovo && 
                 agendamento.status !== 'cancelado'
        })
        
        return conflito
      }
      throw queryError
    }
  } catch (error) {
    console.error('Erro ao verificar conflito de horário:', error)
    // Em caso de erro inesperado, lançar o erro para que o formulário possa tratá-lo
    throw error
  }
}

// Criar novo agendamento
export const criarAgendamento = async (agendamento: Omit<Agendamento, 'id' | 'createdAt'>): Promise<string> => {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }

    // Verificar conflito de horário antes de criar
    const temConflito = await verificarConflitoHorario(agendamento.data, agendamento.horario)
    
    if (temConflito) {
      throw new Error('Este horário já está ocupado. Por favor, escolha outro horário.')
    }

    const agendamentosRef = collection(db, 'agendamentos')
    
    // Converter data string para Timestamp se necessário
    let dataTimestamp: Timestamp | string | Date = agendamento.data
    if (typeof agendamento.data === 'string') {
      const dataDate = new Date(agendamento.data)
      dataTimestamp = Timestamp.fromDate(dataDate)
    } else if (agendamento.data instanceof Date) {
      dataTimestamp = Timestamp.fromDate(agendamento.data)
    }
    
    const docRef = await addDoc(agendamentosRef, {
      nome: agendamento.nome,
      telefone: agendamento.telefone,
      email: agendamento.email || '',
      data: dataTimestamp,
      horario: agendamento.horario,
      servico: agendamento.servico || '',
      preco: agendamento.preco || '',
      observacoes: agendamento.observacoes || '',
      status: agendamento.status || 'pendente',
      createdAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    throw error
  }
}

// Atualizar status do agendamento
export const atualizarStatusAgendamento = async (
  id: string, 
  status: Agendamento['status']
): Promise<void> => {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const agendamentoRef = doc(db, 'agendamentos', id)
    await updateDoc(agendamentoRef, {
      status: status || 'pendente',
    })
  } catch (error) {
    console.error('Erro ao atualizar status do agendamento:', error)
    throw error
  }
}

// Deletar agendamento
export const deletarAgendamento = async (id: string): Promise<void> => {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const agendamentoRef = doc(db, 'agendamentos', id)
    await deleteDoc(agendamentoRef)
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
    throw error
  }
}
