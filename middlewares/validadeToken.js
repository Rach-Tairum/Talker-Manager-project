const validadeToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization !== '' || authorization !== undefined) {
    return next();
  }
  if (authorization.length !== 16) {
    return res.status(401).json({ message: 'Token inválido' });
  }

  return res.status(401).json({ message: 'Token não encontrado' });
};

module.exports = validadeToken;