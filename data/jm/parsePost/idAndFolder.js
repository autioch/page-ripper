module.exports = function parseIdAndFolder(url) {
  const urlParts = url.split('/');

  const id = urlParts[urlParts.length - 2]; // eslint-disable-line no-magic-numbers
  const folderName = urlParts[urlParts.length - 1];

  return {
    id,
    folderName: decodeURI(folderName).replace(/"/g, '_')
  };
};
