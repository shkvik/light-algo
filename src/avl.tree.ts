class TreeNode<T> {
  constructor(value: T) {
    this.value = value;
    this.height = 1;
  }
  public value: T;
  public height: number;
  public left?: TreeNode<T>;
  public right?: TreeNode<T>;
}

interface AVLTreeIterator<T> extends IteratorObject<T, BuiltinIteratorReturn, unknown> {
  [Symbol.iterator](): AVLTreeIterator<T>;
}

export class AVLTree<T> {
  constructor(compareFn: (a: T, b: T) => number) {
    this.compareFn = compareFn;
  }
  protected compareFn: (a: T, b: T) => number;

  protected root: TreeNode<T>;

  public add(val: T) {
    this.root = insertNode(this.compareFn, this.root, val);
  }

  public delete(val: T) {
    this.root = deleteNode(this.compareFn, this.root, val);
  }

  public has(val: T) {

  }

  public get(val: T) {

  }

  // public entries(): AVLTreeIterator<[number, T]> {

  // }

  public values(): AVLTreeIterator<T> {
    return inOrderTraversal(this.root);
  }

  public [Symbol.iterator](): AVLTreeIterator<T> {
    return inOrderTraversal(this.root);
  }
}

function* inOrderTraversal<T>(node: TreeNode<T> | undefined): IterableIterator<T> {
  // if (node) {
  //   yield* inOrderTraversal(node.left);
  //   yield node.value;
  //   yield* inOrderTraversal(node.right);
  // }
  const stack: Array<TreeNode<T>> = [];
  let current: TreeNode<T> | undefined = node;

  while (current || stack.length > 0) {
    while (current) {
      stack.push(current);
      current = current.left;
    }
    current = stack.pop()!;
    yield current.value;

    current = current.right;
  }
}

const getHeight = <T>(node: TreeNode<T>): number => {
  return node ? node.height : 0;
}

const getBalanceFactor = <T>(node: TreeNode<T>): number => {
  return node ? getHeight(node.left) - getHeight(node.right) : 0;
}

const updateHeight = <T>(node: TreeNode<T>): void => {
  node.height = 1 + Math.max(getHeight(node.left), getHeight(node.right));
}

const rotateRight = <T>(y: TreeNode<T>): TreeNode<T> | undefined => {
  const x = y.left!;
  y.left = x.right;
  x.right = y;

  updateHeight(y);
  updateHeight(x);

  return x;
}

const rotateLeft = <T>(x: TreeNode<T>): TreeNode<T> | undefined => {
  const y = x.right!;
  x.right = y.left;
  y.left = x;

  updateHeight(x);
  updateHeight(y);

  return y;
}


const balance = <T>(node: TreeNode<T>): TreeNode<T> | undefined => {
  updateHeight(node);
  const balanceFactor = getBalanceFactor(node);

  // Левый перекос
  if (balanceFactor > 1) {
    if (getBalanceFactor(node.left) < 0) {
      node.left = rotateLeft(node.left!);
    }
    return rotateRight(node);
  }

  // Правый перекос
  if (balanceFactor < -1) {
    if (getBalanceFactor(node.right) > 0) {
      node.right = rotateRight(node.right!);
    }
    return rotateLeft(node);
  }

  return node;
}

const insertNode = <T>(
  compareFn: (a: T, b: T) => number,
  node: TreeNode<T>, 
  value: T
): TreeNode<T> | undefined => {
  if (!node) return new TreeNode<T>(value);

  if (compareFn(value, node.value) < 0) {
    node.left = insertNode(compareFn, node.left, value);
  } else if (compareFn(value, node.value) > 0) {
    node.right = insertNode(compareFn, node.right, value);
  } else {
    return node; // Дубликаты не вставляем
  }

  return balance(node);
}

const minValueNode = <T>(node: TreeNode<T>): TreeNode<T> | undefined => {
  let current = node;
  while (current.left) {
    current = current.left;
  }
  return current;
}

const deleteNode = <T>(
  compareFn: (a: T, b: T) => number,
  node: TreeNode<T>, 
  value: T
): TreeNode<T> | undefined => {
  if (!node) return null;

  if (compareFn(value, node.value) < 0) {
    node.left = deleteNode(compareFn, node.left, value);
  } else if (compareFn(value, node.value) > 0) {
    node.right = deleteNode(compareFn, node.right, value);
  } else {
    if (!node.left) return node.right;
    if (!node.right) return node.left;

    const temp = minValueNode(node.right);
    node.value = temp.value;
    node.right = deleteNode(compareFn, node.right, temp.value);
  }

  return balance(node);
}