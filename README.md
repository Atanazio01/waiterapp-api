# WaiterApp API

API REST do **WaiterApp** — sistema de gestão de pedidos para restaurantes, desenvolvido durante o curso **JStack** do [Mateus Silva](https://github.com/maateusilva).

> Projeto de estudos. A arquitetura prioriza velocidade de aprendizado em vez de estrutura de produção (auth, camadas de validação, variáveis de ambiente, testes, etc. ficaram de fora por enquanto).

---

## Visão geral

Backend que atende o fluxo do WaiterApp:

- Gerenciar **categorias** e **produtos** (com upload de imagem)
- Criar e acompanhar **pedidos** por mesa
- Atualizar o status do pedido no fluxo da cozinha: `WAITING` → `IN_PRODUCTION` → `DONE`

URL base padrão: `http://localhost:3001`

---

## Stack

| Camada | Tecnologia |
| --- | --- |
| Runtime | Node.js (ESM) |
| Linguagem | TypeScript |
| HTTP | Express 5 |
| Banco | MongoDB + Mongoose |
| Uploads | Multer (disco) |
| Desenvolvimento | `tsx` + Nodemon |
| Build | `tsup` (esbuild) |

---

## Funcionalidades

- Endpoints para categorias, produtos e pedidos
- Upload de imagem de produto via multipart, servido em `/uploads`
- Ciclo de status do pedido com validação
- Listagem de produtos por categoria
- Build de produção rápido com bundler (`tsup`)

---

## Estrutura do projeto

```text
src/
├── index.ts                 # Bootstrap da app + conexão Mongo
├── router.ts                # Definição das rotas
├── utils/
│   └── dirname.ts           # Helper ESM para __dirname
└── app/
    ├── models/              # Schemas Mongoose
    └── useCases/            # Handlers por domínio
        ├── categories/
        ├── products/
        └── orders/
```

Os handlers ficam perto das rotas para clareza no curso — não é uma clean architecture / hexagonal completa.

---

## Pré-requisitos

- **Node.js** 22+ (recomendado)
- **Yarn** 1.x
- **MongoDB** rodando localmente em `mongodb://localhost:27017`

---

## Como começar

```bash
# Clonar
git clone git@github.com:Atanazio01/waiterapp-api.git
cd waiterapp-api

# Instalar
yarn install

# Servidor de desenvolvimento (hot reload)
yarn dev
```

API disponível em [http://localhost:3001](http://localhost:3001).

### Build de produção

```bash
yarn build   # gera o bundle em dist/ via tsup
yarn start   # node dist/index.js
```

Imagens enviadas ficam em `uploads/` e são expostas em `/uploads/<filename>`.

---

## Scripts

| Script | Descrição |
| --- | --- |
| `yarn dev` | Sobe o servidor de desenvolvimento com reload |
| `yarn build` | Gera o bundle em `dist/` |
| `yarn start` | Executa o build de produção |

---

## Referência da API

### Categorias

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/categories` | Lista categorias |
| `POST` | `/categories` | Cria categoria |
| `GET` | `/categories/:categoryId/products` | Lista produtos por categoria |

**Criar categoria** — `POST /categories`

```json
{
  "name": "Pizzas",
  "icon": "🍕"
}
```

### Produtos

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/products` | Lista produtos |
| `POST` | `/products` | Cria produto (`multipart/form-data`) |

**Criar produto** — `POST /products` (`multipart/form-data`)

| Campo | Tipo | Observação |
| --- | --- | --- |
| `image` | file | Imagem do produto |
| `name` | string | — |
| `description` | string | — |
| `price` | number | Enviado como campo de formulário |
| `category` | ObjectId | `_id` da categoria |
| `ingredients` | string | JSON em string, ex.: `[{"name":"Mussarela","icon":"🧀"}]` |

URL da imagem após o upload: `http://localhost:3001/uploads/<imagePath>`

### Pedidos

| Método | Endpoint | Descrição |
| --- | --- | --- |
| `GET` | `/orders` | Lista pedidos |
| `POST` | `/orders` | Cria pedido |
| `PATCH` | `/orders/:orderId` | Atualiza status |
| `DELETE` | `/orders/:orderId` | Cancela / remove pedido |

**Criar pedido** — `POST /orders`

```json
{
  "table": "3",
  "products": [
    { "product": "<productObjectId>", "quantity": 2 }
  ]
}
```

**Alterar status** — `PATCH /orders/:orderId`

```json
{
  "status": "IN_PRODUCTION"
}
```

Valores permitidos: `WAITING` | `IN_PRODUCTION` | `DONE`

---

## Configuração

Valores atuais (hardcoded no curso):

| Configuração | Valor |
| --- | --- |
| Porta | `3001` |
| URI do MongoDB | `mongodb://localhost:27017` |

Extrair isso para variáveis de ambiente (`.env`) é um próximo passo natural.

---

## Roadmap / limitações conhecidas

Atalhos intencionais pelo ritmo do curso — bons candidatos para evoluir depois:

- [ ] Configuração via variáveis de ambiente
- [ ] Validação de entrada (Zod / Joi)
- [ ] Autenticação e autorização
- [ ] Testes automatizados
- [ ] Logging estruturado e middleware de erros
- [ ] Atualização de pedidos em tempo real (WebSockets)
- [ ] Docker Compose para API + MongoDB

---

## Licença

MIT © [Atanazio01](https://github.com/Atanazio01)
