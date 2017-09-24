const Bluebird = require('bluebird');

module.exports = class WebsiteCrawler {
  constructor({ PostDownloader, requestPause = 0, visitedUrls = [] }) {
    this.requestPause = requestPause;
    this.PostDownloader = PostDownloader;
    this.visitedUrls = visitedUrls;
    this.queuedUrls = [];
  }

  scan(postUrl) {
    return this.PostDownloader
      .downloadPost(postUrl)
      .tap((postInfo) => this.enqueueUrls(this.getUrlsToEnqueue(postInfo, postUrl)))
      .then(() => this.loop(postUrl), () => this.loop(postUrl));
  }

  loop(postUrl) { // eslint-disable-line no-unused-vars
    const nextUrl = this.getNextUrl();

    if (nextUrl === null) {
      return this.endLoop(postUrl);
    }

    return Bluebird
      .delay(this.requestPause)
      .then(() => this.scan(nextUrl));
  }

  endLoop(postUrl) { // eslint-disable-line no-unused-vars
    return Bluebird.resolve();
  }

  getNextUrl() {
    if (!this.queuedUrls.length) {
      return null;
    }

    return this.queuedUrls.shift();
  }

  enqueueUrls(urlsToEnqueue) {
    this.queuedUrls.push(...urlsToEnqueue);
  }

  getUrlsToEnqueue(postInfo, postUrl) { // eslint-disable-line no-unused-vars
    if (postInfo.id && parseInt(postInfo.id, 10) === postInfo.id) {
      return postInfo.id + 1;
    }

    const urlParts = postInfo.url.split('/');
    const id = parseInt(urlParts.pop(), 10);

    if (isNaN(id)) {
      return [];
    }

    urlParts.push(id + 1);

    return [urlParts.join('/')];
  }
};
