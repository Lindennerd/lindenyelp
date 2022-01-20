const bunyan = require('bunyan');
const pjs = require('../package.json');

const { name, version } = pjs;

const getLogger = (serviceName, serviceVersion, level) => bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

module.exports = {
    development: {
        secret: 'dev-key',
        log: () => getLogger(name, version, 'debug')
    },
    production: {
        secret: 'prd-key',
        log: () => getLogger(name, version, 'info')
    }
};