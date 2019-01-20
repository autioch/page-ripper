const cheerio = require('cheerio');
const { uniq } = require('lodash');
const { CONSOLE_REPLACE, IGNORED_COMMENT_IMAGES, IGNORED_COMMENT_LINKS } = require('./consts');

function parseComment(comment, commentLinks) {
  const { html, data: date, id, uname } = comment; // eslint-disable-line id-blacklist
  const $ = cheerio.load(html);
  const images = $('.commentDesc img').map((index, el) => el.attribs.src).get()
    .filter((src) => !IGNORED_COMMENT_IMAGES.includes(src));

  const links = $('.commentDesc a').map((index, el) => el.attribs.href).get()
    .filter((href) => !IGNORED_COMMENT_LINKS.includes(href))
    .filter((href) => !href.endsWith('.htm'))
    .filter((href) => !href.endsWith('.html'))
    .filter((href) => !href.includes('facebook.com'))
    .filter((href) => !href.includes('fbcdn.'))
    .filter((href) => !href.includes('***'))
    .filter((href) => !href.includes('youtube.com'))
    .filter((href) => !href.endsWith('.joemonster.org'));

  const commentInfo = {
    id,
    date,
    text: $('.commentDesc').text().trim().replace(/( |\t|\n|\r)+/gi, ' '),
    username: uname
  };

  if (images.length) {
    commentInfo.images = images;
  }

  if (links.length) {
    commentInfo.links = links;
    commentLinks.push(...links);
  }

  return commentInfo;
}

module.exports = function parseComments($) {
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
  const commentLinks = [];

  const bestComments = allComments.best_comments.map((comment) => parseComment(comment, commentLinks));
  const comments = Object.values(allComments.comments).map((comment) => {
    const mainComment = parseComment(comment.maincomment, commentLinks);

    if (comment.subcomments) {
      mainComment.subcomments = Object
        .values(comment.subcomments)
        .map((subcomment) => parseComment(subcomment, commentLinks));
    }

    return mainComment;
  });

  const uniqueComments = uniq(bestComments.concat(comments), (comment) => comment.id).sort((a, b) => a.id - b.id);

  return {
    comments: uniqueComments,
    commentLinks
  };
};
