const validadeKeys = (talk) => { 
  const keys = Object.keys(talk);
  
  if (keys.length !== 2) { // verifica se o objeto foi passado com as duas chaves necessárias
    // objeto de erro capturado pelo error handler
    // 400 = Bad Request
    const errorObj = { 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
    throw errorObj;
  }
};

const validadeDate = (arr) => { // validação se a data tem dia, mes e ano
  // valida se o dia possui 2 digitos, o mes dois digitos e o ano 4 digitos
  if (arr[0].length === 2 && arr[1].length === 2 && arr[2].length === 4) {
    return true;
  }
  return false;
};

const validadewatchedAt = (talk) => {
  if (talk.watchedAt === undefined) { // verifica se o campo foi passado mas está vazio
    // objeto de erro capturado pelo error handler. 400 = Bad Request
    const errorObj = { 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
    throw errorObj;
  }
  const arrFormat = talk.watchedAt.split('/'); // separa a data em  um array de 3 posições: dia, mes e ano
  // verifica se o array tem as 3 posições se não ele só teria dia ou mes ou ano ou uma combinação de dois deles
  // valida também a constituição da data
  if (arrFormat.length < 3 || validadeDate(arrFormat) === false) {
    const errorObj = { 
      status: 400, // 400 = Bad Request
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    };
    throw errorObj;
  }
};

const validadeRate = (talk) => {
  if (talk.rate === '') { // verifica se o campo foi passado mas está vazio
    // objeto de erro capturado pelo error handler. 400 = Bad Request
    const errorObj = { 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
    throw errorObj;
  }
  // verifica se a nota dada foi entre 1 e 5
  if (Number(talk.rate) < 1 || Number(talk.rate) > 5) {
    // objeto de erro capturado pelo error handler. 400 = Bad Request
    const errorObj = { 
      status: 400, 
      message: 'O campo "rate" deve ser um inteiro de 1 à 5',
    };
    throw errorObj;
  }
};

const validadeTalk = (req, _res, next) => {
  const { talk } = req.body;

  if (talk === undefined || talk === '') { // verifica se o objeto foi passado e se está vazio
    // objeto de erro capturado pelo error handler. 400 = Bad Request
    const errorObj = { 
      status: 400, 
      message: 'O campo "talk" é obrigatório e "watchedAt" e "rate" não podem ser vazios',
    };
    throw errorObj;
  }
  validadeKeys(talk); // verifica se o campo talk tem duas chaves, uma correspondente a data e outro a nota
  validadewatchedAt(talk); // validação da chave watcherAt que trabalha com a data
  validadeRate(talk); // valida a nota dada
  
  return next();
};

module.exports = validadeTalk;