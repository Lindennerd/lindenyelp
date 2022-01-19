var serviceRegistry = require('../service-registry/bin/run');
var commentaryService = require('../services/commentary/bin/run');

serviceRegistry();
commentaryService();