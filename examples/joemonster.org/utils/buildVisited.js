const fs = require('bluebird').promisifyAll(require('fs'));
const path = require('path');

const dataPath = path.join('e:', 'joemonster');

fs
  .readdirAsync(dataPath)
  .map((fileName) => fs.readFileAsync(path.join(dataPath, fileName)), {
    concurrency: 5
  })
  .call('map', (fileText) => JSON.parse(fileText).url)
  .then((visited) => fs.writeFileAsync('../config/visited.json', JSON.stringify(visited, null, '  ')));
