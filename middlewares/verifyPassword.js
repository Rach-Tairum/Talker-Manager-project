const verifyPassword = (req, _res, next) => {
  const { password } = req.body; // trás a seja digitada do body da requisição
  if (!password) { // verifica se a senha foi passada
    const errorObj = { status: 400, message: 'O campo "password" é obrigatório' };
    throw errorObj;
  }
    
  // verifica se a senha tem no mínimo 6 caracteres
  if (password.length >= 6) {
    return next();
  } 
  
  const errorObj = { status: 400, message: 'O "password" deve ter pelo menos 6 caracteres' };
  throw errorObj;
};

module.exports = verifyPassword;