const parseComments = require('./comments');
const parseNextUrls = require('./nextUrls');
const parseAuthorAndDate = require('./authorAndDate');
const parseIdAndFolder = require('./idAndFolder');
const parseImages = require('./images');
const { IGNORED_TAGS, GATEWAY_ERROR } = require('./consts');

module.exports = function parsePost($, url, bodyText) {
  const text = (el) => $(el).text().trim();

  if (bodyText.includes(GATEWAY_ERROR)) {
    return {
      id: parseIdAndFolder(url).id,
      err: GATEWAY_ERROR
    };
  }

  const contentImageUrls = $('div#arcik img').map((index, el) => el.attribs.src).get().map((imageUrl) => imageUrl.split('?')[0]);
  const commentImageUrls = parseComments($);

  return {
    /* Required */
    ...parseIdAndFolder(url),
    imageUrls: parseImages(contentImageUrls, commentImageUrls),
    nextUrls: parseNextUrls($),

    /* extra details */
    title: $('h1.title').text(),
    ...parseAuthorAndDate($),
    tags: $('.art-footer>a.tag').map((index, el) => text(el)).get().filter((tag) => !IGNORED_TAGS.includes(tag)),
    content: text('div#arcik').replace(/ +/gi, ' ')
  };
};
