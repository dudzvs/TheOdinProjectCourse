import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  // Method to build the tree(sorted and removing duplicates)
  buildTree(array) {
    const sortedArr = [...new Set(array)].sort((a, b) => a - b);
    return this._buildBalanceTree(sortedArr);
  }

  _buildBalanceTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this._buildBalanceTree(array.slice(0, mid));
    root.right = this._buildBalanceTree(array.slice(mid + 1));

    return root;
  }
}
