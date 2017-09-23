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
      }, (error, response, body) => {
        if (error) {
          reject(error);
        } else {
          resolve(body);
        }
      });
    });
  }
};
