// une as informações de todas as rotas em um só local para mais fácil compreensão 
// e distribuição das variáveis pelo código
const talkers = require('./talkers');
const login = require('./login');

module.exports = {
  talkers,
  login,
};