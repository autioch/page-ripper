module.exports = {
  async getPostList(db) {
    const postList = await db.all('SELECT id, title from posts order by id');

    postList.sort((a, b) => a.title.trim().localeCompare(b.title.trim()));

    return postList;
  },

  async getPost(db, postId) {
    const [post] = await db.all('SELECT * from posts WHERE id = ?', [postId]);

    const { postInfo, ...postDetails } = post;

    return {
      ...postDetails,
      ...JSON.parse(postInfo)
    };
  }
};
