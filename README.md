# 🛒 Sistema de Gestão de Produtos

Este é um sistema de **gestão de produtos** desenvolvido com **Angular 16** no frontend e **Spring Boot 3.4.4** no backend. A aplicação permite o gerenciamento de produtos, com funcionalidades de cadastro e listagem de informações relacionadas.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:** Angular 16  
- **Backend:** Spring Boot 3.4.4 (Java)

---

## 📦 Funcionalidades

### Cadastro de Produto:
- Nome
- Estoque
- Valor
- Cidade
- Tipo (Novo, Usado)
- Fabricante

### Cadastro Auxiliar:
- Tipo (Novo, Usado)
- Fabricante
- Cidade
- Estado

---

## 🧪 Como Executar o Projeto

### 🔧 Backend (Spring Boot)

1. Certifique-se de ter o **Java 17+** e o **Maven** instalados.
2. Navegue até a pasta do projeto backend:
   ```bash
   cd backend
   ```
3. Execute o projeto:
   ```bash
   ./mvnw spring-boot:run
   ```
   Ou:
   ```bash
   mvn spring-boot:run
   ```

> O backend estará rodando por padrão em: `http://localhost:8080`

---

### 🌐 Frontend (Angular)

1. Certifique-se de ter o **Node.js** e o **Angular CLI** instalados.
2. Navegue até a pasta do projeto Angular:
   ```bash
   cd frontend
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   ng serve
   ```

> O frontend estará disponível em: `http://localhost:4200`

---

## 📌 Observações

- O frontend e backend se comunicam via API REST.
- Certifique-se de que o backend esteja rodando antes de acessar funcionalidades que dependem de dados persistidos.
