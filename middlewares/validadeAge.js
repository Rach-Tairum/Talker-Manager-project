const validadeAge = (req, res, next) => {
  const { age } = req.body;

  if (!age || age === '' || Number.isInteger(age) === false) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (Number(age) >= 18) {
    return next();
  }
  return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
};

module.exports = validadeAge;