const verifyEmail = (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
    const verify = email.split('');
    const verify2 = email.split('.');
  
    if (verify.includes('@') && verify.includes('.') && verify2.includes('com')) {
      return next();
    } 
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
};

module.exports = verifyEmail;