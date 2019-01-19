module.exports = function enqueuerDb({ db }) {
  async function add(post) {
    const { id, url, postInfo } = post;

    await db.run('INSERT INTO posts (id, url, postInfo) VALUES (?, ?, ?)', [id, url, postInfo]);
  }

  return {
    add
  };
};
