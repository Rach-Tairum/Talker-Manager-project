const express = require('express');
const fs = require('fs');
const { validadeToken, validadeName, validadeAge, validadeTalk } = require('../middlewares/index');

const routes = express.Router();
const fileName = 'talker.json';

routes.get('/', (_req, res) => {
  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file);
  res.status(200).json(talkers);
});

routes.get('/:id', (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file);

  const result = talkers.find((talker) => talker.id === Number(id));
  if (result) return res.status(200).json(result);

  res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

routes.use(validadeToken);

routes.post('/', validadeName, validadeAge, validadeTalk, (req, res) => {
  const { name, age, talk } = req.body;
  const file = fs.readFileSync(fileName);
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
  fs.writeFileSync(fileName, objTalker);
  return res.status(201).json(obj);
});

routes.put('/:id', validadeName, validadeAge, validadeTalk, (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file);
  const person = talkers.findIndex((index) => index.id === Number(id));

  if (person === -1) return res.status(404).json({ message: 'Talker not found' });
  const idContinue = talkers[person].id;
  talkers[person] = { id: idContinue, name, age, talk };

  const objTalker = JSON.stringify(talkers);
  fs.writeFileSync(fileName, objTalker);
  res.status(200).json(talkers[person]);
});

routes.delete('/:id', (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file);
  const person = talkers.findIndex((index) => index.id === Number(id));

  talkers.splice(person, 1);
  
  const objTalker = JSON.stringify(talkers);
  fs.writeFileSync(fileName, objTalker);
  res.status(204).end();
});
module.exports = routes;