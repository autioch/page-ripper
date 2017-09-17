module.exports = class PostDownloader {
  constructor({ FileSaver, PostIdAssigner, PostInfoFetcher, PostInfoParser }) {
    this.FileSaver = FileSaver;
    this.PostIdAssigner = PostIdAssigner;
    this.PostInfoFetcher = PostInfoFetcher;
    this.PostInfoParser = PostInfoParser;
  }

  downloadPost(postUrl) {
    return this.PostInfoFetcher
      .fetchPostInfo(postUrl)
      .then((bodyText) => {
        const postInfo = this.parsePostInfo(bodyText, postUrl);

        return this.savePostInfo(postInfo, postUrl);
      });
  }

  parsePostInfo(bodyText, postUrl) {
    const postInfo = this.PostInfoParser.parsePostInfo(bodyText, postUrl);

    this.PostIdAssigner.assignPostId(postInfo);

    return postInfo;
  }

  savePostInfo(postInfo, postUrl) { // eslint-disable-line no-unused-vars
    const fileName = this.getPostInfoFilename(postInfo);
    const fileContents = this.serializePostInfo(postInfo);

    return this.FileSaver
      .saveFile(fileName, fileContents, 'json')
      .then(() => postInfo);
  }

  getPostInfoFilename(postInfo) {
    return postInfo.id.toString();
  }

  serializePostInfo(postInfo) {
    return JSON.stringify(postInfo, null, '  ');
  }
};
