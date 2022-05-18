const express = require('express');
const crypto = require('crypto'); // lib de criação de token
// trás os middlewares de verificação de email e senha
const { verifyEmail, verifyPassword } = require('../middlewares/index');

const rotas = express.Router(); // estbelece que irá utilizar rotas

// passando pelas verificações exibe/passa o token gerado a pessoa usuaria ou que vai
// utilizar a api
rotas.post('/', verifyEmail, verifyPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
});

module.exports = rotas;