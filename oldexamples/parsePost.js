const PageRipper = require('../../index');
const CommentsParser = require('./CommentsParser');

const IGNORED_TAGS = ['xd', 'malcolmxd', 'malcolm'];

const MONTH_TRANSLATION = {
  stycznia: '01',
  lutego: '02',
  marca: '03',
  kwietnia: '04',
  maja: '05',
  czerwca: '06',
  lipca: '07',
  sierpnia: '08',
  września: '09',
  października: '10',
  listopada: '11',
  grudnia: '12'
};

const GATEWAY_ERROR = '502 Bad Gateway';

module.exports = class JMPostInfoParser extends PageRipper.Crawler.Post.PostInfoParser {
  constructor(config) {
    super(config);
    this.CommentsParser = new CommentsParser({
      cheerio: this.cheerio
    });
  }

  parsePostInfo(bodyText, url) {
    if (bodyText.includes(GATEWAY_ERROR)) {
      return {
        err: GATEWAY_ERROR,
        prev: url.replace('http://joemonster.org', '')
      };
    }

    return super.parsePostInfo(bodyText, url);
  }

  parseExtraPostInfo(url, $, links, images) { // eslint-disable-line no-unused-vars
    return {
      prev: $('a#prev_art').attr('href'),
      next: $('a#next_art').attr('href'),
      tags: this.parseTags($),
      comments: this.CommentsParser.parseComments($),
      content: this.parseContent($)
    };
  }

  parseTags($) {
    return $('.art-footer>a.tag')
      .map((index, el) => $(el).text().trim())
      .get()
      .filter((tag) => !IGNORED_TAGS.includes(tag));
  }

  parseContent($) {
    const content = $('div#arcik').text().trim();

    return content.replace(/ +/gi, ' ');
  }

  parsePostId(url, $, links, images) { // eslint-disable-line no-unused-vars
    const urlParts = url.split('/');

    return urlParts[urlParts.length - 2]; // eslint-disable-line no-magic-numbers
  }

  parsePostTitle(url, $, links, images) { // eslint-disable-line no-unused-vars
    return $('h1.title').text();
  }

  parsePostAddedDate(url, $, links, images) { // eslint-disable-line no-unused-vars
    const [day, monthText, year, time] = $('.art-author-date')
      .text()
      .split('\n')
      .map((part) => part.trim())
      .filter((part) => part.length > 1)
      .pop()
      .split(' ');

    return `${year}-${MONTH_TRANSLATION[monthText] || '99'}-${day} ${time}`;
  }

  parseImages(url, $, links) { // eslint-disable-line no-unused-vars
    return $('div#arcik img').map((index, el) => el.attribs.src).get();
  }
};
