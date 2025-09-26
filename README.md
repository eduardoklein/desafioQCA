# Desafio API

API REST para gestão de Categorias, Produtos, Inventário e Transações de estoque, construída com:

- Node.js + TypeScript
- Express
- Prisma (SQLite)
- Arquitetura em camadas (controllers, services, repositories)
- Tratamento consistente de erros via `ApiError`
- Transações atômicas em operações críticas

## Sumário

- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Scripts NPM](#scripts-npm)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Banco de Dados](#banco-de-dados)
- [Erros e Convenção de Respostas](#erros-e-convenção-de-respostas)
- [Rotas](#rotas)
  - [Health](#health)
  - [Categorias](#categorias)
  - [Produtos](#produtos)
  - [Inventário / Transações (exemplo sugerido)](#inventário--transações-exemplo-sugerido)
- [Exemplos de Uso (curl)](#exemplos-de-uso-curl)

---

## Pré-requisitos

- Node.js >= 18
- NPM >= 9
- (Opcional) VS Code + extensão Prisma
- SQLite (embutido)

## Instalação

```bash
git clone <repo-url> desafio
cd desafio
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Servidor: http://localhost:3000

## Scripts NPM

```bash
npm run dev       # Desenvolvimento
npm run build     # Compila para dist/
npm start         # Executa build
npm run prisma:generate
npm run prisma:studio
```

## Estrutura de Pastas

```
src/
  controllers/
  services/
  repository/
  routes/
  middlewares/
  utils/
  lib/ (prismaClient.ts)
prisma/
  schema.prisma
.env
```

## Banco de Dados

- Prisma + SQLite
- Models: Category, Product, Inventory, Transaction
- Unicidade: Category.name, Product.sku
- Relacionamentos:
  - Product -> Category (N:1)
  - Inventory -> Product (1:1)
  - Transaction -> Product (N:1)

Criar/atualizar schema:

```bash
npx prisma db push
```

(ou migrações futuras com `npx prisma migrate dev`)

## Erros e Convenção de Respostas

Erro padrão:

```json
{
  "error": {
    "code": "CATEGORY_NOT_FOUND",
    "message": "Categoria não encontrada."
  }
}
```

Exemplos de códigos: CATEGORY_NOT_FOUND, CATEGORY_ALREADY_EXISTS, CATEGORY_HAS_PRODUCTS, INTERNAL_SERVER_ERROR.

## Rotas

### Get all categories

GET http://localhost:3000/categories

### Get category by ID

GET http://localhost:3000/categories/2

### Create a new category

POST http://localhost:3000/categories
Content-Type: application/json

{
"name": "Eletrónicos"
}

### Update category

PUT http://localhost:3000/categories/3
Content-Type: application/json

{
"name": "Comida"
}

### Delete category

DELETE http://localhost:3000/categories/6

### PRODUCTS

### Get all products

GET http://localhost:3000/products

### Get product by ID

GET http://localhost:3000/products/3

### Create a new product

POST http://localhost:3000/products
Content-Type: application/json

{
"name": "Bola de futebol",
"categoryId": 3,
"quantity": 10
}

### Delete product

DELETE http://localhost:3000/products/5

### INVENTORIES

### Get all inventories

GET http://localhost:3000/inventories/

### Get inventory by product ID

GET http://localhost:3000/inventories/4

### Register new quantity for a product in inventory

POST http://localhost:3000/inventories/in
Content-Type: application/json

{
"productId": 4,
"quantity": 50
}

### Update quantity for a product in inventory

POST http://localhost:3000/inventories/out
Content-Type: application/json

{
"productId": 4,
"quantity": 30
}

### TRANSACTIONS

### Get all transactions

GET http://localhost:3000/transactions/

Obs: se testado com a extensão Rest API só é necessário copiar o código acima em um arquivo http.

Tipos de transação esperados:

```json
{ "type": "entrada", "quantity": 5 }
{ "type": "saida", "quantity": 2 }
```

Transação entrada:

```json
{ "type": "entrada", "quantity": 10 }
```

## Exemplos de Uso (curl)

```bash
curl -s http://localhost:3000/health
curl -s -X POST http://localhost:3000/api/categories -H "Content-Type: application/json" -d '{"name":"Bebidas"}'
curl -s http://localhost:3000/api/categories
curl -s -X PUT http://localhost:3000/api/categories/1 -H "Content-Type: application/json" -d '{"name":"Bebidas Quentes"}'
curl -s -X DELETE http://localhost:3000/api/categories/1
```

## Tratamento de Erros

Middleware central identifica `ApiError` e responde com status apropriado.
