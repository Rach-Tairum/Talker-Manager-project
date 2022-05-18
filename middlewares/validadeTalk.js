const validadeKeys = (talk) => {
  const keys = Object.keys(talk);
  
  if (keys.length !== 2) {
    const errorObj = { 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
    throw errorObj;
  }
};

const validadeDate = (arr) => {
  if (arr[0].length === 2 && arr[1].length === 2 && arr[2].length === 4) {
    return true;
  }
  return false;
};

const validadewatchedAt = (talk) => {
  if (talk.watchedAt === undefined) {
    const errorObj = { 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
    throw errorObj;
  }

  const arrFormat = talk.watchedAt.split('/');
  if (arrFormat.length < 3 || validadeDate(arrFormat) === false) {
    const errorObj = { 
      status: 400, 
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
    throw errorObj;
  }
};

const validadeRate = (talk) => {
  if (talk.rate === '') {
    const errorObj = { 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
    throw errorObj;
  }
  if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    const errorObj = { 
      status: 400, 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
    throw errorObj;
  }
};

const validadeTalk = (req, _res, next) => {
  const { talk } = req.body;

  if (talk === undefined || talk === '') {
    const errorObj = { 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
    throw errorObj;
  }
  validadeKeys(talk);
  validadewatchedAt(talk);
  validadeRate(talk);

  if (talk.watchedAt && talk.rate) {
    return next();
  }
};

module.exports = validadeTalk;