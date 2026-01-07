import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  where,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  QuerySnapshot,
  DocumentData,
  Timestamp,
  setDoc
} from 'firebase/firestore'
import { db } from './firebase'

export interface Servico {
  id: string
  nome: string
  preco: string
  categoria: string
  subcategoria: string
  ativo?: boolean
  ordem?: number
  descricao?: string
  createdAt?: Date
  updatedAt?: Date
}

// Função para gerar slug único baseado no nome
export function gerarSlug(nome: string): string {
  return nome
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// Dados estáticos como fallback
export const todosServicos: Servico[] = [
  // Masculina Básica
  { id: '1', nome: 'Enraizada topo básico', preco: 'A partir de R$ 100,00', categoria: 'Masculina', subcategoria: 'Básica' },
  { id: '2', nome: 'Enraizada meia cabeça básica', preco: 'A partir de R$ 90,00', categoria: 'Masculina', subcategoria: 'Básica' },
  { id: '3', nome: 'Enraizada básica - corte baixo/cabeça inteira', preco: 'A partir de R$ 120,00', categoria: 'Masculina', subcategoria: 'Básica' },
  
  // Masculina Simetria
  { id: '4', nome: 'Simetria cabeça inteira/corte baixo', preco: 'A partir de R$ 150,00', categoria: 'Masculina', subcategoria: 'Simetria' },
  { id: '5', nome: 'Simetria corte médio', preco: 'A partir de R$ 130,00', categoria: 'Masculina', subcategoria: 'Simetria' },
  { id: '6', nome: 'Simetria somente o topo', preco: 'A partir de R$ 120,00', categoria: 'Masculina', subcategoria: 'Simetria' },
  
  // Masculina Outras
  { id: '7', nome: 'Freestyle topo da cabeça', preco: 'A partir de R$ 150,00', categoria: 'Masculina', subcategoria: 'Outros' },
  { id: '8', nome: 'Fulani masculina', preco: 'A partir de R$ 200,00', categoria: 'Masculina', subcategoria: 'Fulani' },
  { id: '9', nome: 'Fulani masculina com trança solta', preco: 'A partir de R$ 180,00', categoria: 'Masculina', subcategoria: 'Fulani' },
  { id: '10', nome: 'Two twist enraizado', preco: 'A partir de R$ 130,00', categoria: 'Masculina', subcategoria: 'Outros' },
  
  // Feminina Box Braids
  { id: '11', nome: 'Boho braids M', preco: 'A partir de R$ 200,00', categoria: 'Feminina', subcategoria: 'Box Braids' },
  { id: '12', nome: 'Boho braids', preco: 'A partir de R$ 250,00', categoria: 'Feminina', subcategoria: 'Box Braids' },
  { id: '13', nome: 'Gypsy braids', preco: 'A partir de R$ 190,00', categoria: 'Feminina', subcategoria: 'Box Braids' },
  
  // Feminina Fulani
  { id: '14', nome: 'Fulani com cachos', preco: 'A partir de R$ 200,00', categoria: 'Feminina', subcategoria: 'Fulani' },
  { id: '15', nome: 'Fulani sem cachos', preco: 'A partir de R$ 180,00', categoria: 'Feminina', subcategoria: 'Fulani' },
  
  // Feminina Ghana
  { id: '16', nome: 'Ghana freestyle sem cachos', preco: 'R$ 200,00', categoria: 'Feminina', subcategoria: 'Ghana' },
  { id: '17', nome: 'Ghana freestyle com cachos', preco: 'R$ 250,00', categoria: 'Feminina', subcategoria: 'Ghana' },
  { id: '18', nome: 'Ghana cabelo natural 6 a 8 tranças', preco: 'R$ 130,00', categoria: 'Feminina', subcategoria: 'Ghana' },
  
  // Tiara
  { id: '19', nome: 'Tiara', preco: 'A partir de R$ 90,00', categoria: 'Feminina', subcategoria: 'Tiara' },
]

// ==================== FUNÇÕES FIREBASE ====================

// Buscar todos os serviços do Firestore
export async function buscarTodosServicos(): Promise<Servico[]> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const q = query(
      collection(db, 'servicos'),
      orderBy('categoria', 'asc'),
      orderBy('subcategoria', 'asc'),
      orderBy('ordem', 'asc')
    )
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    
    // Filtrar serviços ativos no cliente (ativo !== false)
    const servicos = querySnapshot.docs
      .map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Servico
      })
      .filter(servico => servico.ativo !== false)
    
    return servicos
  } catch (error) {
    console.error('Erro ao buscar serviços:', error)
    // Retorna dados estáticos como fallback
    return todosServicos
  }
}

