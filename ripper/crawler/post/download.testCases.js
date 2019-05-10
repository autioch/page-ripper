/* eslint-disable no-magic-numbers */

const errorTestCases = [
  {
    description: 'will return request result if request failed',
    response: {
      body: '',
      error: {
        message: 'Failed'
      },
      status: 404,
      url: 'http://test.com'
    }
  }
];

const validTestCases = [
  {
    description: 'will return parse result for successful request',
    response: {
      body: 'example body',
      error: null,
      status: 200,
      url: 'http://yey.com/extras'
    },
    parseResult: {
      id: 'MISSING',
      folderName: 'http://yey.com/extras',
      title: 'yey extras'
    },
    postInfo: {
      id: 'MISSING',
      folderName: 'yey.com_extras',
      title: 'yey extras'
    }
  },
  {
    description: 'will return id set by idStore',
    response: {
      body: 'example body',
      error: null,
      status: 200,
      url: 'http://test.com'
    },
    parseResult: {
      id: '1',
      folderName: 'http://test.com',
      title: 'test'
    },
    postInfo: {
      id: '1',
      folderName: 'test.com',
      title: 'test'
    }
  },
  {
    description: 'will return empty info if post already downloaded',
    existingIds: ['1'],
    response: {
      body: 'example body',
      error: null,
      status: 200,
      url: 'http://test.com/strange.htm'
    },
    parseResult: {
      id: '1',
      folderName: 'test.com_strange.htm',
      title: 'test strange'
    },
    postInfo: {}
  }
];

module.exports = {
  errorTestCases,
  validTestCases
};
