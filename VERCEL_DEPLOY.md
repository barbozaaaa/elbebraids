# Deploy no Vercel

## Passo a Passo

### 1. Fazer Push para o GitHub

```bash
# Se ainda não inicializou o git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Initial commit - Elbe Braids site"

# Adicionar o remote do GitHub
git remote add origin https://github.com/barbozaaaa/elbebraids.git

# Fazer push
git branch -M main
git push -u origin main
```

### 2. Conectar no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub
3. Clique em "Add New Project"
4. Importe o repositório `barbozaaaa/elbebraids`

### 3. Configurar Variáveis de Ambiente

No Vercel, durante o setup do projeto, adicione as seguintes variáveis de ambiente:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCMQVpQnR5ogSVpNZHczQmneDGwFG8dECA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elbe-braids.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=elbe-braids
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=elbe-braids.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=792896168742
NEXT_PUBLIC_FIREBASE_APP_ID=1:792896168742:web:93e568fe5e04ce69ec97e7
```

### 4. Configurar Build Settings

O Vercel detecta automaticamente projetos Next.js, mas verifique:

- **Framework Preset:** Next.js
- **Build Command:** `npm run build` (automático)
- **Output Directory:** `.next` (automático)
- **Install Command:** `npm install` (automático)

### 5. Deploy

Clique em "Deploy" e aguarde o processo concluir.

### 6. Acessar o Site

Após o deploy, você receberá uma URL tipo: `elbebraids.vercel.app`

### 7. Acessar o Painel Admin

Após o deploy, acesse: `https://sua-url.vercel.app/#adm`

## Atualizações Futuras

Para atualizar o site, basta fazer push para o repositório GitHub:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

O Vercel fará o deploy automático!

## Domínio Customizado (Opcional)

1. No dashboard do Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio customizado
3. Siga as instruções para configurar o DNS






