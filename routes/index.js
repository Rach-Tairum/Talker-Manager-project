const express = require('express');
const fs = require('fs');

const routes = express.Router();

routes.get('/', (_req, res) => {
  const talkers = fs.readFileSync('talker.json');
  const talk = JSON.parse(talkers);
  res.status(200).json(talk);
});

module.exports = routes;