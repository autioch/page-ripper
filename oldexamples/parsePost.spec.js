/* eslint-env mocha */
/* eslint max-nested-callbacks: [2, 4] */
const { expect } = require('chai');
const PostInfoParser = require('../../../src/crawler/post/PostInfoParser');

const testCaseUrl = 'http://joemonster.org/art/40836/Mistrzowie_internetu_XXXIV_Swiezak_Viagra_Wladyslaw';
const testCaseBody = require('fs').readFileSync(`${__dirname}/PostInfoParser.testCase.htm`); // eslint-disable-line

describe('PostInfoParser creation', () => {
  it(`can be constructed without arguments`, () => {
    expect(() => new PostInfoParser()).to.not.throw();
  });
});

describe('PostInfoParser parsePostInfo', () => {
  const postInfoParser = new PostInfoParser();

  const postInfo = postInfoParser.parsePostInfo(testCaseBody, testCaseUrl);

  it(`will return an object`, () => {
    expect(typeof postInfo).to.equal('object');
  });

  it(`will return proper id`, () => {
    expect(postInfo.id).to.equal('40836');
  });

  it(`will return proper url`, () => {
    expect(postInfo.url).to.equal(testCaseUrl);
  });

  it(`will return proper title`, () => {
    expect(postInfo.title).to.equal('Mistrzowie internetu XXXIV - Świeżak Viagra Władysław');
  });

  it(`will return proper addedDate`, () => {
    expect(postInfo.addedDate).to.equal('23-09-2017');
  });

  it(`will return proper images`, () => {
    expect(Array.isArray(postInfo.images)).to.equal(true);
  });

  it(`will return proper categories`, () => {
    expect(Array.isArray(postInfo.categories)).to.equal(true);
  });

  it(`will return proper related`, () => {
    expect(Array.isArray(postInfo.related)).to.equal(true);
  });

  it(`will return proper next`, () => {
    expect(Array.isArray(postInfo.next)).to.equal(true);
  });

  it(`will return proper prev`, () => {
    expect(Array.isArray(postInfo.prev)).to.equal(true);
  });

  it(`will return proper tags`, () => {
    expect(Array.isArray(postInfo.tags)).to.equal(true);
  });

  it(`will return proper comments`, () => {
    expect(Array.isArray(postInfo.comments)).to.equal(true);
  });
});
