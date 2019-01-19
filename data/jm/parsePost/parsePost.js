const parseComments = require('./parseComments');
const { IGNORED_TAGS, MONTH_TRANSLATION, GATEWAY_ERROR } = require('./consts');

module.exports = function parsePost($, url, bodyText) {
  if (bodyText.includes(GATEWAY_ERROR)) {
    return {
      err: GATEWAY_ERROR,
      prev: url.replace('http://joemonster.org', '')
    };
  }

  // const links = $('a').filter((index, link) => link.attribs.rel);

  const urlParts = url.split('/');

  const id = urlParts[urlParts.length - 2]; // eslint-disable-line no-magic-numbers

  const [day, monthText, year, time] = $('.art-author-date').text().split('\n')
    .map((part) => part.trim())
    .filter((part) => part.length > 1)
    .pop()
    .split(' ');

  const addedDate = `${year}-${MONTH_TRANSLATION[monthText] || '99'}-${day} ${time}`;

  const postInfo = {
    id,
    nextUrls: [$('a#prev_art').attr('href'), $('a#next_art').attr('href')],
    imageUrls: $('div#arcik img').map((index, el) => el.attribs.src).get(),
    title: $('h1.title').text(),
    addedDate,
    gatheredDate: new Date().toJSON().split('T')[0],
    tags: $('.art-footer>a.tag').map((index, el) => $(el).text().trim()).get()
      .filter((tag) => !IGNORED_TAGS.includes(tag)),
    comments: parseComments($),
    content: $('div#arcik').text().trim()
      .replace(/ +/gi, ' ')
  };

  return postInfo;
};
