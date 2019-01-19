const cheerio = require('cheerio');
const { IGNORED_COMMENT_IMAGES, IGNORED_COMMENT_LINKS } = require('./consts');

module.exports = function parseComment(comment) {
  const { html, data, id, uname } = comment; // eslint-disable-line id-blacklist
  const $ = cheerio.load(html);
  const images = $('.commentDesc img')
    .map((index, el) => el.attribs.src)
    .get()
    .filter((src) => !IGNORED_COMMENT_IMAGES.includes(src));

  const links = $('.commentDesc a')
    .map((index, el) => el.attribs.href)
    .get()
    .filter((href) => !IGNORED_COMMENT_LINKS.includes(href))
    .filter((href) => !href.endsWith('.joemonster.org'));

  const commentInfo = {
    commentDate: data, // eslint-disable-line id-blacklist
    id,
    text: $('.commentDesc').text().trim(),
    username: uname
  };

  if (images.length) {
    commentInfo.images = images;
  }

  if (links.length) {
    commentInfo.links = links;
  }

  return commentInfo;
};
