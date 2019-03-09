const request = require('request');

const HANG_DELAY = 10000;

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
  return new Promise((resolve) => {
    const hangTimeout = setTimeout(() => resolve({
      error: 'Post timeout'
    }), HANG_DELAY);

    request({
      uri: url
    }, (err, response, body) => {
      clearTimeout(hangTimeout);

      resolve({
        body,
        error: assertError(err, response, body, url),
        status: response.status
      });
    });
  });
};
