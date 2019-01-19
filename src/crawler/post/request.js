const request = require('request');
const Bluebird = require('bluebird');

function assertError(err, response, body, url) {
  if (err) {
    return err.message;
  }

  const { status } = response; // eslint-disable-line no-shadow

  if (status < 200 || status > 299) { // eslint-disable-line no-magic-numbers
    return `Invalid response status ${status} ${url}`;
  }

  if (!body.length) {
    return `Missing body for ${url}`;
  }

  return null;
}

module.exports = function postRequest(url) {
  return new Bluebird((resolve) => request({
    uri: url
  }, (err, response, body) => resolve({
    body,
    error: assertError(err, response, body, url),
    status: response.status,
    url
  })));
};
