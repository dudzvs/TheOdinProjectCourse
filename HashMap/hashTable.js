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
    return this.genHashKey(key) % this.capacity;
  }

  _resizeTable() {
    const newCapacity = this.table.length * 2;
    const newTable = new Array(newCapacity).fill(null).map(() => []);

    for (const bucket of this.table) {
      for (const [key, value] of bucket) {
        const newIndex = this._hash(key) % newCapacity;
        newTable[newIndex].push([key, value]);
      }
    }
    this.table = newTable;
    this.capacity = newCapacity;
  }

  set(key, value) {
    if (key == null || value == null) return;

    const index = this._hash(key);
    const bucket = this.table[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    bucket.push([key, value]);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this._resizeTable();
    }
  }

  get(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
        return pair[1];
      }
    }
    return null;
  }

  has(key) {
    const index = this._hash(key);
    const bucket = this.table[index];

    for (const pair of bucket) {
      if (pair[0] === key) {
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

  length() {
    return this.size;
  }

  keys() {
    const keys = [];
    for (const bucket of this.table) {
      for (const [key] of bucket) {
        keys.push(key);
      }
    }
    return keys;
  }

  values() {
    const values = [];

    for (const bucket of this.table) {
      for (const [, value] of bucket) {
        values.push(value);
      }
    }
    return values;
  }

  entries() {
    const entries = [];
    for (const bucket of this.table) {
      for (const pair of bucket) {
        entries.push(pair);
      }
    }
    return entries;
  }
}
