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

routes.get('/search', validadeToken, (req, res) => {
  const { q } = req.query;
  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file);

  if (q === '' || q === undefined) return res.status(200).json(talkers);

  const arrFiltered = talkers.filter((talker) => talker.name.includes(q));

  res.status(200).json(arrFiltered);
});

routes.get('/:id', (req, res) => {
  const { id } = req.params;
  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file);

  const result = talkers.find((talker) => talker.id === Number(id));
  if (result) return res.status(200).json(result);

  const errorObj = { status: 404, message: 'Pessoa palestrante não encontrada' };
  throw errorObj;
});

routes.use(validadeToken);

routes.post('/', validadeName, validadeAge, validadeTalk, (req, res) => {
  const { name, age, talk } = req.body;
  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file);
  
  const lastPosition = talkers.length;
  const idNew = lastPosition + 1;

  const obj = {
    id: idNew,
    name,
    age,
    talk,
  };
  talkers.push(obj);
  const objTalker = JSON.stringify(talkers);
  fs.writeFileSync(fileName, objTalker);
  return res.status(201).json(obj);
});

routes.put('/:id', validadeName, validadeAge, validadeTalk, (req, res) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;

  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file);
  const person = talkers.findIndex((index) => index.id === Number(id));

  const errorObj = { status: 404, message: 'Talker not found' };
  if (person === -1) throw errorObj;

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