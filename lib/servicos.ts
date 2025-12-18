export interface Servico {
  id: string
  nome: string
  preco: string
  categoria: string
  subcategoria: string
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

export function getServicoPorSlug(slug: string): Servico | undefined {
  return todosServicos.find(servico => gerarSlug(servico.nome) === slug)
}

export function getServicoPorId(id: string): Servico | undefined {
  return todosServicos.find(servico => servico.id === id)
}

