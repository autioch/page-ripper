const setDict = (obj, key) => Object.assign(obj, {
  [key]: true
});

const SUFFIX_REGEX = /__(\d+)$/;
const SUFFIX_ONLY_REGEX = /^__(\d+)$/;

function getRawId(itemId) {
  const rawId = itemId.replace(SUFFIX_REGEX, '');

  /* If the label is the suffix, treat it like the actual label. */
  if (rawId === '') {
    return itemId;
  }

  return rawId;
}

function uniquifyId(itemId, seenIds) {
  /* If label doesn't exist in the set, just return it. */
  if (!seenIds[itemId]) {
    return itemId;
  }

  const rawId = getRawId(itemId);
  const rawIdLength = rawId.length;

  const suffixedNumbers = Object.keys(seenIds).map((label) => {
    if (label.indexOf(rawId) !== 0) {
      return 1;
    }

    const suffixMatch = label.substr(rawIdLength).match(SUFFIX_ONLY_REGEX);

    if (suffixMatch) {
      return suffixMatch[1];
    }

    return 1;
  });

  const repeatedCount = Math.max(...suffixedNumbers) + 1;

  return `${rawId}__${repeatedCount}`;
}

function ensureItemId(itemId, defaultId) {
  if (itemId === null || itemId === undefined) { // eslint-disable-line no-undefined
    return defaultId;
  }

  const stringifiedId = itemId.toString();

  if (!stringifiedId.length) {
    return defaultId;
  }

  return stringifiedId;
}

module.exports = function idStoreFactory(config = {}) {
  const { defaultId = 'MISSING', existingIds = [] } = config;
  const seenIds = existingIds.reduce((obj, item) => setDict(obj, item), {});

  function uniquify(itemId) {
    const ensuredItemId = ensureItemId(itemId, defaultId);
    const uniqueId = uniquifyId(ensuredItemId, seenIds);

    return uniqueId;
  }

  function use(id) {
    setDict(seenIds, id);
  }

  return {
    uniquify,
    use
  };
};
