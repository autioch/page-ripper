module.exports = async function prepareLastState(db) {
  const queuedItems = await db.all('SELECT url FROM queue where isVisited = 0');
  const visitedItems = await db.all('SELECT url FROM queue where isVisited = 1');
  const existingIds = await db.all('SELECT id FROM posts');

  return {
    queuedItems: queuedItems.map((item) => item.url),
    visitedItems: visitedItems.map((item) => item.url),
    existingIds: existingIds.map((item) => item.id)
  };
};
