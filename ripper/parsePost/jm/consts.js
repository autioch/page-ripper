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

const IGNORED_IMAGE = [
  'https://img.joemonster.org/images/brak-foto60.gif',
  '/images/icons/exclamation_gray.png'
];

const IGNORED_LINK = [
  '#'
];

const IGNORED_LINK_CONTENT = [
  '***',
  'youtube.com',
  'fbcdn.',
  'facebook.com'
];

const IGNORED_LINK_ENDING = [
  '.htm',
  '.html',
  '.joemonster.org'
];

module.exports = {
  IGNORED_TAGS,
  MONTH_TRANSLATION,
  GATEWAY_ERROR,
  CONSOLE_REPLACE,
  IGNORED_IMAGE,
  IGNORED_LINK,
  IGNORED_LINK_CONTENT,
  IGNORED_LINK_ENDING
};
