/*  eslint-disable no-control-regex */
const url = require('url');

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

const is = (item) => !!item;
const cleanPathname = (str) => decodeURI((str || EMPTY).replace(PATH_MULTIPLE, PATH));
const cleanHostname = (str) => (str || EMPTY).replace(WWW, EMPTY);

module.exports = function filenamify(rawUrl) {
  const { hostname, port, pathname, search } = url.parse(rawUrl);
  const simplifiedUrl = [cleanHostname(hostname), port, cleanPathname(pathname), search].filter(is).join(SAFE);

  const fileName = simplifiedUrl
    .replace(FORBIDDEN, SAFE)
    .replace(CONTROL, SAFE)
    .replace(SAFE_MULTIPLE, SAFE)
    .replace(SAFE_TRIM, EMPTY);

  return RESERVED.test(fileName) ? SAFE + fileName + SAFE : fileName;
};
