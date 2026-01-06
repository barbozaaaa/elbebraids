# Como Popular o Banco de Dados no Vercel

Agora que as regras do Firebase estão configuradas, você precisa popular o banco de dados com os serviços iniciais.

## Opção 1: Via Painel Admin (Mais Fácil) ⭐

1. Acesse seu site no Vercel: `https://seu-dominio.vercel.app/#adm`
2. Você verá o Painel Administrativo
3. Role até a seção **"Banco de Dados"**
4. Clique no botão **"Popular Serviços no Banco"**
5. Aguarde a confirmação
6. Pronto! Os serviços foram criados no Firestore

## Opção 2: Via API Route

Se preferir usar uma chamada de API diretamente:

1. Acesse: `https://seu-dominio.vercel.app/api/popular-servicos`
2. Ou faça uma requisição POST/GET para essa URL
3. Isso executará o script de população

**Exemplo com curl:**
```bash
curl -X POST https://seu-dominio.vercel.app/api/popular-servicos
```

## Opção 3: Via Console do Navegador

1. Acesse qualquer página do seu site no Vercel
2. Abra o Console do Desenvolvedor (F12)
3. Execute:

```javascript
// Importar a função (pode demorar um pouco para carregar)
const { popularServicosSeNaoExistem } = await import('/lib/seed-servicos')
await popularServicosSeNaoExistem()
```

## Verificação

Após popular, verifique no Firebase Console:

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Selecione seu projeto `elbe-braids`
3. Vá em **Firestore Database**
4. Você deve ver:
   - Coleção `servicos` com 19 documentos
   - Coleção `agendamentos` (será criada quando houver agendamentos)

## Importante

- ✅ O script **não duplica** serviços - só cria os que não existem
- ✅ Você pode executar quantas vezes quiser sem problemas
- ✅ Se todos os serviços já existirem, você verá a mensagem: "Todos os serviços já existem no banco de dados."

## Próximos Passos

Depois de popular o banco, você pode:
- Ver os serviços diretamente no Firebase Console
- Gerenciar serviços via código usando as funções em `lib/servicos.ts`
- Os serviços aparecerão automaticamente no catálogo (se você atualizar o código para usar Firestore)



