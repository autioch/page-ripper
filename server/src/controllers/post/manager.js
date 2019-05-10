module.exports = {
  async getPostList(db) {
    const postList = await db.all('SELECT id, title from posts order by id');

    // postList.sort((a, b) => a.title.localeCompare(b.title));

    return postList;
  },

  async getPost(db, postId) {
    const [post] = await db.all('SELECT * from posts WHERE id = ?', [postId]);

    post.postInfo = JSON.parse(post.postInfo);

    return post;
  }
};
