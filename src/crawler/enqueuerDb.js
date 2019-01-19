module.exports = function enqueuerDb({ db }) {
  async function visit(url) {
    await db.run(`UPDATE queue SET isVisited = ? WHERE url = ?`, [1, url]);
  }

  async function add(urls) {
    for (let i = 0; i < urls.length; i++) {
      await db.run('INSERT INTO queue (url, isVisited) VALUES (?, ?)', [urls[i], 0]);
    }
  }

  return {
    visit,
    add
  };
};
