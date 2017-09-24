const request = require('request');
const Bluebird = require('bluebird');

module.exports = class PostInfoFetcher {
  preparePostUrl(url) {
    return url;
  }

  fetchPostInfo(url) {
    const uri = this.preparePostUrl(url);

    return new Bluebird((resolve, reject) => {
      request({
        uri
      }, (err, response, body) => {
        const parsed = this.parseResponse(err, response, body, url);

        if (parsed.body) {
          resolve(parsed.body);
        } else {
          reject(parsed.err);
        }
      });
    });
  }

  parseResponse(err, response, body, url) { // eslint-disable-line no-unused-vars
    if (err) {
      return {
        err: err.message
      };
    }

    const { status } = response; // eslint-disable-line no-shadow

    if (status < 200 || status > 299) { // eslint-disable-line no-magic-numbers
      return {
        err: `Invalid response status ${status} ${url}`
      };
    }

    if (!body.length) {
      return {
        err: `Missing body for ${url}`
      };
    }

    return {
      body
    };
  }
};
