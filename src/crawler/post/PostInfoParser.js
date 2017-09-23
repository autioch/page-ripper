const cheerio = require('cheerio');

module.exports = class PostInfoParser {
  constructor() {
    this.cheerio = cheerio;
  }

  parsePostInfo(bodyText, url) {
    const $ = cheerio.load(bodyText);
    const links = $('a').filter((index, link) => link.attribs.rel);

    const commonPostInfo = this.parseCommonPostInfo(url, $, links);
    const extraInfo = this.parseExtraPostInfo(url, $, links);

    return Object.assign(commonPostInfo, extraInfo);
  }

  parseCommonPostInfo(url, $, links) {
    return {
      id: this.parsePostId(url, $, links),
      url,
      title: this.parsePostTitle(url, $, links),
      addedDate: this.parsePostAddedDate(url, $, links),
      gatheredDate: new Date().toJSON().split('T')[0],
      images: this.parseImages(url, $, links)
    };
  }

  /* Wordpress defaults */
  parseExtraPostInfo(url, $, links) { // eslint-disable-line no-unused-vars
    return {
      categories: $('.end_title > a').map((index, el) => $(el).text()).get(),
      related: $('.wp_rp_title').map(this.parseLink).get(),
      next: this.filterLinksByRel(links, 'next').map(this.parseLink).get(),
      prev: this.filterLinksByRel(links, 'prev').map(this.parseLink).get(),
      tags: this.filterLinksByRel(links, 'tag').map((index, el) => $(el).text()).get(),
      comments: $('.comm_text').map((index, el) => $(el).text().trim()).get()
    };
  }

  parseImages(url, $, links) { // eslint-disable-line no-unused-vars
    return $('img').map((index, el) => el.attribs.src).get();
  }

  parsePostId(url, $, links) { // eslint-disable-line no-unused-vars
    const urlParts = url.split('/');

    return urlParts[urlParts.length - 2]; // eslint-disable-line no-magic-numbers
  }

  parsePostTitle(url, $, links) { // eslint-disable-line no-unused-vars
    return $('h1.title').text();
  }

  parsePostAddedDate(url, $, links) { // eslint-disable-line no-unused-vars
    const [day, month, year] = $('.top_title_top')
      .text()
      .replace(/[a-z ]+/gi, '')
      .split('-');

    return `${year}-${month}-${day}`;
  }

  parseLink(index, linkElement) {
    return {
      url: linkElement.attribs.href,
      title: cheerio.load(linkElement).text()
    };
  }

  filterLinksByRel(links, relType) {
    return links.filter((index, link) => link.attribs.rel === relType);
  }
};
