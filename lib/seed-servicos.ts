/**
 * Script para popular o banco de dados Firestore com os serviços iniciais
 * 
 * Como usar:
 * 1. Execute no console do navegador quando estiver na página do admin: #adm
 * 2. Ou crie uma página/API route que execute esta função
 */

import { criarServico, todosServicos } from './servicos'

export async function popularServicos(): Promise<{ sucesso: number; erros: number }> {
  let sucesso = 0
  let erros = 0

  console.log('Iniciando população de serviços no Firestore...')

  for (const servico of todosServicos) {
    try {
      await criarServico({
        nome: servico.nome,
        preco: servico.preco,
        categoria: servico.categoria,
        subcategoria: servico.subcategoria,
        ativo: true,
        ordem: parseInt(servico.id),
      })
      console.log(`✓ Serviço criado: ${servico.nome}`)
      sucesso++
    } catch (error) {
      console.error(`✗ Erro ao criar serviço ${servico.nome}:`, error)
      erros++
    }
  }

  console.log(`\nConcluído! ${sucesso} serviços criados, ${erros} erros.`)
  return { sucesso, erros }
}

// Função para verificar e popular apenas serviços que não existem
export async function popularServicosSeNaoExistem(): Promise<{ novos: number; total: number; mensagem: string }> {
  const { buscarTodosServicos } = await import('./servicos')
  
  try {
    const servicosExistentes = await buscarTodosServicos()
    const nomesExistentes = new Set(servicosExistentes.map(s => s.nome))

    let novos = 0
    let erros = 0
    for (const servico of todosServicos) {
      if (!nomesExistentes.has(servico.nome)) {
        try {
          await criarServico({
            nome: servico.nome,
            preco: servico.preco,
            categoria: servico.categoria,
            subcategoria: servico.subcategoria,
            ativo: true,
            ordem: parseInt(servico.id),
          })
          console.log(`✓ Novo serviço criado: ${servico.nome}`)
          novos++
        } catch (error) {
          console.error(`✗ Erro ao criar serviço ${servico.nome}:`, error)
          erros++
        }
      }
    }

    const mensagem = novos === 0 
      ? 'Todos os serviços já existem no banco de dados.' 
      : `${novos} novos serviços criados${erros > 0 ? `, ${erros} erros` : ''}.`
    
    console.log(mensagem)
    
    return {
      novos,
      total: todosServicos.length,
      mensagem
    }
  } catch (error) {
    console.error('Erro ao verificar serviços existentes:', error)
    throw error
  }
}

