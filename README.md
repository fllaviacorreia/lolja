# Lolja

## Descrição

Nesse repositório há três pastas contendo um sistema básico de compras de produtos, sendo a api(backend), o frontend web e mobile. A aplicação é simples e contém três entidades sendo elas: clients, products e purchases. De forma que essas entidades possuem funcionalidades como:

- Client: cadastrar, inativar, atualizar, buscar todos e por id.
- Product: cadastrar, inativar, atualizar, buscar todos e por id.
- Purchase: cadastrar, cancelar uma compra, buscar todas e por id.

## 📁 Estrutura do Backend

```
/backend
    /controllers  -> Responsável por gerenciar a interação entre o frontend e backend
    /repositories -> Responsável pela interação com o banco de dados
    /routes       -> Pasta com a definição das rotas das três entidades
    /services     -> Responsável por regras de negócio
    /config       -> Pasta contendo o schema do banco de dados e arquivo db.js para realizar a conexão
    /models       -> Contém a estrutura padrão das entidades do banco
    /validators   -> Responsável por validar os dados das entidades

```
## 🚀 Tecnologias Utilizadas

### Backend

- Node js
- Express
- PostgreSQL
- Nodemon
- Zod
- Docker
- Dotenv

## ✍ Utilização da API

Para rodar o projeto em sua máquina, siga as etapas abaixo:

1. Clone o repositório:
```
https://github.com/lusgaoliveira/lolja.git
```

2. Entre na pasta do projeto e logo em seguida o backend:
```
cd lolja
cd backend
```

3. Instale as dependências:
```
npm install
```

4. Configure as variáveis de ambiente (crie um arquivo .env dentro da pasta backend):
```
DB_HOST=localhost
DB_PORT=3216
DB_USER=user-products
DB_PASSWORD=2000
DB_NAME=db-products
```

5. Execute o comando abaixo para subir o banco de dados postgres, conectar no mesmo e criar todo o schema:
```
docker-compose up
```

6. Inicie o servidor:
```
npm start
```

## Licença
Este projeto está licenciado sob a Licença MIT.
