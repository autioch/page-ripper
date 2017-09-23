const cheerio = require('cheerio');

module.exports = class PostInfoParser {
  parsePostInfo(bodyText, url) {
    const $ = cheerio.load(bodyText);
    const images = $('a.highslide').map((index, el) => el.attribs.href).get();
    const links = $('a').filter((index, link) => link.attribs.rel);

    const commonPostInfo = {
      id: this.parsePostId(url, $, links, images),
      url,
      title: this.parsePostTitle(url, $, links, images),
      addedDate: this.parsePostAddedDate(url, $, links, images),
      gatheredDate: new Date().toJSON().split('T')[0],
      images
    };

    const extraInfo = this.parseExtraPostInfo(url, $, links, images);

    return Object.assign(commonPostInfo, extraInfo);
  }

  /* Wordpress defaults */
  parseExtraPostInfo(url, $, links, images) { // eslint-disable-line no-unused-vars
    return {
      categories: $('.end_title > a').map((index, el) => $(el).text()).get(),
      related: $('.wp_rp_title').map(this.parseLink).get(),
      next: this.filterLinksByRel(links, 'next').map(this.parseLink).get(),
      prev: this.filterLinksByRel(links, 'prev').map(this.parseLink).get(),
      tags: this.filterLinksByRel(links, 'tag').map((index, el) => $(el).text()).get(),
      comments: $('.comm_text').map((index, el) => $(el).text().trim()).get()
    };
  }

  parsePostId(url, $, links, images) { // eslint-disable-line no-unused-vars
    const urlParts = url.split('/');

    return urlParts[urlParts.length - 1];
  }

  parsePostTitle(url, $, links, images) { // eslint-disable-line no-unused-vars
    return $('h1.title').text();

    // return $('.top_title').text();
  }

  parsePostAddedDate(url, $, links, images) { // eslint-disable-line no-unused-vars
    const [day, month, year] = $('.top_title_top')
      .text()
      .replace('Dodany dnia ', '')
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
