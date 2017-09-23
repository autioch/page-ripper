module.exports = class IdGenerator {
  constructor(config = {}) {
    const { seenIds = [], defaultId = 'MISSING', suffixRegex = /__(\d+)$/ } = config;

    this.defaultId = defaultId;
    this.setSeenIds(seenIds);
    this.setSuffixRegex(suffixRegex);
  }

  setSuffixRegex(suffixRegex) {
    let { source } = suffixRegex;

    if (!source.endsWith('$')) {
      source = `${source}$`;
    }

    this.suffixRegex = new RegExp(source);
    this.suffixOnlyRegex = new RegExp(`^${source}`);
  }

  setSeenIds(seenIds) {
    const seenCache = {};

    seenIds.forEach((seenId) => {
      if (seenCache[seenId]) {
        throw Error(`Attempted to set non unique seen id in IdGenerator.`);
      }
      seenCache[seenId] = true;
    });

    this.seenIds = seenIds;
  }

  generateId(itemInfo) {
    const itemId = this.extractItemId(itemInfo);
    const uniqueId = this.uniquifyId(itemId);

    this.seenIds.push(uniqueId);
    itemInfo.id = uniqueId;

    return itemInfo;
  }

  extractItemId(itemInfo) {
    if (itemInfo.id === null || itemInfo.id === undefined) { // eslint-disable-line no-undefined
      return this.defaultId;
    }

    const stringifiedId = itemInfo.id.toString();

    if (!stringifiedId.length) {
      return this.defaultId;
    }

    return stringifiedId;
  }

  uniquifyId(itemId) {
    /* If label doesn't exist in the set, just return it. */
    if (this.seenIds.indexOf(itemId) === -1) {
      return itemId;
    }

    const rawId = this.getRawId(itemId);
    const rawIdLength = rawId.length;

    /* All labels not matching or not having suffix are converted to 1.
     * All other will have their suffix number extracted.
     * This way Math.max will always return proper value. */
    const suffixedNumbers = this.seenIds.map((label) => {
      if (label.indexOf(rawId) !== 0) {
        return 1;
      }

      const suffixMatch = label.substr(rawIdLength).match(this.suffixOnlyRegex);

      if (suffixMatch) {
        return suffixMatch[1];
      }

      return 1;
    });

    return this.getRepeatedId(rawId, Math.max(...suffixedNumbers) + 1);
  }

  getRawId(itemId) {
    const rawId = itemId.replace(this.suffixRegex, '');

    /* If the label is the suffix, treat it like the actual label. */
    if (rawId === '') {
      return itemId;
    }

    return rawId;
  }

  getRepeatedId(rawId, repeatCount) {
    return `${rawId}__${repeatCount}`;
  }
};
