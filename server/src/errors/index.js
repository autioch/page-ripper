const path = require('path');
const { HTTP_STATUS: { SERVER_ERROR } } = require('../consts');

const FILE_PATH = path.join(__dirname, './error.html');

function errorHandler(req, res) {
  res.status(SERVER_ERROR);
  res.sendFile(FILE_PATH);
}

module.exports = function setupErrors(app) {
  app.use(errorHandler);
};
