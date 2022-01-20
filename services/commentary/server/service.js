const express = require('express');
const Commentary = require('./lib/Commentary');

const service = express();

module.exports = (config) => {
  const log = config.log();
  const commentary = new Commentary();

  service.get('/', (req, res, next) => {
    res.send('Hi There');
  });
  
  service.use((error, req, res, next) => {
    res.status(error.status || 500);
    // Log out the error to the console
    log.error(error);
    return res.json({
      error: {
        message: error.message,
      },
    });
  });

  return service;
}