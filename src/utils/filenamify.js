// const path = require('path');
const filenamifyUrl = require('filenamify-url');

//   decodeURI(folderName).replace(/"/g, '_').replace(/\?/g, '_').replace(/:/g, '_').replace(/ /g, '_')

module.exports = function filenamify(url = '') {
  const prefixed = url.startsWith('http://') ? url : `http://${url}`;
  const folderName = filenamifyUrl(prefixed, {
    replacement: '_'
  });

  return folderName;
};
