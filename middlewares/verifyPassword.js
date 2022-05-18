const verifyPassword = (req, _res, next) => {
  const { password } = req.body;
  if (!password) {
    const errorObj = { status: 400, message: 'O campo "password" é obrigatório' };
    throw errorObj;
  }
    
    if (password.length >= 6) {
      return next();
    } 
    const errorObj = { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
    throw errorObj;
};

module.exports = verifyPassword;