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

O sistema criará automaticamente uma coleção chamada `agendamentos` com a seguinte estrutura:

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

### 8. Acessar o Painel Admin

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

## Próximos Passos (Opcional)

- Adicionar autenticação para proteger o painel admin
- Adicionar notificações por e-mail/WhatsApp
- Exportar dados para CSV/Excel
- Adicionar calendário visual


