const { HTTP_STATUS: { OK, SERVER_ERROR } } = require('../../consts');

module.exports = [{
  path: '/post',
  method: 'get',
  handler: (db) => async (req, res) => {
    try {
      const rows = await db.all('SELECT id from posts order by id');

      const posts = rows.map((row) => row.id).sort((a, b) => a - b);

      res.setHeader('Content-Type', 'text/javascript');
      res.status(OK).send(JSON.stringify(posts, null, ' '));
    } catch (err) {
      res.status(SERVER_ERROR).send({
        error: err.message
      });
    }
  }
}, {
  path: '/post/:id',
  method: 'get',
  handler: (db) => async (req, res) => {
    try {
      const { id } = req.params;
      const [post] = await db.all('SELECT * from posts WHERE id = ?', [id]);

      post.postInfo = JSON.parse(post.postInfo);
      res.setHeader('Content-Type', 'text/javascript');
      res.status(OK).send(JSON.stringify(post, null, ' '));
    } catch (err) {
      res.status(SERVER_ERROR).send({
        error: err.message
      });
    }
  }
}];
