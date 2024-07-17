import { hash } from './genHashCode.js';

export class hashMap {
  constructor(genHashKey = hash, initialCapacity = 7) {
    this.genHashKey = genHashKey;
    this.table = new Array(initialCapacity).fill(null).map(() => []);
    this.capacity = initialCapacity;
    this.size = 0;
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
}
