const fs = require('fs');
const moment = require('moment');
const { rootPath } = require('../../config');

/**
 * Appends message to the log file.
 * @param  {String} folderPath Path to log.txt.
 * @param  {String} message Text to be used.
 * @return {Undefined}      Nothing.
 */
module.exports = function log(...messages) {
  const prefix = `[${moment().format('HH:mm:ss')}]`;
  const indent = ' '.padEnd(prefix.length);
  const message = messages.join(`\n${indent}`);

  fs.appendFileSync(`${rootPath}/log.txt`, `${prefix} ${message}\n`); // eslint-disable-line no-sync
};
