// TODO cache until parse is no longer needed.
let postList = [];

module.exports = {
  async getPostList(db) {
    if (postList.length) {
      return postList;
    }

    const rows = await db.all('SELECT id, postInfo from posts order by id');

    const posts = rows.sort((a, b) => a.id - b.id).map((row) => ({
      id: row.id,
      title: JSON.parse(row.postInfo).title
    }));

    postList = posts.sort((a, b) => a.title.localeCompare(b.title));

    return postList;
  },

  async getPost(db, postId) {
    const [post] = await db.all('SELECT * from posts WHERE id = ?', [postId]);

    post.postInfo = JSON.parse(post.postInfo);

    return post;
  }
};
