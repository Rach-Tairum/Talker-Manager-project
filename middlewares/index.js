// une as informações de todos os middlewares em um só local para mais fácil compreensão 
// e distribuição das variáveis pelo código
const verifyEmail = require('./verifyEmail');
const verifyPassword = require('./verifyPassword');
const validadeToken = require('./validadeToken');
const validadeName = require('./validadeName');
const validadeAge = require('./validadeAge');
const validadeTalk = require('./validadeTalk');
const errorHandler = require('./errorHandler');

module.exports = {
  verifyEmail,
  verifyPassword,
  validadeToken,
  validadeName,
  validadeAge,
  validadeTalk,
  errorHandler,
};