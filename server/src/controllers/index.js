const { HTTP_STATUS: { SERVER_ERROR } } = require('../consts');
const qbLog = require('qb-log');

const controllers = [
  require('./post'),
  require('./image')
];

module.exports = function setupControllers(app, db) {
  const endpointCount = controllers.reduce((count, controller) => {
    controller.forEach((action) => {
      const withDb = action.handler(db);

      app[action.method](action.path, async (req, res) => {
        try {
          await withDb(req, res);
        } catch (err) {
          res.status(SERVER_ERROR).send({
            error: err.message
          });
        }
      });
    });

    return count + controller.length;
  }, 0);

  qbLog.info(`Registered ${endpointCount} actions.`);
};
