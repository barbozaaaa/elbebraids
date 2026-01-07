import { NextResponse } from 'next/server'
import { popularServicosSeNaoExistem } from '@/lib/seed-servicos'

export async function POST() {
  try {
    const resultado = await popularServicosSeNaoExistem()
    return NextResponse.json({ 
      success: true, 
      message: 'Serviços populados com sucesso',
      resultado 
    })
  } catch (error) {
    console.error('Erro ao popular serviços:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'Erro ao popular serviços',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    )
  }
}

// Permitir GET também para facilitar
export async function GET() {
  return POST()
}




