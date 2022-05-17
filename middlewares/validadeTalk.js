const validadeKeys = (talk, res) => {
  const keys = Object.keys(talk);
  
  if (keys.length !== 2) {
    console.log('entrei no if keys');
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
};

const validadeDate = (arr) => {
  if (arr[0].length === 2 && arr[1].length === 2 && arr[2].length === 4) {
    return true;
  }
  return false;
};

const validadewatchedAt = (talk, res) => {
  console.log('data', talk.watchedAt);
  if (talk.watchedAt === undefined) {
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }

  const arrFormat = talk.watchedAt.split('/');
  if (validadeDate(arrFormat) === false) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
};

const validadeRate = (talk, res) => {
  if (talk.rate === '') {
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  console.log(Number(talk.rate) < 1);
  if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
};

const validadeTalk = (req, res, next) => {
  const { talk } = req.body;

  if (talk === undefined || talk === '') {
    console.log('entrei no if geral');
    return res.status(400).json({ message: 
      'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios' });
  }
  validadeKeys(talk, res);
  validadewatchedAt(talk, res);
  validadeRate(talk, res);

  if (talk.watchedAt && talk.rate) {
    return next();
  }
};

module.exports = validadeTalk;