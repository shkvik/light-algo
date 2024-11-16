export class Heap<T> {
  constructor(compareFn?: (a: T, b: T) => boolean) {
    this.compareFn = compareFn ?? ((a: T, b: T) => a > b);
  }

  protected compareFn: (a: T, b: T) => boolean;

  protected data: T[] = [];

  public push(value: T): void {
    this.data.push(value);
    heapifyUp(this.data.length - 1, this.compareFn, this.data);
  }

  public pop(): T | undefined {
    if (this.data.length === 0) {
      return undefined;
    }
    if (this.data.length === 1) {
      return this.data.pop();
    }
    const root = this.data[0];
    const last = this.data.pop();

    if (last !== undefined) {
      this.data[0] = last;
      heapifyDown(0, this.compareFn, this.data);
    }
    return root;
  }

  public top(): T | undefined {
    return this.data.length === 0 ? undefined : this.data[0];
  }

  public size(): number {
    return this.data.length;
  }
}

const heapifyUp = <T>(
  index: number,
  cmpr: (a: T, b: T) => boolean,
  data: Array<T>,
): void => {
  let currIdx = index;
  while (currIdx > 0 && cmpr(data[currIdx], data[Math.floor((currIdx - 1) / 2)])) {
    const parentIdx = Math.floor((currIdx - 1) / 2);
    [data[currIdx], data[parentIdx]] = [data[parentIdx], data[currIdx]]
    currIdx = parentIdx;
  }
}

const heapifyDown = <T>(
  index: number,
  cmpr: (a: T, b: T) => boolean,
  data: Array<T>,
): void => {
  let currIdx = index;

  const left = (idx: number): number => {
    return 2 * idx + 1;
  }
  const right = (idx: number): number => {
    return 2 * idx + 2;
  }
  while (left(currIdx) < data.length) {
    let childIdx = left(currIdx);

    if (right(currIdx) < data.length && cmpr(data[right(currIdx)], data[childIdx])) {
      childIdx = right(currIdx);
    }
    if (cmpr(data[currIdx], data[childIdx])) {
      break;
    }
    [data[currIdx], data[childIdx]] = [data[childIdx], data[currIdx]];
    currIdx = childIdx;
  }
}


