const express = require('express');
const bodyParser = require('body-parser');

const config = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

app.use('/db', router);

app.listen(config.cacheService.port, () => {
  console.log('Escuchando en el puerto ', config.cacheService.port);
})
