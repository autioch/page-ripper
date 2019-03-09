/* eslint-disable no-magic-numbers */

const errorTestCases = [
  {
    description: 'will return request result if request failed',
    response: {
      body: '',
      error: 'Failed',
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
      folderName: 'http://yey.com/extras'
    },
    postInfo: {
      id: 'MISSING',
      folderName: 'yey.com_extras'
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
      folderName: 'http://test.com'
    },
    postInfo: {
      id: '1',
      folderName: 'test.com'
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
      folderName: 'test.com_strange.htm'
    },
    postInfo: {}
  }
];

module.exports = {
  errorTestCases,
  validTestCases
};
