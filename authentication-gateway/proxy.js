const httpProxy = require('express-http-proxy');
const express = require('express');
const axios = require('axios');
const app = express();

module.exports = (config) => {
    
    const auth = require('./Authentication')(config);
    const log = config.log();
        
    async function selectProxyHost(req) {
        const { service, version} = req.params;
        const response = await axios.get(`http://localhost:3000/find/${service}/${version}`);
    
        return `http://${response.data.ip}:${response.data.port}`;
    }
    
    app.post('/authentication', async (req, res, next) => {
        const response = await axios.get(`http://localhost:3000/find/authentication-service/1`);
        const service = `http://${response.data.ip}:${response.data.port}`;
        console.log('#################' + service);
        httpProxy(service)(req, res, next);
    });
    
    app.use('/:service/:version/', auth.authorization, async (req, res, next) => {
        const service = await selectProxyHost(req);
        httpProxy(service)(req, res, next);
    });

    app.listen(5000, () => {
        console.log('API Gateway Running');
    });
}
