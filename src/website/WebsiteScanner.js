const Bluebird = require('bluebird');

module.exports = class WebsiteScanner {
  constructor({ PostDownloader, requestPause = 0 }) {
    this.requestPause = requestPause;
    this.PostDownloader = PostDownloader;
  }

  scan(postUrl) {
    return this.PostDownloader
      .downloadPost(postUrl)
      .then((postInfo) => this.loop(postInfo, postUrl));
  }

  loop(postInfo, postUrl) { // eslint-disable-line no-unused-vars
    const nextUrl = this.getNextUrl(postInfo);

    if (nextUrl === null) {
      return Bluebird.resolve();
    }

    return Bluebird
      .delay(this.requestPause)
      .then(() => this.scan(nextUrl));
  }

  getNextUrl(previousPostInfo) {
    if (previousPostInfo.id && parseInt(previousPostInfo.id, 10) === previousPostInfo.id) {
      return previousPostInfo.id + 1;
    }

    const urlParts = previousPostInfo.url.split('/');
    const id = parseInt(urlParts.pop(), 10);

    if (isNaN(id)) {
      return null;
    }

    urlParts.push(id + 1);

    return urlParts.join('/');
  }
};
