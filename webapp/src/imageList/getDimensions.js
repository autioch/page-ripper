const RATIO = 0.75;

function getColRow(imageCount, ratio) {
  if (imageCount === 0) {
    return {
      row: 0,
      col: 0
    };
  }

  for (let row = 1; row <= imageCount; row++) {
    const maxItemsInCol = Math.ceil(row * ratio);

    for (let col = 1; col <= maxItemsInCol; col++) {
      if (row * col >= imageCount) {
        return {
          row,
          col
        };
      }
    }
  }

  throw Error(`Calculating rows/cols went wrong for ${imageCount} images.`);
}

const HOVER_OUT_MARGIN = 1;

module.exports = function getDimensions(imageCount, availableWidth, availableHeight) {
  const { col, row } = getColRow(imageCount, RATIO);

  const imageWidth = Math.floor((availableWidth - HOVER_OUT_MARGIN) / row);
  const imageHeight = Math.floor((availableHeight - HOVER_OUT_MARGIN) / col);

  return {
    width: `${Math.floor(imageWidth)}px`,
    height: `${Math.floor(imageHeight)}px`
  };
};
