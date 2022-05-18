const verifyEmail = (req, _res, next) => {
  const { email } = req.body;
  if (!email) {
    const errorObj = { status: 400, message: 'O campo "email" é obrigatório' };
    throw errorObj;
  }
    const verify = email.split('');
    const verify2 = email.split('.');
  
    if (verify.includes('@') && verify.includes('.') && verify2.includes('com')) {
      return next();
    } 
    const errorObj = { status: 400, message: 'O "email" deve ter o formato "email@email.com"' };
    throw errorObj;
};

module.exports = verifyEmail;