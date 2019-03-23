const cheerio = require('cheerio');
const path = require('path');
const { CONSOLE_REPLACE, IGNORED_IMAGE, IGNORED_LINK_ENDING, IGNORED_LINK_CONTENT, IGNORED_LINK } = require('./consts');

function extractLinks(comment, commentLinks) {
  const { html } = comment;
  const $ = cheerio.load(html);

  const images = $('.commentDesc img').map((index, el) => el.attribs.src).get().filter((src) => !IGNORED_IMAGE.includes(src));

  commentLinks.push(...images);

  const links = $('.commentDesc a').map((index, el) => el.attribs.href).get()
    .filter((href) => !IGNORED_LINK.includes(href))
    .filter((href) => path.extname(href).length > 1)
    .filter((href) => IGNORED_LINK_CONTENT.every((content) => !href.includes(content)))
    .filter((href) => IGNORED_LINK_ENDING.every((content) => !href.endsWith(content)));

  commentLinks.push(...links);
}

function extractComments($) {
  const commentsScript = $('#commentsContainer>script');

  if (!commentsScript.length) {
    return {
      error: 'Comments not available'
    };
  }

  try {
    const commentsFunction = new Function(`${CONSOLE_REPLACE}const ${commentsScript.html()}return comment_js;`); // eslint-disable-line no-new-func

    return commentsFunction();
  } catch (err) {
    return {
      error: err.message
    };
  }
}

module.exports = function parseComments($) {
  const allComments = extractComments($);

  if (allComments.error) {
    console.log(`Failed to parse comments ${allComments.error}`); // eslint-disable-line no-console

    return [];
  }

  const commentLinks = [];

  allComments.best_comments.forEach((comment) => extractLinks(comment, commentLinks));

  Object.values(allComments.comments).forEach(({ maincomment, subcomments = {} }) => {
    extractLinks(maincomment, commentLinks);
    Object.values(subcomments).forEach((subcomment) => extractLinks(subcomment, commentLinks));
  });

  return commentLinks;
};
