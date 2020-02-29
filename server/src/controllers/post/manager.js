module.exports = {
  async getPostList(db) {
    const postList = await db.getPostList();

    postList.sort((a, b) => a.title.trim().localeCompare(b.title.trim()));

    return postList;
  },

  async getPost(db, postId) {
    const [post] = await db.getPost(postId);

    const { postInfo, ...postDetails } = post;

    return {
      ...postDetails,
      ...JSON.parse(postInfo)
    };
  }
};
