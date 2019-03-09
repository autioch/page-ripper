const fs = require('fs');
const moment = require('moment');

/**
 * Appends message to the log file.
 * @param  {String} folderPath Path to log.txt.
 * @param  {String} message Text to be used.
 * @return {Undefined}      Nothing.
 */
module.exports = function log(folderPath, ...messages) {
  const currentTime = moment().format('HH:mm:ss');
  const offset = currentTime.length + 3; // eslint-disable-line no-magic-numbers
  const indent = new Array(offset).fill(null).map(() => ' ').join('');
  const message = messages.join(`\n${indent}`);

  fs.appendFileSync(`${folderPath}/log.txt`, `[${currentTime}] ${message}\n`); // eslint-disable-line no-sync
};
