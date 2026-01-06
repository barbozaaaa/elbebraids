import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
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
    const agendamentosRef = collection(db, 'agendamentos')
    const q = query(agendamentosRef, orderBy('createdAt', 'desc'))
    const querySnapshot = await getDocs(q)
    
    return querySnapshot.docs.map(doc => converterAgendamento(doc))
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
    throw error
  }
}

// Criar novo agendamento
export const criarAgendamento = async (agendamento: Omit<Agendamento, 'id' | 'createdAt'>): Promise<string> => {
  try {
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
    const agendamentoRef = doc(db, 'agendamentos', id)
    await deleteDoc(agendamentoRef)
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
    throw error
  }
}
