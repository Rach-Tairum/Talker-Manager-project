const express = require('express');
const crypto = require('crypto');
const verifyEmail = require('../middlewares/verifyEmail');
const verifyPassword = require('../middlewares/verifyPassword');

const rotas = express.Router();

rotas.post('/', verifyEmail, verifyPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
});

module.exports = rotas;