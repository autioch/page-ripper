module.exports = [
  {
    input: 'absolute.com/path/example',
    output: 'absolute.com_path_example'
  },
  {
    input: 'absolute.com/path/some_valid_id',
    output: 'absolute.com_path_some_valid_id'
  },
  {
    input: 'http://test.com',
    output: 'test.com'
  },
  {
    input: 'http://test.com/path',
    output: 'test.com_path'
  },
  {
    input: 'https://test.com/path',
    output: 'test.com_path'
  },
  {
    input: 'https://test.com:1234/path',
    output: 'test.com_1234_path'
  },
  {
    input: 'http://test.com/path/some_valid_id',
    output: 'test.com_path_some_valid_id'
  },
  {
    input: 'http://username:password@example.com/',
    output: 'example.com'
  }
];
