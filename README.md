# Elbe Braids - Site do Salão de Tranças

Site moderno e responsivo para o salão de tranças Elebráids.

## 🚀 Começando

### Instalação

```bash
npm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

### Build para Produção

```bash
npm run build
npm start
```

## 📁 Estrutura do Projeto

- `/app` - Rotas e layouts do Next.js 14 (App Router)
- `/components` - Componentes React reutilizáveis
  - `Header.tsx` - Cabeçalho com logo e navegação
  - `Hero.tsx` - Seção hero principal
  - `Galeria.tsx` - Galeria de trabalhos realizados
  - `Catalogo.tsx` - Catálogo de serviços e preços
  - `AgendamentoForm.tsx` - Formulário de agendamento
  - `Admin.tsx` - Painel administrativo (acessível via `/#adm`)
  - `Footer.tsx` - Rodapé com informações de contato
- `/public` - Arquivos estáticos
  - `/galeria` - Imagens para a galeria (adicione aqui)

## 🎨 Cores

O site utiliza uma paleta de cores inspirada na logo, com tons de vinho/marrom:
- Wine 950 (background principal)
- Wine 900/800/700 (elementos secundários)
- Wine 600/500 (botões e destaques)
- Wine 50/100 (textos)

## 📝 Funcionalidades

- ✅ Hero section com call-to-action
- ✅ Galeria de trabalhos com filtros por categoria
- ✅ Catálogo completo de serviços e preços
- ✅ Formulário de agendamento responsivo
- ✅ Painel administrativo (acessível via `/#adm`)
- ✅ Links para Instagram e WhatsApp
- ✅ Design totalmente responsivo
- ✅ Header fixo com scroll

## 📱 Contatos

- Instagram: [@elbebraids](https://www.instagram.com/elbebraids/)
- WhatsApp: (11) 94669-4455

## 🚀 Deploy

Para fazer deploy no Vercel, consulte o arquivo `VERCEL_DEPLOY.md` para instruções detalhadas.

O projeto está configurado para deploy automático via GitHub. Basta fazer push para o repositório `barbozaaaa/elbebraids`.

## 📌 Configuração

### Adicionar Logo

**Adicione a logo do salão em `/public/logo.png`** para que ela apareça corretamente no header.

### Adicionar Imagens na Galeria

1. Coloque suas imagens na pasta `/public/galeria/`
2. Abra o arquivo `/components/Galeria.tsx`
3. No array `imagens`, adicione objetos com suas imagens:

```typescript
const imagens: Imagem[] = [
  { id: 1, src: '/galeria/box-braids-1.jpg', alt: 'Box Braids - Cliente 1', categoria: 'Box Braids' },
  { id: 2, src: '/galeria/fulani-1.jpg', alt: 'Fulani - Cliente 1', categoria: 'Fulani' },
  { id: 3, src: '/galeria/ghana-1.jpg', alt: 'Ghana Braids', categoria: 'Ghana' },
  // ... adicione quantas quiser
]
```

**Categorias disponíveis**: 'Box Braids', 'Fulani', 'Ghana', 'Simetria', 'Boho', 'Outros'

### Editar Catálogo de Serviços

Edite o arquivo `/components/Catalogo.tsx` para atualizar preços ou adicionar novos serviços.

