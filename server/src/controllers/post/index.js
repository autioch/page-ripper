const { HTTP_STATUS: { OK } } = require('../../consts');
const manager = require('./manager');

module.exports = [{
  path: '/post',
  method: 'get',
  handler: (db) => async (req, res) => {
    const posts = await manager.getPostList(db);

    res.setHeader('Content-Type', 'text/javascript');
    res.status(OK).send(JSON.stringify(posts, null, ' '));
  }
}, {
  path: '/post/:postId',
  method: 'get',
  handler: (db) => async (req, res) => {
    const { postId } = req.params;
    const post = await manager.getPost(db, postId);

    res.setHeader('Content-Type', 'text/javascript');
    res.status(OK).send(JSON.stringify(post, null, ' '));
  }
}];
