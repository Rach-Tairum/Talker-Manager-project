# Projeto Talker Manager! <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/TED_three_letter_logo.svg/1200px-TED_three_letter_logo.svg.png" alt="logo-ted" width="80"/>

O verdadeiro gerenciador de palestrantes do seu evento!

Neste projeto, criei uma api CRUD de palestrantes de um evento. Nele, é possivel adicionar um palestrante e seu tema de palestra, verificar todos os palestrantes, buscar por nome do palestrante, deletar uma entrada de palestrante e atualizar algum dado incorreto também!

Para esse projeto, somente não desenvolvi o banco de dados (arquivo talkers.json) e o docker-compose

---

# 🗣️ Sumário

- [Requisitos do projeto]

  - [1. Crie o endpoint GET `/talker`]
  - [2. Crie o endpoint GET `/talker/:id`]
  - [3. Crie o endpoint POST `/login`]
  - [4. Adicione as validações para o endpoint `/login`]
  - [5. Crie o endpoint POST `/talker`]
  - [6. Crie o endpoint PUT `/talker/:id`]
  - [7. Crie o endpoint DELETE `/talker/:id`]
  - [8. Crie o endpoint GET `/talker/search?q=searchTerm`]

---

## 🗣️ Habilidades desenvolvidas

Neste projeto, fui capaz de:

  - Utilizar o express para desenvolver uma aplicação Node.js;
  - Utilizar o Routes do express para criar rotas para a API;
  - Utilizar o módulo fs para ler e editar arquivos json;
  - Criar uma aplicação CRUD (Create, Read, Update, Delete);
  - Utilizar respostas com status HTTP;
  
---

## 🗣️ O que foi desenvolvido

Neste projeto foi desenvolvido uma aplicação de cadastro de talkers (palestrantes) em que é possível cadastrar, visualizar, pesquisar, editar e excluir informações.
Para isso desenvolvi:
  * Uma API de um `CRUD` (**C**reate, **R**ead, **U**pdate e **D**elete) de palestrantes (talkers);
  * Alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo `fs`;
