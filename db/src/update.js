/* eslint-disable no-magic-numbers */

const migrations = [
  async (db) => {
    await db.run(`CREATE TABLE images (
      postId TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      fullPath TEXT,
      message TEXT NOT NULL
    )`);
  }
];

async function getVersion(db) {
  const rows = await db.all('SELECT version FROM config LIMIT 1');

  const [row] = rows;
  const { version } = row;

  return version;
}

module.exports = async function update(db) {
  let version = await getVersion(db);

  async function bumpVersion() {
    await db.run(`UPDATE config SET version = ?`, [version]);
    version = version + 1;
  }

  for (let index = version - 1; index < migrations.length; index++) {
    await migrations[index](db);
    await bumpVersion();
  }
};
