const bunyan = require('bunyan');
const pjs = require('../package.json');

const { name, version } = pjs;

const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
    development: {
        secret: 'dev-key',
        serviceRegistry: 'http://localhost:3000',
        log: () => getLogger(name, version, 'debug')
    },
    production: {
        secret: 'prd-key',
        serviceRegistry: 'http://localhost:3000',
        log: () => getLogger(name, version, 'info')
    }
};