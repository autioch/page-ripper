const { HTTP_STATUS: { OK } } = require('../../consts');
const manager = require('./manager');

module.exports = [{
  path: '/image/:postId',
  method: 'get',
  handler: (db) => async (req, res) => {
    const { postId } = req.params;
    const images = await manager.getPostImages(db, postId);

    res.setHeader('Content-Type', 'text/javascript');
    res.status(OK).send(JSON.stringify(images, null, ' '));
  }
}, {
  path: '/image/:postId/:imageId',
  method: 'get',
  handler: (db) => async (req, res) => {
    const { postId, imageId } = req.params;
    const postImagePath = await manager.getPostImagePath(db, postId, imageId);

    res.sendFile(postImagePath);
  }
}];
