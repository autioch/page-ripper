const Bluebird = require('bluebird');

module.exports = class WebsiteDownloader {
  constructor({ PostDetailsFetcher, requestPause = 0 }) {
    this.requestPause = requestPause;
    this.PostDetailsFetcher = PostDetailsFetcher;
  }

  download(postInfoArray, index = 0) {
    return this.PostDetailsFetcher
      .fetchPostDetails(postInfoArray[index])
      .then(() => this.loop(postInfoArray, index));
  }

  loop(postInfoArray, index) {
    const nextIndex = this.getNextId(postInfoArray, index);

    if (nextIndex === null) {
      return Bluebird.resolve();
    }

    return Bluebird
      .delay(this.requestPause)
      .then(() => this.download(postInfoArray, nextIndex));
  }

  getNextId(postInfoArray, index) {
    const nextIndex = index + 1;

    if (postInfoArray.length <= nextIndex) {
      return null;
    }

    return nextIndex;
  }
};
