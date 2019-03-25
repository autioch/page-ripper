const qbLog = require('qb-log')('simple');
const setupDb = require('../db');
const express = require('express');
const bodyParser = require('body-parser');
const {
  // setupErrors,
  setupControllers,
  setupStatic
} = require('./src');

async function setupServer(config) {
  const { dbPath, port } = config;
  const { db } = await setupDb(dbPath);

  qbLog.info('Setting up server...');

  const app = express();

  setupStatic(app);

  /* Required for body content */
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  /* Log all requests in the console. */
  app.all('*', (req, res, next) => { // eslint-disable-line no-unused-vars
    qbLog.info(req.url);
    next();
  });

  setupControllers(app, db);

  // setupErrors(app);

  qbLog.info('Backend application ready.');

  app.listen(port, () => qbLog.info(`Listening on PORT ${port}`));
}

module.exports = setupServer;

if (require.main === module) {
  const config = require('./config');

  setupServer(config);
}
