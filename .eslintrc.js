module.exports = {
  extends: 'qb',
  parserOptions: {
    ecmaVersion: 2017,
    ecmaFeatures: {
      experimentalObjectRestSpread: true
    }
  },
  rules: {
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'after-used',
      'ignoreRestSiblings': false
    }],
    'id-blacklist': ['off'],
    'id-length': ['off'],
    'class-methods-use-this': ['off'],
    'no-await-in-loop': ['off'],
  }
};
