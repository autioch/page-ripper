const largeAmountsOfLabels = [13, 55, 79, 100, 578, 1000]; // eslint-disable-line no-magic-numbers

/*
 * Cases where seenIds have all suffixes up to given number,
 * but the id doesn't have a suffix, so it should assign the next number.
 */
const nextNumberSets = largeAmountsOfLabels.map((amount) => ({
  id: 'a',
  newId: `a__${amount}`,
  seenIds: new Array(amount).fill(0).map((el, index) => `a${index > 0 ? `__${index}` : ''}`)
}));

module.exports = [{
  id: undefined,
  seenIds: [],
  newId: ''
}, {
  id: null,
  seenIds: [],
  newId: ''
}, {
  id: 2,
  seenIds: [],
  newId: ''
}, {
  id: {},
  seenIds: [],
  newId: ''
}, {
  id: [],
  seenIds: [],
  newId: ''
},
{},
{
  id: '',
  seenIds: [],
  newId: ''
},
{
  id: 'a',
  seenIds: null,
  newId: ''
}, {
  id: 'a',
  seenIds: 2,
  newId: ''
}, {
  id: 'a',
  seenIds: {},
  newId: ''
}, {
  id: 'a',
  seenIds: '',
  newId: ''
}, {
  id: 'a',
  seenIds: undefined,
  newId: ''
}, {
  id: 'a',
  seenIds: [],
  newId: 'a'
}, {
  id: 'a__2',
  seenIds: [],
  newId: 'a__2'
}, {
  id: 'a',
  seenIds: ['a__2'],
  newId: 'a'
}, {
  id: 'a',
  seenIds: ['a'],
  newId: 'a__2'
}, {
  id: 'a__2',
  seenIds: ['a__2'],
  newId: 'a__3'
}, {
  id: 'a__4',
  seenIds: ['a__2'],
  newId: 'a__4'
}, {
  id: 'a__2',
  seenIds: ['a_2'],
  newId: 'a__2'
}, {
  id: 'a_2',
  seenIds: ['a_2'],
  newId: 'a_2__2'
}, {
  id: 'a__1',
  seenIds: ['a__1', 'a__3', 'a__5'],
  newId: 'a__6'
}, {
  id: 'a__3',
  seenIds: ['a__1', 'a__3', 'a__5'],
  newId: 'a__6'
}, {
  id: 'a__5',
  seenIds: ['a__1', 'a__3', 'a__5'],
  newId: 'a__6'
}, {
  id: 'a__4',
  seenIds: ['a__1', 'a__3', 'a__5'],
  newId: 'a__4'
}, {
  id: 'a__3',
  seenIds: ['a__1', 'a__3', 'a__4', 'a__5', 'a__6'],
  newId: 'a__7'
}, {
  id: 'a__3__1',
  seenIds: ['a__3__1', 'a__3', 'a__1'],
  newId: 'a__3__2'
}, {
  id: 'a__3__1',
  seenIds: ['a__3__2', 'a__3'],
  newId: 'a__3__1'
}, {
  id: '_1',
  seenIds: [],
  newId: '_1'
}, {
  id: '_1',
  seenIds: ['_1'],
  newId: '_1__2'
}, {
  id: '__1',
  seenIds: [],
  newId: '__1'
}, {
  id: '__1',
  seenIds: ['__1'],
  newId: '__1__2'
}, {
  id: ' __1',
  seenIds: [],
  newId: ' __1'
}, {
  id: ' __1',
  seenIds: [' __1'],
  newId: ' __2'
}, {
  id: 'Test',
  seenIds: ['Test', 'Test__2', 'Other__5'],
  newId: 'Test__3'
}, {
  id: 'a',
  seenIds: ['a', 'b'],
  newId: 'a__2'
}, {
  id: 'a',
  seenIds: ['a', 'b', 'b__2', 'b__3'],
  newId: 'a__2'
}, {
  id: 'test',
  seenIds: ['test', 'test2', 'test2__2', 'test2__3'],
  newId: 'test__2'
}];// .concat(nextNumberSets);
