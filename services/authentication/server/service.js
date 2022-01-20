const express = require('express');
const Authentication = require('./lib/Authentication');

const service = express();

module.exports = (config) => {
    const log = config.log();
    const auth = new Authentication(config);

    service.post('/login', async (req, res, next) => {
        const { user, password } = req.body;
        const result = await auth.login(user, password);

        if (result.auth) res.status(200).send(result);
        else res.status(500).send('Login inválido!');
    });

    service.get('/logout', (req, res, next) => {
        res.status(200).send({ auth: false, token: null });
    })

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