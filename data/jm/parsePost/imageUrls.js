module.exports = function parseImageUrls($) {
  const urls = $('div#arcik img').map((index, el) => el.attribs.src).get();

  return urls.map((url) => url.split('?')[0]);
};
