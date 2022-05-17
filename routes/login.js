const express = require('express');
const crypto = require('crypto');
const { verifyEmail, verifyPassword } = require('../middlewares/index');

const rotas = express.Router();

rotas.post('/', verifyEmail, verifyPassword, (_req, res) => {
  const token = crypto.randomBytes(8).toString('hex');

  return res.status(200).json({ token });
});

module.exports = rotas;