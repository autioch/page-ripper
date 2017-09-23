const PageRipper = require('../../index');

const IGNORED_COMMENT_IMAGES = [
  'https://img.joemonster.org/images/brak-foto60.gif',
  '/images/icons/exclamation_gray.png'
];

const IGNORED_COMMENT_LINKS = [
  '#'
];

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

const CONSOLE_REPLACE = 'const console={log:()=>{}};';

module.exports = class JMPostInfoParser extends PageRipper.Crawler.Post.PostInfoParser {
  parseExtraPostInfo(url, $, links, images) { // eslint-disable-line no-unused-vars
    return {
      prev: $('a#prev_art').attr('href'),
      next: $('a#next_art').attr('href'),
      tags: this.parseTags($),
      comments: this.parseComments($),
      content: $('div#arcik').text().trim()
    };
  }

  parseTags($) {
    return $('.art-footer>a.tag')
      .map((index, el) => $(el).text().trim())
      .get()
      .filter((tag) => !IGNORED_TAGS.includes(tag));
  }

  parseComments($) {
    const commentsScript = $('#commentsContainer>script').html();
    const functionBody = `${CONSOLE_REPLACE}const ${commentsScript}return comment_js;`;

    let allComments;

    try {
      const commentsFunction = new Function(functionBody); // eslint-disable-line no-new-func

      allComments = commentsFunction();
    } catch (err) {
      return {
        rawComments: commentsScript,
        error: err.message
      };
    }

    return {
      bestComments: allComments.best_comments.map((comment) => this.parseComment(comment)),
      comments: Object.values(allComments.comments).map((comment) => {
        const mainComment = this.parseComment(comment.maincomment);

        if (comment.subcomments) {
          mainComment.subcomments = Object
            .values(comment.subcomments)
            .map((subcomment) => this.parseComment(subcomment));
        }

        return mainComment;
      })
    };
  }

  parseComment(comment) {
    const { html, data, id, uname } = comment; // eslint-disable-line id-blacklist
    const $ = this.cheerio.load(html);
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
