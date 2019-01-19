const CONSOLE_REPLACE = 'const console={log:()=>{}};';

const IGNORED_COMMENT_IMAGES = [
  'https://img.joemonster.org/images/brak-foto60.gif',
  '/images/icons/exclamation_gray.png'
];

const IGNORED_COMMENT_LINKS = [
  '#'
];

module.exports = class CommentsParser {
  constructor({ cheerio }) {
    this.cheerio = cheerio;
  }

  parseComments($) {
    const commentsScript = $('#commentsContainer>script');

    if (!commentsScript.length) {
      return 'Comments not available';
    }

    const commentsScriptText = commentsScript.html();
    const functionBody = `${CONSOLE_REPLACE}const ${commentsScriptText}return comment_js;`;

    let allComments;

    try {
      const commentsFunction = new Function(functionBody); // eslint-disable-line no-new-func

      allComments = commentsFunction();
    } catch (err) {
      return {
        rawComments: commentsScriptText,
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
};
