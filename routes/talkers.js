const express = require('express');
const fs = require('fs');

const routes = express.Router();

const validadeToken = require('../middlewares/validadeToken');
const validadeName = require('../middlewares/validadeName');
const validadeAge = require('../middlewares/validadeAge');
const validadeTalk = require('../middlewares/validadeTalk');

routes.get('/', (_req, res) => {
  const file = fs.readFileSync('talker.json');
  const talkers = JSON.parse(file);
  res.status(200).json(talkers);
});

routes.get('/:id', (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync('talker.json');
  const talkers = JSON.parse(file);

  const result = talkers.find((talker) => talker.id === Number(id));
  if (result) return res.status(200).json(result);

  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

routes.use(validadeToken);

routes.post('/', validadeName, validadeAge, validadeTalk, (req, res) => {
  const { name, age, talk } = req.body;
  const file = fs.readFileSync('talker.json');
  const talkers = JSON.parse(file);
  const newTalkers = [];
  const lastPosition = talkers.length;
  const idNew = lastPosition + 1;

  const obj = {
    id: idNew,
    name,
    age,
    talk,
  };
  newTalkers.push(obj);
  const objTalker = JSON.stringify(newTalkers);
  fs.writeFileSync('talker.json', objTalker);
  return res.status(201).json(obj);
});
module.exports = routes;