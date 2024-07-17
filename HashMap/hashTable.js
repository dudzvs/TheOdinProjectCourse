import { hash } from './genHashCode.js';

export class HashMap {
  constructor(genHashKey = hash, initialCapacity = 7) {
    this.genHashKey = genHashKey;
    this.table = new Array(initialCapacity).fill(null).map(() => []);
    this.capacity = initialCapacity;
    this.size = 0;
    this.loadFactor = 0.75;
  }

  _hash(key) {
    return this.genHashKey(key) % this.table.length;
  }

  set(key, value) {
    if (key != null && value != null) {
      const index = this._hash(key);
      const bucket = this.table[index];

      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket[i][1] = value;
          return;
        }
      }

      bucket.push([key, value]);
      this.size++;

      if (this.size / this.table.length > this.loadFactor) {
        const newCapacity = this.table.length * 2;
        const newTable = new Array(newCapacity).fill(null).map(() => []);

        for (let i = 0; i < this.table.length; i++) {
          const currentBuckets = this.table[i];

          for (let j = 0; j < currentBuckets.length; j++) {
            const [currentKey, currentValue] = currentBuckets[j];
            const newIndex = this._hash(currentKey) % newCapacity;
            newTable[newIndex].push([currentKey, currentValue]);
          }
        }

        this.table = newTable;
        this.capacity = newCapacity;
      }
    }
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1];
      }
    }
    return null;
  }

  has(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    if (this.has(key)) {
      const index = this._hash(key);
      const bucket = this.table[index];

      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i][0] === key) {
          bucket.splice(i, 1);

          this.size--;
          return;
        }
      }
    }
  }

  clear() {
    this.table = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
  }
}
