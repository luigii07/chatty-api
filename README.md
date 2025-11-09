# Chatty API

API de um chat em tempo real, construído com Express e Socket.io.

## Descrição

Esta aplicação é o back-end para uma plataforma de chat. Usuários podem se registrar, conversar com outros usuários em tempo real, enviar imagens e personalizar seu perfil.

## Principais Tecnologias

- **Framework:** [Express](https://expressjs.com/)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **ORM:** [Mongoose](https://mongoosejs.com/)
- **Banco de Dados:** [Mongo](https://www.mongodb.com/) (utilizado com Mongoose)
- **Autenticação:** [JWT](https://jwt.io/) (JSON Web Tokens)
- **Upload de Arquivos:** [Clodinary](https://cloudinary.com/)
- **Comunicação em tempo real:** [Socket.io](https://socket.io/)
- **Validação:** [Zod](https://zod.dev/)

## Rotas da API (Endpoints)

A seguir, a lista de rotas disponíveis na API:

### Autenticação

- `POST /auth/signup`: Cadastra e autentica um novo usuário gerando um token de acesso.
  - Response:
    
    ```json
    {
    	"_id": "6910d552fffbce0553e7bef3",
    	"fullName": "User Name",
    	"email": "user@email.com",
    	"avatar": "",
    	"createdAt": "2025-11-09T17:54:27.087Z"
    }
    ```

- `POST /auth/login`: Autentica um usuário gerando um token de acesso.
  - Response:
    
    ```json
    {
    	"_id": "6910d552fffbce0553e7bef3",
    	"fullName": "User Name",
    	"email": "user@email.com",
    	"avatar": "https://res.cloudinary.com/<filename>",
    	"createdAt": "2025-11-04T14:43:36.090Z"
    }
    ```

- `GET /auth/check`: Verifica se o token de acesso está válido.
  - Response:
    
    ```json
    {
    	"_id": "6910d552fffbce0553e7bef3",
    	"fullName": "User Name",
    	"email": "user@email.com",
    	"avatar": "https://res.cloudinary.com/<filename>",
    	"createdAt": "2025-11-04T14:43:36.090Z"
    }
    ```

- `PUT /auth/update-profile`: Atualiza a foto de perfil do usuário.
  - Response:
    
    ```json
    {
    	"_id": "690a1118de7092e7e6b08e25",
    	"fullName": "User Name",
    	"email": "user@email.com",
    	"avatar": "https://res.cloudinary.com/<filename>",
    	"createdAt": "2025-11-04T14:43:36.090Z"
    }
    ```

- `POST /auth/logout`: Encerra a sessão do usuário.
  - Response:
    
    ```json
    {
  	    "message": "Logged out successfully"
    }
    ```

### Usuários

- `GET /users`: Lista todos os usuários do sistema, com exceção do próprio usuário logado.
  - Response:
    
    ```json
    
    [
    	{
    		"_id": "690a0d0998e7c4e0417727a1",
            "fullName": "User Name",
            "email": "user@email.com",
            "avatar": "https://res.cloudinary.com/<filename>",
    	},
    	{
    		"_id": "690a751188b54354e15b74eb",
            "fullName": "User Name",
            "email": "user@email.com",
            "avatar": "https://res.cloudinary.com/<filename>",
    	}
    ]
    ```

### Mensagens

- `GET /messages/:id`: Busca todas as mensagens de um conversa.
  - Response:
    
    ```json
    [
    	{
    		"_id": "690a5e225bffdf405a322efd",
    		"senderId": "690a1118de7092e7e6b08e25",
    		"receiverId": "690a0d0998e7c4e0417727a1",
    		"text": "Hello, how are you?",
    		"createdAt": "2025-11-04T20:12:18.398Z",
    		"updatedAt": "2025-11-04T20:12:18.398Z",
    		"__v": 0
    	},
    	{
    		"_id": "690a5fe45bffdf405a322f04",
    		"senderId": "690a0d0998e7c4e0417727a1",
    		"receiverId": "690a1118de7092e7e6b08e25",
    		"image": "https://res.cloudinary.com/<filename>",
    		"createdAt": "2025-11-04T20:19:48.601Z",
    		"updatedAt": "2025-11-04T20:19:48.601Z",
    		"__v": 0
    	}
    ]
    ```

- `POST /messages/send/:receiverId`: Envia uma nova mensagem para um usuário.
  - Response:
    
    ```json
    {
    	"senderId": "690a1118de7092e7e6b08e25",
    	"receiverId": "690a0d0998e7c4e0417727a1",
    	"text": "Hello, how are you?",
        "image": "https://res.cloudinary.com/<filename>",
    	"_id": "690a63643ad045cfb373e438",
    	"createdAt": "2025-11-04T20:34:44.999Z",
    	"updatedAt": "2025-11-04T20:34:44.999Z",
    	"__v": 0
    }
    ```

## Como Começar

Siga as instruções abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 18 ou superior)

### Instalação

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/luigii07/chatty-api.git
    cd chatty-api
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Configure o ambiente:**
    - Renomeie o arquivo `.env.example` para `.env`.
    - Preencha as variáveis de ambiente no arquivo `.env` com as suas configurações (banco de dados, chaves de segurança, etc.).

### Executando a Aplicação

- **Modo de desenvolvimento:**

  ```bash
  npm run dev
  ```

  A aplicação estará disponível em `http://localhost:<PORT>`.

- **Modo de produção:**

  ```bash
  npm build
  npm start
  ```