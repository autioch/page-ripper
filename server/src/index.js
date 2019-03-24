const qbLog = require('qb-log');
const controllers = require('./controllers');
const setup = require('./setup');
const port = 9090;
const config = require('../config');

setup(controllers, config)
  .then((app) => app.listen(port, () => qbLog.info(`Listening on PORT ${port}`)));
