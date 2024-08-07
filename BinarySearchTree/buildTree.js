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

  // Método recursivo para construir a arvore.
  _buildBalanceTree(array) {
    if (array.length === 0) return null;

    const mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this._buildBalanceTree(array.slice(0, mid));
    root.right = this._buildBalanceTree(array.slice(mid + 1));

    return root;
  }

  // Método público para inserir um valor na árvore
  insert(value) {
    this.root = this._insert(this.root, value);
  }

  // Método recursivo interno para inserir um valor em um nó específico
  _insert(node, value) {
    if (node === null) {
      return new Node(value);
    }

    if (value < node.data) {
      node.left = this._insert(node.left, value);
    } else if (value > node.data) {
      node.right = this._insert(node.right, value);
    }

    return node;
  }

  delete(value) {
    this.root = this._deleteNode(this.root, value);
  }

  _deleteNode(node, value) {
    if (node === null) {
      return null;
    }

    if (value > node.data) {
      node.right = this._deleteNode(node.right, value);
      return node;
    } else if (value < node.data) {
      node.left = this._deleteNode(node.left, value);
      return node;
    } else {
      if (!node.left) {
        return node.right;
      }
      if (!node.right) {
        return node.left;
      }

      const minNode = this._findMin(node.right);
      node.data = minNode.data;
      node.right = this._deleteNode(node.right, minNode.data);
    }
    return node;
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left;
    }

    return node;
  }

  prettyPrint(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }
}
