const sortTitle = (a, b) => a.title.trim().localeCompare(b.title.trim()); // eslint-disable-line no-unused-vars
const sortId = (a, b) => a.id - b.id; // eslint-disable-line no-unused-vars

module.exports = {

  async getPostList(db) {
    const postList = await db.getPostList();

    postList.sort(sortId);

    return postList;
  },

  async getPost(db, postId) {
    const { postInfo, ...postDetails } = await db.getPost(postId);

    return {
      ...postDetails,
      ...JSON.parse(postInfo)
    };
  }
};
