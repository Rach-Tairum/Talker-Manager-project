const validadeToken = (req, _res, next) => {
  const { authorization } = req.headers; // trás o token de autorização via headers
  const allHeaders = Object.keys(req.headers); // busca as chaves de headers

  if (!allHeaders.includes('authorization')) { // verifica se a autorização foi passada, ou seja, se a chave authorization existe
    const errorObj = { status: 401, message: 'Token não encontrado' };
    throw errorObj;
  }
  // verifica se o token foi passado junto da autorização e se ele possui 16 caracteres
  // dessa forma tornando o token válido
  if (authorization !== '' && authorization !== undefined && authorization.length === 16) {
    return next();
  }
  const errorObj = { status: 401, message: 'Token inválido' };
  throw errorObj;
};

module.exports = validadeToken;