const validadeName = (req, _res, next) => {
  const { name } = req.body; // busca no corpo da requisição o nome passado;

  if (!name || name === '') { // verifica se o nome foi passado
    // objeto de erro capturado pelo error handler
    // 400 = Bad Request
    const errorObj = { status: 400, message: 'O campo "name" é obrigatório' };
    throw errorObj;
  }

  if (name.length > 0 && name.length >= 3) { // verifica se o nome tem no mínimo 3 letras
    return next();
  }

  // objeto de erro capturado pelo error handler
  // 400 = Bad Request
  const errorObj = { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
  throw errorObj;
};

module.exports = validadeName;