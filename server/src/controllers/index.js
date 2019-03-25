const qbLog = require('qb-log');

const controllers = [
  require('./post')
];

module.exports = function setupControllers(app, db) {
  const endpointCount = controllers.reduce((count, controller) => {
    controller.forEach((action) => {
      app[action.method](action.path, action.handler(db));
    });

    return count + controller.length;
  }, 0);

  qbLog.info(`Registered ${endpointCount} actions.`);
};
