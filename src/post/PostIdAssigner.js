/* TODO This is quite naive iterative implementation of finding unique id. */

module.exports = class PostIdAssigner {
  constructor(config = {}) {
    const { seenIdsArray = [] } = config;

    this.setSeenIds(seenIdsArray);
  }

  setSeenIds(seenIdsArray) {
    const newSeenIds = {};

    seenIdsArray.forEach((existingId) => {
      if (newSeenIds[existingId]) {
        throw Error(`Attempted to set non unique existing id in PostIdAssigner.`);
      }
      newSeenIds[existingId] = true;
    });

    this.seenIds = newSeenIds;
  }

  assignPostId(postInfo) {
    const postId = this.getPostId(postInfo);
    const uniqueId = this.generateId(postId);

    this.seenIds[uniqueId] = true;

    postInfo.id = uniqueId;

    return uniqueId;
  }

  getPostId(postInfo) {
    if (postInfo.id) {
      return postInfo.id;
    }

    return 'MISSING';
  }

  generateId(originalId) {
    let currentIndex = 1;
    let newId = originalId;

    while (this.seenIds[newId]) {
      currentIndex = currentIndex + 1;
      newId = this.getRepeatedId(originalId, currentIndex);
    }

    return newId;
  }

  getRepeatedId(originalId, currentIndex) {
    return `${originalId}__${currentIndex}`;
  }
};
