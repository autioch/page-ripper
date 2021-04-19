/* eslint-disable no-unused-expressions */
const thenifyAll = require('thenify-all');
const qbLog = require('qb-log')('simple');

const methods = ['close', 'get', 'all', 'exec'];

const DEBOG_SQL = false;

module.exports = class Wrapper {
  constructor(db) {
    this.db = db;
    const wrapped = thenifyAll(db, {}, methods);

    for (const method of methods) {
      this[method] = wrapped[method].bind(db);
    }
  }

  prepare(sql, params) {
    return new Promise((resolve, reject) => {
      const statement = this.db.prepare(sql, params, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(statement);
        }
      });
    });
  }

  each(sql, params, onRow) {
    return new Promise((resolve, reject) => {
      let done = false;

      const rowCallback = (err, row) => {
        if (done) {
          return;
        }

        if (err) {
          DEBOG_SQL && qbLog.error(`SQL ERROR: ${err} in ${sql}.`);
          done = true;
          reject(err);

          return;
        }

        onRow(row);
      };

      const completionCallback = (err, count) => {
        if (err) {
          DEBOG_SQL && qbLog.error(`SQL ERROR: ${err} in ${sql}.`);
          reject(err);

          return;
        }

        resolve(count);
      };

      this.db.each(sql, params, rowCallback, completionCallback);
    });
  }

  run(sql, params) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, (err) => {
        DEBOG_SQL && qbLog.info(`RUN: ${sql}, ${JSON.stringify(params)}`);

        if (err) {
          qbLog.error(`ERROR: ${err} in ${sql}.`);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  async savePost(post) {
    const { id, url, title, folderName, postInfo } = post;

    await this.run('INSERT INTO posts (id, url, title, folderName, postInfo) VALUES (?, ?, ?, ?, ?)', [id, url, title, folderName, postInfo]);
  }

  async savePostImages(postId, images) {
    for (let i = 0; i < images.length; i++) {
      const { imageUrl, fullPath, message } = images[i];

      await this.run('INSERT INTO images (postId, imageUrl, fullPath, message) VALUES (?, ?, ?, ?)', [postId, imageUrl, fullPath, message]);
    }
  }

  async visitUrl(url) {
    await this.run(`UPDATE queue SET isVisited = ? WHERE url = ?`, [1, url]);
  }

  async addUrlToQueue(urls) {
    for (let i = 0; i < urls.length; i++) {
      await this.run('INSERT INTO queue (url, isVisited) VALUES (?, ?)', [urls[i], 0]);
    }
  }

  async getPostList() {
    const postList = await this.all('SELECT id, title from posts order by id');

    return postList;
  }

  async getPost(postId) {
    const [post] = await this.all('SELECT * from posts WHERE id = ?', [postId]);

    return post;
  }

  async getPostFolderName(postId) {
    const [row] = await this.all('SELECT folderName from posts where id = ?', [postId]);

    return row.folderName;
  }

  async getPostImages(postId) {
    const images = await this.all('SELECT * from images where postId = ?', [postId]);

    return images;
  }

  async hideImage(postId, imageId) {
    await this.run(`UPDATE images SET isHidden = ? WHERE postId = ? and imageUrl = ? `, [1, postId, imageId]);
  }
};
