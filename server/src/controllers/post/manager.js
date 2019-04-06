module.exports = {
  async getPostList(db) {
    const rows = await db.all('SELECT id from posts order by id');

    const posts = rows.sort((a, b) => a.id - b.id).map((row) => ({
      id: row.id,
      title: row.id
    }));

    return posts;
  },

  async getPost(db, postId) {
    const [post] = await db.all('SELECT * from posts WHERE id = ?', [postId]);

    post.postInfo = JSON.parse(post.postInfo);

    return post;
  }
};
