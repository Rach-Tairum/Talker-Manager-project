const validadeName = (req, _res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    const errorObj = { status: 400, message: 'O campo "name" é obrigatório' };
    throw errorObj;
  }

  if (name.length > 0 && name.length >= 3) {
    return next();
  }
  const errorObj = { status: 400, message: 'O "name" deve ter pelo menos 3 caracteres' };
  throw errorObj;
};

module.exports = validadeName;