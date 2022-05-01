const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}
class BinarySearchTree {
  constructor(data) {
    this.head = null;
  }

  root() {
    return this.head;
  }

  add(value) {
    this.head = insertNode(this.head, value);
    function insertNode(node, value) {
      if (!node) {
        return new Node(value);
      }
      if (node.data === value) {
        return node;
      }
      if (value > node.data) {
        node.right = insertNode(node.right, value);
      } else {
        node.left = insertNode(node.left, value);
      }
      return node;
    }
  }

  has(data) {
    return hasData(this.head, data);

    function hasData(node, value) {
      if (!node) {
        return false;
      }
      if (node.data === value) {
        return true;
      }
      if (value < node.data && node.left) {
        return hasData(node.left, value);
      } else {
        return hasData(node.right, value);
      }
    }
  }

  find(data) {
    if (!this.head) return null;

    let current = this.head;
    let found = false;
    while (current && !found) {
      if (data < current.data) {
        current = current.left;
      } else if (data > current.data) {
        current = current.right;
      } else {
        found = current;
      }
    }
    if (!found) return null;
    return found;
  }

  remove(value) {
    this.head = this.removeNode(this.head, value);
  }
  removeNode(current, value) {
    if (!current) return null;
    if (value < current.data) {
      current.left = this.removeNode(current.left, value);
      return current;
    } else if (value > current.data) {
      current.right = this.removeNode(current.right, value);
      return current;
    } else {
      if (!current.left && !current.right) {
        current = null;
        return null;
      }
      if (!current.left) {
        current = current.right;
        return current;
      }
      if (!current.right) {
        current = current.left;
        return current;
      }
    }
    let newNode = minNode(current.right);
    current.data = newNode.data;
    current.right = this.removeNode(current.right, newNode.data);
    return current;

    function minNode(node) {
      if (!node.left) return node;
      return minNode(node.left);
    }
  }

  min() {
    return getMin(this.head);
    function getMin(node) {
      if (!node) return null;
      if (node.left === null) return node.data;
      else {
        return getMin(node.left);
      }
    }
  }

  max() {
    return getMax(this.head);
    function getMax(node) {
      if (!node) return null;
      if (node.right === null) return node.data;
      else {
        return getMax(node.right);
      }
    }
  }
}

module.exports = {
  BinarySearchTree,
};
