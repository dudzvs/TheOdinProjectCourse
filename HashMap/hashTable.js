import { hash } from './genHashCode.js';

export class hashMap {
  constructor(genHashKey = hash, initialCapacity = 7) {
    this.genHashKey = genHashKey;
    this.table = new Array(initialCapacity).fill(null).map(() => []);
    this.capacity = initialCapacity;
  }

  _hash(key) {
    return this.genHashKey(key) % this.table.length;
  }
}
