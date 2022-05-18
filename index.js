const express = require('express');
const bodyParser = require('body-parser');
const { talkers, login } = require('./routes/index'); // importa rotas de login e talkers
const { errorHandler } = require('./middlewares/index'); // importa middleware que lida e apresenta os erros 

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.use('/talker', talkers); // rota dos palestrantes

app.use('/login', login); // rota de login do usuário

app.use(errorHandler); // middleware de erro

app.listen(PORT, () => {
  console.log('Online');
});
