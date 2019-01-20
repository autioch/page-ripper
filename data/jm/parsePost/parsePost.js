const parseComments = require('./comments');
const parseImageUrls = require('./imageUrls');
const parseNextUrls = require('./nextUrls');
const parseAuthorAndDate = require('./authorAndDate');
const parseIdAndFolder = require('./idAndFolder');
const { IGNORED_TAGS, GATEWAY_ERROR } = require('./consts');

module.exports = function parsePost($, url, bodyText) {
  const text = (el) => $(el).text().trim();
  const idAndFolder = parseIdAndFolder(url);

  if (bodyText.includes(GATEWAY_ERROR)) {
    return {
      id: idAndFolder.id,
      err: GATEWAY_ERROR
    };
  }
  const { comments, commentLinks } = parseComments($);
  const imageUrls = parseImageUrls($)
    .concat(commentLinks || [])
    .map((imageUrl) => {
      if (!imageUrl) {
        return false;
      }

      if (imageUrl.startsWith('/')) {
        return `http://joemonster.org${imageUrl}`;
      }

      return imageUrl;
    })
    .filter((imageUrl) => !!imageUrl);

  return {
    /* Required */
    ...parseIdAndFolder(url),
    imageUrls,
    nextUrls: parseNextUrls($),

    /* extra details */
    title: $('h1.title').text(),
    ...parseAuthorAndDate($),
    comments,
    tags: $('.art-footer>a.tag').map((index, el) => text(el)).get().filter((tag) => !IGNORED_TAGS.includes(tag)),
    content: text('div#arcik').replace(/ +/gi, ' ')
  };
};
