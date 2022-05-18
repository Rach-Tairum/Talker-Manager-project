const validadeName = (req, _res, next) => {
  const { name } = req.body; // busca no corpo da requisição o nome passado;

  if (!name || name === '') { // verifica se o nome foi passado
    const errorObj = { status: 400, message: 'O campo "name" é obrigatório' }; // objeto de erro capturado pelo error handler
    throw errorObj;
  }

  if (name.length > 0 && name.length >= 3) { // verifica se o nome tem no mínimo 3 letras
    return next();
  }
  const errorObj = { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' }; // objeto de erro capturado pelo error handler
  throw errorObj;
};

module.exports = validadeName;