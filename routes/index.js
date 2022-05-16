const express = require('express');
const fs = require('fs');

const routes = express.Router();
const file = fs.readFileSync('talker.json');
const talkers = JSON.parse(file);

routes.get('/', (_req, res) => {
  res.status(200).json(talkers);
});

routes.get('/:id', (req, res) => {
  const { id } = req.params;
  const result = talkers.find((talker) => talker.id === Number(id));
  if (result) return res.status(200).json(result);

  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = routes;