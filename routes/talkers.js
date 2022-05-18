const express = require('express');
const fs = require('fs'); // lib do node responsavel por ler e escrever em arquivos
// trás os middlewares de verificação de token, nome, idade e palestra dos palestrantes
const { validadeToken, validadeName, validadeAge, validadeTalk } = require('../middlewares/index');

const routes = express.Router(); // estbelece que irá utilizar rotas
const fileName = 'talker.json'; // para evitar a repetição do nome do arquivo entre as funções

routes.get('/', (_req, res) => { // faz a leitura do arquivo dos palestrantes
  const file = fs.readFileSync(fileName);
  const talkers = JSON.parse(file); // necessário pois o arquivo vem em formato Json, assim transformamos ele pra o array original
  res.status(200).json(talkers); // reposta da API para q deu tudo certo. 200 = OK
});

routes.get('/search', validadeToken, (req, res) => { // seção da API para buscas no dB
  const { q } = req.query; // nome utilizado para busca na url
  const file = fs.readFileSync(fileName); // busca o arquivo
  const talkers = JSON.parse(file);

  // se nenhuma busca for realizada retorna o array completo
  // 200 = OK
  if (q === '' || q === undefined) return res.status(200).json(talkers);

  // busca no array o nome do palestrante de acordo com o que foi digitado
  const arrFiltered = talkers.filter((talker) => talker.name.includes(q)); 

  res.status(200).json(arrFiltered); // 200 = OK
});

routes.get('/:id', (req, res) => { // busca o palestrante de acordo com o sua identificação
  const { id } = req.params; // busca o id que foi passado na url
  const file = fs.readFileSync(fileName); // busca o arquivo
  const talkers = JSON.parse(file);

  const result = talkers.find((talker) => talker.id === Number(id)); // procura o palestrante que corresponde àquele id
  // se houver algum retorno, 200 = Ok, tudo certo! Retorna o objeto com as informações da pessoa palestrante
  if (result) return res.status(200).json(result);

  // 404 = Not Found
  const errorObj = { status: 404, message: 'Pessoa palestrante não encontrada' };
  throw errorObj;
});

routes.use(validadeToken); // valida token para todas as rotas  a partir daqui

// adiciona um novo palestrante
routes.post('/', validadeName, validadeAge, validadeTalk, (req, res) => {
  const { name, age, talk } = req.body; // busca as informações no body da requisição
  const file = fs.readFileSync(fileName); // busca arquivo
  const talkers = JSON.parse(file);
  
  // pega o id do ultima palestrante para q seja continuada a sequencia
  const lastPosition = talkers.length;
  const idNew = lastPosition + 1;

  const obj = { // objeto com todas as informações da pessoa palestrante
    id: idNew,
    name,
    age,
    talk,
  };
  talkers.push(obj); // adiciona palestrante ao array de palestrantes
  const objTalker = JSON.stringify(talkers);
  fs.writeFileSync(fileName, objTalker); // reescreve arquivo original com o novo palestrante
  return res.status(201).json(obj); // 201 = Created
});

// edita informações de algum palestrante 
routes.put('/:id', validadeName, validadeAge, validadeTalk, (req, res) => {
  const { id } = req.params; // busca o palestrante a ser editado através do id passado na url
  const { name, age, talk } = req.body; // busca as novas informações passadas no body da requisição

  const file = fs.readFileSync(fileName); // busca o arquivo de palestrantes
  const talkers = JSON.parse(file);
  // encontra o index do palestrante dentro do array
  // se o palestrante não for encontrado retorna a posição -1 que não existe 
  const person = talkers.findIndex((index) => index.id === Number(id)); 

  const errorObj = { status: 404, message: 'Talker not found' }; // 404 = Not Found
  if (person === -1) throw errorObj; 

  const idContinue = talkers[person].id;
  talkers[person] = { id: idContinue, name, age, talk }; // recria o objeto com as informações do palestrante

  const objTalker = JSON.stringify(talkers);
  fs.writeFileSync(fileName, objTalker); // reescreve arquivo original com o palestrante já editado
  res.status(200).json(talkers[person]); // 200 = Ok
});

// deleta algum palestrante e suas informações
routes.delete('/:id', (req, res) => {
  const { id } = req.params; // busca o palestrante a ser deletado através do id passado na url
  const file = fs.readFileSync(fileName); // busca o arquivo com os palestrantes
  const talkers = JSON.parse(file);

  // encontra o index do palestrante dentro do array
  // se o palestrante não for encontrado retorna a posição -1 que não existe
  const person = talkers.findIndex((index) => index.id === Number(id));

  const errorObj = { status: 404, message: 'Talker not found' }; // 404 = Not Found
  if (person === -1) throw errorObj;
  
  // retira do array original a pessoa correspondente àquela posição
  // caso fosse atribuido a uma constante, ela conteria as informações da pessoa removida
  talkers.splice(person, 1); 
  
  const objTalker = JSON.stringify(talkers);
  fs.writeFileSync(fileName, objTalker); // reescreve arquivo original com o palestrante já removido
  res.status(204).end(); // 204 = No Content e o end é para que a função seja interrompida e não gere um loop
});
module.exports = routes;