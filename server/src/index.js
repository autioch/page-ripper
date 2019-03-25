const setupControllers = require('./controllers');
const setupStatic = require('./static');
const setupErrors = require('./errors');

module.exports = {
  setupStatic,
  setupControllers,
  setupErrors
};
