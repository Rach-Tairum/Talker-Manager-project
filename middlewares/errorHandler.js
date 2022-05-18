// desenvolve middleware de erro, precisa que tenha os 4 parâmetros ou o 
// express entende ele como um middlaware comum e quebra a aplicação
// error.status - pega os status dos erros que estão sendo "jogados"
// error.message - pega a mensagem de erro que está sendo "jogada".
const errorHandler = (error, _req, res, _next) => {
  res.status(error.status).json({ message: error.message });
};

module.exports = errorHandler;