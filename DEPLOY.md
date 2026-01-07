# 🚀 Guia de Deploy - Vercel

## Pré-requisitos

- Conta no GitHub
- Conta no Vercel (pode criar com GitHub)
- Firebase configurado

## Passo 1: Inicializar Git e Fazer Push

Execute os seguintes comandos no terminal (na pasta do projeto):

```bash
# Inicializar repositório Git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit inicial
git commit -m "Initial commit - Elbe Braids site completo"

# Conectar ao repositório GitHub
git remote add origin https://github.com/barbozaaaa/elbebraids.git

# Renomear branch para main
git branch -M main

# Fazer push para GitHub
git push -u origin main
```

## Passo 2: Conectar no Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em "Sign Up" e faça login com sua conta GitHub
3. Clique em "Add New Project" ou "Import Project"
4. Selecione o repositório `barbozaaaa/elbebraids`
5. Clique em "Import"

## Passo 3: Configurar Variáveis de Ambiente

No Vercel, durante o setup, vá em "Environment Variables" e adicione:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCMQVpQnR5ogSVpNZHczQmneDGwFG8dECA
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elbe-braids.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=elbe-braids
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=elbe-braids.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=792896168742
NEXT_PUBLIC_FIREBASE_APP_ID=1:792896168742:web:93e568fe5e04ce69ec97e7
```

⚠️ **Importante:** Marque todas como "Production", "Preview" e "Development"

## Passo 4: Deploy

1. Clique em "Deploy"
2. Aguarde o build completar (2-3 minutos)
3. Você receberá uma URL tipo: `elbebraids-xxxxx.vercel.app`

## Passo 5: Acessar o Site

- Site: `https://sua-url.vercel.app`
- Admin: `https://sua-url.vercel.app/#adm`

## Atualizações Futuras

Para atualizar o site, basta fazer push:

```bash
git add .
git commit -m "Descrição das mudanças"
git push
```

O Vercel fará deploy automático! 🎉

## Configurar Domínio Customizado (Opcional)

1. No Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio
3. Configure o DNS conforme as instruções







