const fs = require('fs');
const moment = require('moment');
const { rootPath } = require('../../config');

const fileName = `${rootPath}/log.txt`;
const timePrefix = () => `[${moment().format('HH:mm:ss')}]`;

// todo isn't this just ''.padEnd(prefixLength)?
const getIndent = (prefixLength) => new Array(prefixLength + 1).fill(null).map(() => ' ').join('');

/**
 * Appends message to the log file.
 * @param  {String} folderPath Path to log.txt.
 * @param  {String} message Text to be used.
 * @return {Undefined}      Nothing.
 */
module.exports = function log(...messages) {
  const prefix = timePrefix();
  const indent = getIndent(prefix.length + 1);
  const message = messages.join(`\n${indent}`);

  fs.appendFileSync(fileName, `${prefix} ${message}\n`); // eslint-disable-line no-sync
};
