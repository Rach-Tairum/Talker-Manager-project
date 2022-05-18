const validadeToken = (req, _res, next) => {
  const { authorization } = req.headers;
  const allHeaders = Object.keys(req.headers);

  if (!allHeaders.includes('authorization')) {
    const errorObj = { status: 401, message: 'Token não encontrado' };
    throw errorObj;
  }

  if (authorization !== '' && authorization !== undefined && authorization.length === 16) {
    return next();
  }
  const errorObj = { status: 401, message: 'Token inválido' };
  throw errorObj;
};

module.exports = validadeToken;