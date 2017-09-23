module.exports = class PostDownloader {
  constructor({ FileSaver, IdGenerator, PostInfoFetcher, PostInfoParser }) {
    this.FileSaver = FileSaver;
    this.IdGenerator = IdGenerator;
    this.PostInfoFetcher = PostInfoFetcher;
    this.PostInfoParser = PostInfoParser;
  }

  downloadPost(postUrl) {
    return this.PostInfoFetcher
      .fetchPostInfo(postUrl)
      .then((bodyText) => this.parsePostInfo(bodyText, postUrl))
      .then((postInfo) => this.savePostInfo(postInfo, postUrl));
  }

  parsePostInfo(bodyText, postUrl) {
    const postInfo = this.PostInfoParser.parsePostInfo(bodyText, postUrl);

    this.IdGenerator.generateId(postInfo);

    return postInfo;
  }

  savePostInfo(postInfo, postUrl) { // eslint-disable-line no-unused-vars
    const fileName = this.getPostInfoFilename(postInfo);
    const fileContents = this.serializePostInfo(postInfo);

    return this.FileSaver
      .saveFile(fileName, fileContents)
      .then(() => postInfo);
  }

  getPostInfoFilename(postInfo) {
    return `${postInfo.id}.json`;
  }

  serializePostInfo(postInfo) {
    return JSON.stringify(postInfo, null, '  ');
  }
};
