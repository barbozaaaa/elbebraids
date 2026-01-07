# Troubleshooting - Erros no Deploy do Vercel

## Como Verificar Erros de Deploy

1. **Acesse o Dashboard do Vercel**
   - Vá para [vercel.com](https://vercel.com)
   - Faça login na sua conta
   - Selecione o projeto `elbebraids`

2. **Verifique os Deployments**
   - Clique em "Deployments" no menu lateral
   - Veja o status do último deploy
   - Se houver erro, clique no deploy para ver os detalhes

3. **Verifique os Logs de Build**
   - No detalhe do deploy, role até "Build Logs"
   - Procure por mensagens de erro em vermelho
   - Os erros mais comuns são:
     - Erros de TypeScript
     - Variáveis de ambiente faltando
     - Problemas com dependências

## Problemas Comuns e Soluções

### 1. Erro: "Build Failed"
**Causa:** Erro de compilação TypeScript ou JavaScript
**Solução:** 
- Verifique os logs de build no Vercel
- Execute `npm run build` localmente para reproduzir o erro
- Corrija os erros e faça commit novamente

### 2. Erro: "Environment Variables Missing"
**Causa:** Variáveis de ambiente não configuradas no Vercel
**Solução:**
1. No dashboard do Vercel, vá em "Settings" > "Environment Variables"
2. Adicione as seguintes variáveis:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCMQVpQnR5ogSVpNZHczQmneDGwFG8dECA
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=elbe-braids.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=elbe-braids
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=elbe-braids.firebasestorage.app
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=792896168742
   NEXT_PUBLIC_FIREBASE_APP_ID=1:792896168742:web:93e568fe5e04ce69ec97e7
   ```
3. Faça um novo deploy

### 3. Erro: "Module not found"
**Causa:** Dependência faltando no package.json
**Solução:**
- Verifique se todas as dependências estão no `package.json`
- Execute `npm install` localmente
- Faça commit do `package-lock.json` atualizado

### 4. Erro: "Build Timeout"
**Causa:** Build demorando muito
**Solução:**
- Verifique se há loops infinitos no código
- Otimize imports e dependências
- Considere aumentar o timeout nas configurações do Vercel

## Forçar Novo Deploy

Se o deploy não iniciar automaticamente:

1. **Via Dashboard:**
   - Vá em "Deployments"
   - Clique nos três pontos (...) do último deploy
   - Selecione "Redeploy"

2. **Via Git:**
   - Faça um commit vazio:
     ```bash
     git commit --allow-empty -m "Trigger redeploy"
     git push
     ```

## Verificar Status do Build Localmente

Antes de fazer push, sempre teste o build localmente:

```bash
npm run build
```

Se o build local funcionar, o build no Vercel também deve funcionar.

## Contato

Se os problemas persistirem:
1. Verifique os logs completos no Vercel
2. Compare com o build local
3. Entre em contato com o suporte do Vercel se necessário

