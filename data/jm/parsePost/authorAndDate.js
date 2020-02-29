const { MONTH_TRANSLATION } = require('./consts');

module.exports = function parseAuthorAndDate($) {
  const [author, dateAndTime] = $('.art-author-date').text().split('·').map((part) => part.trim());

  const [day, monthText, year, time] = dateAndTime.split(' ');
  const month = MONTH_TRANSLATION[monthText] || '99';
  const addedDate = `${year}-${month}-${day} ${time}`;

  return {
    author,
    addedDate
  };
};
