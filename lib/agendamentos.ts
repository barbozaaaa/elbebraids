import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where, 
  Timestamp,
  doc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore'
import { db } from './firebase'

export interface Agendamento {
  id?: string
  nome: string
  telefone: string
  email?: string
  data: string
  horario: string
  servico?: string
  servicoId?: string
  preco?: string
  observacoes?: string
  status?: 'pendente' | 'confirmado' | 'cancelado' | 'concluido'
  createdAt?: Date
  updatedAt?: Date
}

// Salvar novo agendamento
export async function criarAgendamento(agendamento: Omit<Agendamento, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, 'agendamentos'), {
      ...agendamento,
      status: 'pendente',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Erro ao criar agendamento:', error)
    throw error
  }
}

// Buscar todos os agendamentos
export async function buscarAgendamentos(): Promise<Agendamento[]> {
  try {
    const q = query(
      collection(db, 'agendamentos'),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Agendamento[]
  } catch (error) {
    console.error('Erro ao buscar agendamentos:', error)
    throw error
  }
}

// Buscar agendamentos por status
export async function buscarAgendamentosPorStatus(status: Agendamento['status']): Promise<Agendamento[]> {
  try {
    const q = query(
      collection(db, 'agendamentos'),
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    )
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Agendamento[]
  } catch (error) {
    console.error('Erro ao buscar agendamentos por status:', error)
    throw error
  }
}

// Atualizar status do agendamento
export async function atualizarStatusAgendamento(
  id: string, 
  status: Agendamento['status']
): Promise<void> {
  try {
    const agendamentoRef = doc(db, 'agendamentos', id)
    await updateDoc(agendamentoRef, {
      status,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Erro ao atualizar agendamento:', error)
    throw error
  }
}

// Deletar agendamento
export async function deletarAgendamento(id: string): Promise<void> {
  try {
    const agendamentoRef = doc(db, 'agendamentos', id)
    await deleteDoc(agendamentoRef)
  } catch (error) {
    console.error('Erro ao deletar agendamento:', error)
    throw error
  }
}

// Buscar agendamentos por data
export async function buscarAgendamentosPorData(data: string): Promise<Agendamento[]> {
  try {
    const q = query(
      collection(db, 'agendamentos'),
      where('data', '==', data),
      orderBy('horario', 'asc')
    )
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as Agendamento[]
  } catch (error) {
    console.error('Erro ao buscar agendamentos por data:', error)
    throw error
  }
}


