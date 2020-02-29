const { HTTP_STATUS: { SERVER_ERROR } } = require('../consts');
const qbLog = require('qb-log');

const controllers = [
  require('./post'),
  require('./image')
];

function appActionRegister(app, db) {
  return function registerAction(action) {
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
  };
}

function appControllerRegister(app, db) {
  const registerAction = appActionRegister(app, db);

  return function registerController(count, controller) {
    controller.forEach(registerAction);

    return count + controller.length;
  };
}

module.exports = function setupControllers(app, db) {
  const endpointCount = controllers.reduce(appControllerRegister(app, db), 0);

  qbLog.info(`Registered ${endpointCount} actions.`);
};
