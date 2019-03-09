/*  eslint-disable no-control-regex */
const url = require('url');

const CONTROL = /[\u0000-\u001f\u0080-\u009f]/g;
const FORBIDDEN = /[<>:"/\\|?*\x00-\x1F]/g;
const RESERVED = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])$/i;
const WWW = /^www\./;
const EMPTY = '';

const PATH = '/';
const PATH_DUPLICATES = /\/{2,}/g;

const SWAP = '_';
const SWAP_DUPLICATES = /_{2,}/g;
const SWAP_TRIM = /^_|_$/g;

const is = (item) => !!item;
const cleanPathname = (str) => decodeURI((str || EMPTY).replace(PATH_DUPLICATES, PATH));
const cleanHostname = (str) => (str || EMPTY).replace(WWW, EMPTY);

module.exports = function filenamify(rawUrl) {
  const { hostname, port, pathname, search } = url.parse(rawUrl);
  const simplified = [cleanHostname(hostname), port, cleanPathname(pathname), search].filter(is).join(SWAP);

  const folderName = simplified
    .replace(FORBIDDEN, SWAP)
    .replace(CONTROL, SWAP)
    .replace(SWAP_DUPLICATES, SWAP)
    .replace(SWAP_TRIM, EMPTY);

  return RESERVED.test(folderName) ? SWAP + folderName + SWAP : folderName;
};
