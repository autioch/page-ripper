const IGNORED_TAGS = ['xd', 'malcolmxd', 'malcolm'];
const CONSOLE_REPLACE = 'const console={log:()=>{}};';

const MONTH_TRANSLATION = {
  stycznia: '01',
  lutego: '02',
  marca: '03',
  kwietnia: '04',
  maja: '05',
  czerwca: '06',
  lipca: '07',
  sierpnia: '08',
  września: '09',
  października: '10',
  listopada: '11',
  grudnia: '12'
};

const GATEWAY_ERROR = '502 Bad Gateway';

const IGNORED_COMMENT_IMAGES = [
  'https://img.joemonster.org/images/brak-foto60.gif',
  '/images/icons/exclamation_gray.png'
];

const IGNORED_COMMENT_LINKS = [
  '#'
];

module.exports = {
  IGNORED_TAGS,
  MONTH_TRANSLATION,
  GATEWAY_ERROR,
  CONSOLE_REPLACE,
  IGNORED_COMMENT_IMAGES,
  IGNORED_COMMENT_LINKS
};
