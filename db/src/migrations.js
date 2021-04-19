/* eslint-disable no-magic-numbers */
const qbLog = require('qb-log');
const { omit } = require('lodash');

module.exports = [
  async function imagesTable(db) {
    await db.run(`CREATE TABLE images (
      postId TEXT NOT NULL,
      imageUrl TEXT NOT NULL,
      fullPath TEXT,
      message TEXT NOT NULL
    )`);
  },
  async function postsTitle(db) {
    /* Manually parsing and updating each row is painfully slow,
     * around 100 rows in 5 seconds.
     * Instead, copy the table and insert modified stuff into the new table.
     * It's a bit faster, however, prepared statements don't work for some reason here, so
     * we can only do around 100 rows per second.*/
    await db.run('ALTER TABLE posts RENAME TO posts_old');
    await db.run('CREATE TABLE posts AS SELECT * FROM posts_old WHERE 0');
    await db.run('ALTER TABLE posts ADD COLUMN title TEXT NOT NULL DEFAULT \'\'');

    const rows = await db.all('SELECT * from posts_old');

    qbLog.update(`Found ${rows.length} to update`);

    const updatedRows = rows.map((row) => {
      const { id, url, folderName, postInfo } = row;

      const parsedPostInfo = JSON.parse(postInfo);
      const slimPostInfo = omit(parsedPostInfo, ['id', 'folderName', 'title']);
      const serializedPostInfo = JSON.stringify(slimPostInfo);

      return [id, url, folderName, parsedPostInfo.title, serializedPostInfo];
    });

    // const prepared = await db.prepare('INSERT INTO posts (id, url, folderName, title, postInfo) VALUES (?, ?, ?, ?, ?)');
    for (let index = 0; index < updatedRows.length; index++) {
      if (index % 100 === 0) {
        qbLog.update(`Updating row ${index}`);
      }

      // await prepared.run(...updatedRows[index]);

      await db.run('INSERT INTO posts (id, url, folderName, title, postInfo) VALUES (?, ?, ?, ?, ?)', updatedRows[index]);
    }

    // await prepared.finalize();

    await db.run('DROP TABLE posts_old');
    await db.run('VACUUM');
  },
  async function hiddenImages(db) {
    await db.run('ALTER TABLE images ADD COLUMN isHidden INT NOT NULL DEFAULT 0');
  }
];
