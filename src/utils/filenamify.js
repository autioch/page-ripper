/*  eslint-disable no-control-regex */
const url = require('url');
const qbLog = require('qb-log');

qbLog({
  filenamify: {
    prefix: 'FILENAMIFY',
    formatter: qbLog._chalk.yellow // eslint-disable-line no-underscore-dangle
  }
});

const CONTROL = /[\u0000-\u001f\u0080-\u009f]/g;
const FORBIDDEN = /[<>:"/\\|?*\x00-\x1F]/g;
const RESERVED = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;
const WWW = /^www\./;
const EMPTY = '';

const PATH = '/';
const PATH_MULTIPLE = /\/{2,}/g;

const SAFE = '_';
const SAFE_MULTIPLE = /_{2,}/g;
const SAFE_TRIM = /^_|_$/g;

const MAX_LENGTH = 100;

const clean = (str) => unescape(str || EMPTY).replace(PATH_MULTIPLE, PATH);
const is = (item) => !!item;

module.exports = function filenamify(rawUrl) {
  try {
    const { hostname, port, pathname, search } = url.parse(rawUrl);
    const parts = [(hostname || EMPTY).replace(WWW, EMPTY), port, pathname, search];
    const simplifiedUrl = parts.map(clean).filter(is).join(SAFE);

    const fileName = simplifiedUrl
      .replace(FORBIDDEN, SAFE)
      .replace(CONTROL, SAFE)
      .replace(SAFE_MULTIPLE, SAFE)
      .replace(SAFE_TRIM, EMPTY);

    const secured = RESERVED.test(fileName) ? SAFE + fileName + SAFE : fileName;

    return secured.slice(0, MAX_LENGTH);
  } catch (err) {
    qbLog.filenamify(err.message);

    return null;
  }
};
