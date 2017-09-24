module.exports = function stringifyCircular(obj) {
  const cache = [];

  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return undefined;
      }

      // Store value in our collection
      cache.push(value);
    }

    return value;
  }, '  ');
};
