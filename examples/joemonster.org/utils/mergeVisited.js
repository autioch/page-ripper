const fs = require('bluebird').promisifyAll(require('fs'));

const visited = require('../config/visited.json');
const visited2 = require('../config/visited 2.json');

const ID_INDEX = 4;

const newVisited = visited.concat(visited2)
  .map((url) => ({
    url,
    id: parseInt(url.split('/')[ID_INDEX], 10)
  }))
  .sort((a, b) => a.id - b.id)
  .map((el) => el.url);

fs.writeFileAsync('../config/visited new.json', JSON.stringify(newVisited, null, '  '));