// Buscar serviço por ID no Firestore
export async function buscarServicoPorId(id: string): Promise<Servico | null> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const docRef = doc(db, 'servicos', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      const data = docSnap.data()
      // Verificar se o serviço está ativo
      if (data.ativo === false) {
        return null
      }
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as Servico
    }
    return null
  } catch (error) {
    console.error('Erro ao buscar serviço:', error)
    // Fallback para dados estáticos
    return getServicoPorId(id) || null
  }
}

// Buscar serviço por slug no Firestore
export async function buscarServicoPorSlug(slug: string): Promise<Servico | null> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const q = query(collection(db, 'servicos'))
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    
    const servico = querySnapshot.docs.find(doc => {
      const data = doc.data()
      return data.ativo !== false && gerarSlug(data.nome) === slug
    })
    
    if (servico) {
      return {
        id: servico.id,
        ...servico.data(),
        createdAt: servico.data().createdAt?.toDate(),
        updatedAt: servico.data().updatedAt?.toDate(),
      } as Servico
    }
    return null
  } catch (error) {
    console.error('Erro ao buscar serviço por slug:', error)
    // Fallback para dados estáticos
    return getServicoPorSlug(slug) || null
  }
}

// Criar novo serviço no Firestore
export async function criarServico(servico: Omit<Servico, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const docRef = await addDoc(collection(db, 'servicos'), {
      ...servico,
      ativo: servico.ativo !== undefined ? servico.ativo : true,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    })
    return docRef.id
  } catch (error) {
    console.error('Erro ao criar serviço:', error)
    throw error
  }
}

// Atualizar serviço no Firestore
export async function atualizarServico(id: string, servico: Partial<Omit<Servico, 'id' | 'createdAt'>>): Promise<void> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const servicoRef = doc(db, 'servicos', id)
    await updateDoc(servicoRef, {
      ...servico,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error)
    throw error
  }
}

// Deletar serviço do Firestore (soft delete marcando como inativo)
export async function deletarServico(id: string): Promise<void> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const servicoRef = doc(db, 'servicos', id)
    await updateDoc(servicoRef, {
      ativo: false,
      updatedAt: Timestamp.now(),
    })
  } catch (error) {
    console.error('Erro ao deletar serviço:', error)
    throw error
  }
}

// Deletar serviço permanentemente do Firestore
export async function deletarServicoPermanentemente(id: string): Promise<void> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const servicoRef = doc(db, 'servicos', id)
    await deleteDoc(servicoRef)
  } catch (error) {
    console.error('Erro ao deletar serviço permanentemente:', error)
    throw error
  }
}

// Buscar serviços por categoria
export async function buscarServicosPorCategoria(categoria: string): Promise<Servico[]> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const q = query(
      collection(db, 'servicos'),
      where('categoria', '==', categoria),
      orderBy('subcategoria', 'asc'),
      orderBy('ordem', 'asc')
    )
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    
    // Filtrar serviços ativos no cliente
    const servicos = querySnapshot.docs
      .map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Servico
      })
      .filter(servico => servico.ativo !== false)
    
    return servicos
  } catch (error) {
    console.error('Erro ao buscar serviços por categoria:', error)
    return todosServicos.filter(s => s.categoria === categoria)
  }
}

// Buscar serviços por subcategoria
export async function buscarServicosPorSubcategoria(categoria: string, subcategoria: string): Promise<Servico[]> {
  try {
    if (!db) {
      throw new Error('Firestore não está inicializado')
    }
    const q = query(
      collection(db, 'servicos'),
      where('categoria', '==', categoria),
      where('subcategoria', '==', subcategoria),
      orderBy('ordem', 'asc')
    )
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(q)
    
    // Filtrar serviços ativos no cliente
    const servicos = querySnapshot.docs
      .map(doc => {
        const data = doc.data()
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate(),
          updatedAt: data.updatedAt?.toDate(),
        } as Servico
      })
      .filter(servico => servico.ativo !== false)
    
    return servicos
  } catch (error) {
    console.error('Erro ao buscar serviços por subcategoria:', error)
    return todosServicos.filter(s => s.categoria === categoria && s.subcategoria === subcategoria)
  }
}

// ==================== FUNÇÕES ESTÁTICAS (FALLBACK) ====================

export function getServicoPorSlug(slug: string): Servico | undefined {
  return todosServicos.find(servico => gerarSlug(servico.nome) === slug)
}

export function getServicoPorId(id: string): Servico | undefined {
  return todosServicos.find(servico => servico.id === id)
}




