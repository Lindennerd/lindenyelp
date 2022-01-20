const config = require('../config')[process.env.NODE_ENV || 'development'];

var serviceRegistry = require('../service-registry/bin/run');
var commentaryService = require('../services/commentary/bin/run');
var authenticationService = require('../services/authentication/bin/run');
var apiGateway = require('../authentication-gateway/proxy');

serviceRegistry(config);
commentaryService(config);
authenticationService(config);
apiGateway(config);