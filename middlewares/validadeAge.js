const validadeAge = (req, _res, next) => {
  const { age } = req.body; // busca no corpo da requisição a idade passada

  if (!age || age === '' || Number.isInteger(age) === false) { // verifica se a idade foi passada ou se é um número inteiro
    const errorObj = { status: 400, message: 'O campo "age" é obrigatório' }; // objeto de erro capturado pelo error handler
    throw errorObj;
  }

  if (Number(age) >= 18) { // verifica se o palestrante é maior de idade
    return next(); 
  }
  const errorObj = { status: 400, message: 'A pessoa palestrante deve ser maior de idade' }; // objeto de erro capturado pelo error handler
  throw errorObj;
};

module.exports = validadeAge;