/* eslint id-blacklist: 0 */

function uniq(array) {
  const seen = {};
  const items = [];

  for (let index = 0; index < array.length; index++) {
    const item = array[index];

    if (!seen[item]) {
      seen[item] = true;
      items.push(item);
    }
  }

  return items;
}

module.exports = class Enqueuer {
  constructor({ visited = [], queued = [] }) {
    this.queued = queued;
    this.setVisited(visited);
  }

  setVisited(visited) {
    this.visited = uniq(visited);

    /* Filter out queued items that are already visited. */
    this.setQueued(this.queued);
  }

  setQueued(newQueued) {
    this.queued = newQueued.filter((item) => !this.visited.includes(item));
  }

  addToQueue(items) {
    this.queued.push(...this.filterItemsToAdd(items));
  }

  filterItemsToAdd(items) {
    const queuedCount = this.queued.length;
    const visitedCount = this.visited.length;
    const shortArray = queuedCount > visitedCount ? this.visited : this.queued;
    const longArray = queuedCount > visitedCount ? this.queued : this.visited;

    return uniq(items).filter((item) => !shortArray.includes(item) && !longArray.includes(item));
  }

  getNext() {
    if (!this.queued.length) {
      return null;
    }

    return this.queued[0];
  }

  visit(item) {
    if (!this.visited.includes(item)) {
      this.visited.push(item);
    }

    if (this.queued.length && this.queued[0] === item) {
      this.queued.shift();
    } else {
      this.queued = this.queued.filter((queuedItem) => queuedItem !== item);
    }
  }
};
