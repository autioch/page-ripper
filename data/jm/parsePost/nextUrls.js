const { compact, uniq } = require('lodash');

module.exports = function parseNextUrls($) {
  const prevNextUrls = [$('a#prev_art').attr('href'), $('a#next_art').attr('href')];
  const relatedUrls = $('div.relatedArticle a').map((index, el) => el.attribs.href).get();
  const popularUrls = $('div#tab-a-popularne a').map((index, el) => el.attribs.href).get();
  const likedUrls = $('div#tab-a-ulubione a').map((index, el) => el.attribs.href).get();
  const commentedUrls = $('div#tab-a-komentowane a').map((index, el) => el.attribs.href).get();
  const latestUrls = $('div.latest-articles-box li a').map((index, el) => el.attribs.href).get();
  const nextUrls = prevNextUrls.concat(...relatedUrls, ...popularUrls, ...likedUrls, ...commentedUrls, ...latestUrls);

  const absoluteUrls = nextUrls.map((url) => {
    if (url.startsWith('/art/')) {
      return `http://joemonster.org${url}`;
    }

    // if (!url.startsWith('http://joemonster.org')) {
    //   return false;
    // }

    return url;
  });

  const filtered = uniq(compact(absoluteUrls)).sort();

  return filtered;
};
