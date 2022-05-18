const validadeAge = (req, _res, next) => {
  const { age } = req.body;

  if (!age || age === '' || Number.isInteger(age) === false) {
    const errorObj = { status: 400, message: 'O campo "age" é obrigatório' };
    throw errorObj;
  }

  if (Number(age) >= 18) {
    return next();
  }
  const errorObj = { status: 400, message: 'A pessoa palestrante deve ser maior de idade' };
  throw errorObj;
};

module.exports = validadeAge;