#!/usr/bin/env node
const axios = require('axios');
const http = require('http');
const pjs = require('../package.json');

module.exports = (config) => {

  const log = config.log();
  const service = require('../server/service')(config);
  const server = http.createServer(service);
  server.listen(0);

  const { name, version } = pjs;

  server.on('listening', () => {
    const registerService = () => axios.put(`http://localhost:3000/register/${name}/${version}/${server.address().port}/${true}`);
    const unregisterService = () => axios.delete(`http://localhost:3000/register/${name}/${version}/${server.address().port}`);

    registerService();

    const interval = setInterval(registerService, 20000);
    const cleanup = async () => {
      clearInterval(interval);
      await unregisterService();
    };

    process.on('uncaughtException', async () => {
      await cleanup();
      process.exit(0);
    });

    process.on('SIGINT', async () => {
      await cleanup();
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      await cleanup();
      process.exit(0);
    });

    log.info(
      `Hi there! I'm listening on port ${server.address().port} in ${service.get('env')} mode.`,
    );
  });
}

// Important - a service should not have a fixed port but should randomly choose one
