# Configuração do Firebase

## Passo a Passo

### 1. Criar Projeto no Firebase

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Preencha o nome do projeto (ex: "elbe-braids")
4. Siga as instruções para criar o projeto

### 2. Configurar Firestore Database

1. No menu lateral, vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Começar no modo de teste" (para desenvolvimento)
4. Selecione a localização do servidor (ex: southamerica-east1 para Brasil)
5. Clique em "Ativar"

### 3. Configurar Regras de Segurança

No Firestore, vá em "Regras" e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permitir leitura e escrita para agendamentos
    match /agendamentos/{document=**} {
      allow read, write: if true; // Em produção, adicione autenticação
    }
    
    // Permitir leitura pública para serviços, escrita apenas para admins
    match /servicos/{document=**} {
      allow read: if true; // Todos podem ler serviços
      allow write: if true; // Em produção, adicione autenticação de admin
    }
  }
}
```

**⚠️ IMPORTANTE:** Para produção, você deve adicionar autenticação adequada!

### 4. Obter Credenciais

1. No Firebase Console, vá em "Configurações do projeto" (ícone de engrenagem)
2. Role até "Seus aplicativos"
3. Clique no ícone `</>` (Web)
4. Registre o app com um nome (ex: "Elbe Braids Web")
5. Copie as credenciais que aparecerem

### 5. Configurar Variáveis de Ambiente

1. Crie um arquivo `.env.local` na raiz do projeto
2. Copie o conteúdo de `.env.local.example`
3. Preencha com suas credenciais do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key_aqui
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_projeto_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 6. Instalar Dependências

```bash
npm install
```

### 7. Estrutura do Banco de Dados

O sistema utiliza duas coleções principais no Firestore:

#### Coleção: `agendamentos`

Estrutura de cada documento:

```typescript
{
  nome: string
  telefone: string
  email?: string
  data: string
  horario: string
  servico?: string
  servicoId?: string
  preco?: string
  observacoes?: string
  status: 'pendente' | 'confirmado' | 'cancelado' | 'concluido'
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

#### Coleção: `servicos`

Estrutura de cada documento:

```typescript
{
  nome: string
  preco: string
  categoria: string          // Ex: 'Masculina' | 'Feminina'
  subcategoria: string       // Ex: 'Básica' | 'Simetria' | 'Box Braids' | 'Fulani' | etc.
  ativo?: boolean            // Default: true
  ordem?: number             // Para ordenação
  descricao?: string         // Opcional: descrição do serviço
  createdAt: Timestamp
  updatedAt: Timestamp
}
```

### 8. Popular Banco de Dados com Serviços

Para popular o banco de dados com os serviços iniciais:

#### Em Desenvolvimento (Local):
1. Acesse o painel administrativo: `http://localhost:3000/#adm`
2. Clique no botão **"Popular Serviços no Banco"** na seção "Banco de Dados"
3. Isso criará todos os 19 serviços iniciais no Firestore
4. Serviços que já existem não serão duplicados

#### Em Produção (Vercel):
1. Acesse: `https://seu-dominio.vercel.app/#adm`
2. Clique no botão **"Popular Serviços no Banco"** na seção "Banco de Dados"
3. Ou acesse a API route: `https://seu-dominio.vercel.app/api/popular-servicos`

**📄 Veja mais detalhes em:** `POPULAR_BANCO.md`

### 9. Acessar o Painel Admin

Após configurar tudo, acesse:
```
http://localhost:3000/#adm
```

## Funcionalidades do Admin

- ✅ Visualizar todos os agendamentos
- ✅ Filtrar por status (Pendente, Confirmado, Cancelado, Concluído)
- ✅ Buscar por nome, telefone ou serviço
- ✅ Atualizar status dos agendamentos
- ✅ Deletar agendamentos
- ✅ Ver estatísticas em tempo real
- ✅ Popular banco de dados com serviços iniciais

## Funções Disponíveis no Código

### Agendamentos (`lib/agendamentos.ts`)
- `criarAgendamento()` - Criar novo agendamento
- `buscarAgendamentos()` - Buscar todos os agendamentos
- `buscarAgendamentosPorStatus()` - Filtrar por status
- `buscarAgendamentosPorData()` - Filtrar por data
- `atualizarStatusAgendamento()` - Atualizar status
- `deletarAgendamento()` - Deletar agendamento

### Serviços (`lib/servicos.ts`)
- `buscarTodosServicos()` - Buscar todos os serviços (com fallback para dados estáticos)
- `buscarServicoPorId()` - Buscar serviço por ID
- `buscarServicoPorSlug()` - Buscar serviço por slug
- `buscarServicosPorCategoria()` - Filtrar por categoria
- `buscarServicosPorSubcategoria()` - Filtrar por categoria e subcategoria
- `criarServico()` - Criar novo serviço
- `atualizarServico()` - Atualizar serviço
- `deletarServico()` - Soft delete (marca como inativo)
- `deletarServicoPermanentemente()` - Deletar permanentemente

### Popular Serviços (`lib/seed-servicos.ts`)
- `popularServicos()` - Popular todos os serviços (pode criar duplicados)
- `popularServicosSeNaoExistem()` - Popular apenas serviços que não existem

## Próximos Passos (Opcional)

- Adicionar autenticação para proteger o painel admin
- Adicionar notificações por e-mail/WhatsApp
- Exportar dados para CSV/Excel
- Adicionar calendário visual
- Criar interface admin para gerenciar serviços (CRUD completo)




