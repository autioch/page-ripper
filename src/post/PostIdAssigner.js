module.exports = class PostIdAssigner {
  constructor({ seenIdsArray = [] }) {
    this.seenIdsArray(seenIdsArray);
  }

  setSeenIds(seenIdsArray) {
    const newSeenIds = {};

    seenIdsArray.forEach((existingId) => {
      if (this.seenIds[existingId]) {
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
  }

  getPostId(postInfo) {
    if (postInfo.id) {
      return postInfo.id;
    }

    if (postInfo.images.length) {
      const parts = postInfo.images[0].split('/');

      return parts[parts.length - 2]; // eslint-disable-line no-magic-numbers
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
