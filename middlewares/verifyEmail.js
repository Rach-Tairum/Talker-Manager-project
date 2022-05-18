const verifyEmail = (req, _res, next) => {
  const { email } = req.body; // busca o email no body da requisição
  if (!email) { // verifica se o email foi passado
    // objeto de erro capturado pelo error handler. 400 = Bad Request
    const errorObj = { status: 400, message: 'O campo "email" é obrigatório' };
    throw errorObj;
  }
    const verify = email.split(''); // separa letra por letra do email passado
    const verify2 = email.split('.'); // separa a partir do .

    // verifica se o email contem @algo.com, ou seja, é um email válido
    if (verify.includes('@') && verify.includes('.') && verify2.includes('com')) {
      return next();
    } 

    // objeto de erro capturado pelo error handler. 400 = Bad Request
    const errorObj = { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
    throw errorObj;
};

module.exports = verifyEmail;