const PageRipper = require('../src/index');

function stringifyFunction(obj) {
  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'function') {
      return `[Function ${value.name}]`;
    }

    return value;
  }, '  ');
}

console.log(stringifyFunction(PageRipper));
