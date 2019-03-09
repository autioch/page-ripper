const request = require('request');

function assertError(err, response, body, url) {
  if (err) {
    return err.message;
  }

  if (response.status < 200 || response.status > 299) { // eslint-disable-line no-magic-numbers
    return `Invalid response status ${response.status} ${url}`;
  }

  if (!body.length) {
    return `Missing body for ${url}`;
  }

  return null;
}

module.exports = function requestPost(url) {
  return new Promise((resolve) => request({
    uri: url
  }, (err, response, body) => resolve({
    body,
    error: assertError(err, response, body, url),
    status: response.status,
    url
  })));
};
