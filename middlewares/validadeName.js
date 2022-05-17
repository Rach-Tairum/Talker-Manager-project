const validadeName = (req, res, next) => {
  const { name } = req.body;

  if (!name || name === '') {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length > 0 && name.length >= 3) {
    return next();
  }

  return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
};

module.exports = validadeName;