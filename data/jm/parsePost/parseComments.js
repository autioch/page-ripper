const parseComment = require('./parseComment');
const { CONSOLE_REPLACE } = require('./consts');

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

  return {
    bestComments: allComments.best_comments.map((comment) => parseComment(comment)),
    comments: Object.values(allComments.comments).map((comment) => {
      const mainComment = parseComment(comment.maincomment);

      if (comment.subcomments) {
        mainComment.subcomments = Object
          .values(comment.subcomments)
          .map((subcomment) => parseComment(subcomment));
      }

      return mainComment;
    })
  };
};
