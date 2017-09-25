const Bluebird = require('bluebird');

module.exports = class WebsiteCrawler {
  constructor({ PostDownloader, Enqueuer, requestPause = 0 }) {
    this.PostDownloader = PostDownloader;
    this.Enqueuer = Enqueuer;
    this.requestPause = requestPause;
    this.finishPromise = null;
  }

  start(postUrl) {
    return new Bluebird((resolve) => this.scheduleCrawl(postUrl, resolve));
  }

  scheduleCrawl(postUrl, endResolve) {
    /* Instead of Bluebird.delay use setTimeout to avoid callstack exceeded. */
    setTimeout(() => this.crawl(postUrl).finally(() => this.loop(postUrl, endResolve)), this.requestPause);
  }

  crawl(postUrl) {
    return this.PostDownloader
      .downloadPost(postUrl)
      .then((postInfo) => {
        this.Enqueuer.addToQueue(this.getUrlsToEnqueue(postInfo, postUrl));
        this.Enqueuer.visit(postUrl);

        return postInfo;
      });
  }

  loop(postUrl, endResolve) { // eslint-disable-line no-unused-vars
    const nextUrl = this.Enqueuer.getNext();

    if (nextUrl === null) {
      endResolve(postUrl);

      return;
    }

    this.scheduleCrawl(nextUrl, endResolve);
  }

  getUrlsToEnqueue(postInfo, postUrl) { // eslint-disable-line no-unused-vars
    return postInfo.prev || [];
  }
};
