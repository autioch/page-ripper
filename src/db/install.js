module.exports = async function install(db) {
  await db.run(`CREATE TABLE config (
    version INT NOT NULL
  )`);

  await db.run('INSERT INTO config (version) VALUES (?)', 1);

  await db.run(`CREATE TABLE queue (
    url TEXT NOT NULL,
    isVisited INT NOT NULL
  )`);

  await db.run(`CREATE TABLE posts (
    id TEXT NOT NULL,
    url TEXT NOT NULL,
    folderName TEXT,
    postInfo TEXT NOT NULL
  )`);
};
