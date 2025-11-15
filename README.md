Sistema de Cadastro de Livros – Biblioteca Escolar

Este projeto é um sistema web desenvolvido para gerenciar o cadastro de livros em uma biblioteca escolar. O objetivo é permitir que usuários registrem, visualizem, editem e excluam livros de forma simples e eficiente. O sistema foi construído com frontend completo e estilizado, backend funcional com API REST e banco de dados conectado e operante.

Funcionalidades

O sistema permite cadastrar novos livros, listar todos os livros cadastrados, buscar informações de um livro específico, atualizar dados existentes e excluir registros. Cada livro contém os campos id, título, autor, ano, gênero e quantidade.

Tecnologias Utilizadas

As tecnologias utilizadas podem variar conforme a implementação final, porém a estrutura geral inclui frontend em HTML, CSS e JavaScript ou framework equivalente, backend em Node.js com Express ou tecnologia similar e banco de dados relacional ou não relacional como MySQL, PostgreSQL, SQLite ou MongoDB.

Estrutura do Projeto

O projeto está organizado em pastas separadas para frontend, backend e scripts de banco de dados. O frontend contém toda a interface do usuário e arquivos de estilo. O backend inclui as rotas da API, controllers, serviços e configuração de conexão com o banco. O banco de dados possui os scripts para criação das tabelas ou coleções necessárias.

Endpoints da API

O backend fornece os seguintes endpoints:
POST /livros para cadastrar um livro
GET /livros para listar todos os livros
GET /livros/:id para buscar um livro pelo ID
PUT /livros/:id para atualizar um livro
DELETE /livros/:id para remover um livro

Como Executar o Projeto

Para executar o projeto, instalar as dependências do backend com o gerenciador de pacotes correspondente e configurar a conexão com o banco de dados no arquivo apropriado. Em seguida, iniciar o servidor backend. No frontend, basta abrir o arquivo principal no navegador ou usar um servidor local simples. Certifique-se de que o backend esteja em execução para que o frontend consiga acessar a API.

Objetivo

O objetivo deste projeto é fornecer um sistema funcional, simples e eficiente para o gerenciamento de livros de uma biblioteca escolar, servindo como base de estudos ou aplicação prática em ambientes educacionais.
