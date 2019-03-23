const JMtestCases = require('../parsePost/jm/testCases');

const JMlinks = JMtestCases.reduce((arr, testCase) => arr.concat(testCase.imageUrls).concat(testCase.title), []);

module.exports = [
  {
    input: 'absolute.com/path/example',
    output: 'absolute.com_path_example'
  },
  {
    input: 'absolute.com/path/some_valid_id',
    output: 'absolute.com_path_some_valid_id'
  },
  {
    input: 'http://test.com',
    output: 'test.com'
  },
  {
    input: 'http://test.com/path',
    output: 'test.com_path'
  },
  {
    input: 'https://test.com/path',
    output: 'test.com_path'
  },
  {
    input: 'https://test.com:1234/path',
    output: 'test.com_1234_path'
  },
  {
    input: 'http://test.com/path/some_valid_id',
    output: 'test.com_path_some_valid_id'
  },
  {
    input: 'https://olxpl-ring04.akamaized.net/images_tablicapl/592486594_1_261x203_swiezak-groszek-juniorzy-wroclaw.jpg',
    output: 'olxpl-ring04.akamaized.net_images_tablicapl_592486594_1_261x203_swiezak-groszek-juniorzy-wroclaw.jpg'
  },
  {
    input: 'http://username:password@example.com/',
    output: 'example.com'
  },
  'https://inspectapedia.com/structure/JCCBricks019DF07-06-07s.jpg',
  'https://m.natemat.pl/14ae4fddcb121909aaabaca1b61fbae6,640,0,0,0.jpg',
  'https://makrofilm.pl/wp-content/uploads/2012/06/project-x-zamunda-torrent-izle-indir-hd-izle-teklink-indir6.png',
  {
    input: 'https://nieruchomosci.malopolska24.pl/wp-content/uploads/2013/07/basenstały2.jpg',
    output: 'nieruchomosci.malopolska24.pl_wp-content_uploads_2013_07_basenstały2.jpg'
  },
  {
    input: 'https://rudaslaska.com.pl/galeria/285213/nowy_bytom_-_plac_jana_paw%B3a_ii.jpg',
    output: 'rudaslaska.com.pl_galeria_285213_nowy_bytom_-_plac_jana_paw³a_ii.jpg'
  },
  {
    input: 'http://joemonster.org/art/42474/Mistrzowie_internetu_LXXXI_Wlasnie_o_tym_marzy_90_facetow',
    output: 'joemonster.org_art_42474_Mistrzowie_internetu_LXXXI_Wlasnie_o_tym_marzy_90_facetow'
  },
  'https://s3.flog.pl/media/foto/2502873_plac-jana-pawla-ii-w-rudzie-slaskiej_1.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/1/1b/Bia%C5%82ystok,_Rynek_Ko%C5%9Bciuszki,_widok_na_katedr%C4%99_2011.jpg',
  'https://zul.blog.onet.pl/files/2013/11/dzieci.jpg',
  ...JMlinks
];
