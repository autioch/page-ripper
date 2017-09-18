const SUFFIX_REMOVAL = / \((\d+)\)$/;
const EXACT_SUFFIX = /^ \((\d+)\)$/;

/**
 * Extracts the actual label, without the suffix.
 * @param  {string} labelToAdd Label to be stripped of the suffix.
 * @return {string}            Raw label.
 */
function getRawLabel(labelToAdd) {
  const rawLabel = labelToAdd.replace(SUFFIX_REMOVAL, '');

  /* If the label is the suffix, treat it like the actual label. */
  if (rawLabel === '') {
    return labelToAdd;
  }

  return rawLabel;
}

/**
 * Creates new label with numerical suffix.
 * @param  {string} labelToAdd Label to be suffixed.
 * @param  {array} allLabels      All existing labels.
 * @return {string}               Suffixed label.
 */
module.exports = function getNextLabel(labelToAdd, allLabels) {
  if (typeof labelToAdd !== 'string') {
    throw Error(`getLabel expects string as first parameter, ${typeof labelToAdd} recieved.`);
  }

  if (!labelToAdd.length) {
    throw Error('getLabel expects non empty string as first parameter.');
  }

  if (!Array.isArray(allLabels)) {
    throw Error(`getLabel expects array of strings as second parameter, ${typeof allLabels} recieved.`);
  }

  /* If label doesn't exist in the set, just return it. */
  if (allLabels.indexOf(labelToAdd) === -1) {
    return labelToAdd;
  }

  const rawLabel = getRawLabel(labelToAdd);
  const rawLabelLength = rawLabel.length;

  /* All labels not matching or not having suffix are converted to 1.
   * All other will have their suffix number extracted.
   * This way Math.max will always return proper value. */
  const suffixedNumbers = allLabels.map((label) => {
    if (label.indexOf(rawLabel) !== 0) {
      return 1;
    }

    const suffixMatch = label.substr(rawLabelLength).match(EXACT_SUFFIX);

    if (!suffixMatch) {
      return 1;
    }

    return suffixMatch[1];
  });

  return `${rawLabel} (${Math.max(...suffixedNumbers) + 1})`;
};
