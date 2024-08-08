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

  // Método público para deletar um valor específico da árvore.
  // Atualiza a raiz da árvore após a exclusão do nó.
  delete(value) {
    this.root = this._deleteNode(this.root, value);
  }

  // Método auxiliar para deletar um valor específico da árvore utilizando recursão.
  // Retorna o nó atualizado após a exclusão.
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

  height(node) {
    return this._getNodeHeight(node);
  }

  // Método público para encontrar um valor específico na árvore.
  // Inicia a busca chamando o método auxiliar com a raiz da árvore.
  find(value) {
    return this._searchNode(this.root, value);
  }

  levelOrder(callback) {
    if (this.root === null) return null;
    if (!callback) throw new Error("Need a callback");
    const queue = [this.root];

    while (queue.length > 0) {
      const node = queue.shift();

      callback(node);

      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  inOrder(callback) {
    this._inOrderTraverse(this.root, callback);
  }

  postOrder(callback) {
    this._postOrderTraverse(this.root, callback);
  }

  preOrder(callback) {
    this._preOrderTraverse(this.root, callback);
  }

  _preOrderTraverse(node, callback) {
    if (!callback) throw new Error("Need a callback.");
    if (node != null) {
      callback(node.data);
      this._preOrderTraverse(node.left, callback);
      this._preOrderTraverse(node.right, callback);
    }
  }

  _inOrderTraverse(node, callback) {
    if (!callback) throw new Error("Need a callback.");

    if (node != null) {
      this._inOrderTraverse(node.left, callback);
      callback(node.data);
      this._inOrderTraverse(node.right, callback);
    }
  }

  _postOrderTraverse(node, callback) {
    if (!callback) throw new Error("Need a callback.");

    if (node != null) {
      this._postOrderTraverse(node.left, callback);
      this._postOrderTraverse(node.right, callback);
      callback(node.data);
    }
  }

  // Método auxiliar para encontrar um valor específico utilizando recursão.
  // Percorre a árvore binária de busca comparando o valor com os nós.
  _searchNode(node, value) {
    if (!node) {
      return false;
    }

    if (value > node.data) {
      return this._searchNode(node.right, value);
    } else if (value < node.data) {
      return this._searchNode(node.left, value);
    } else {
      return true;
    }
  }

  _getNodeHeight(node) {
    if (node === null) return -1;

    let leftH = this._getNodeHeight(node.left);
    let rightH = this._getNodeHeight(node.right);

    return Math.max(leftH, rightH) + 1;
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
