import { faker } from "@faker-js/faker";
import { AVLTree } from "../src";

describe('AVLTree', function () {
  const testDataCout = 10;

  const n1 = 5;
  const n2 = 6;
  const n3 = 7;
  const n4 = 8;
  const n5 = 9;

  const nArr = [n1, n2, n3, n4, n5];


  describe('add', () => {
    it('push', () => {
      new Map
      const tree = new AVLTree<number>((a, b) => a - b);
      const testArr = faker.helpers.uniqueArray(
        () => faker.number.int({ min: 0, max: testDataCout }), testDataCout
      );
      for (const elem of testArr){
        tree.add(elem)
      }
      for(const avl of tree) {
        console.log(avl)
      }
      expect(tree).not.toBeUndefined();
    });

    it('delete', () => {
      const tree = new AVLTree<number>((a, b) => a - b);
      const testArr = faker.helpers.uniqueArray(
        () => faker.number.int({ min: 0, max: testDataCout }), testDataCout
      );
      for (const elem of testArr){
        tree.add(elem)
      }
      
      for(const avl of tree.values()) {
        console.log(avl)
      }
      const halfTestDataCout = Math.floor(testDataCout / 2);
      const testRandom = faker.helpers.uniqueArray(
        () => faker.number.int({ min: 0, max: halfTestDataCout }), halfTestDataCout
      );
      
      for (const elem of testRandom){
        tree.delete(elem)
      }
      const check = [];
      for(const avl of tree) {
        check.push(avl)
      }
      console.log(check)
      expect(tree).not.toBeUndefined();
    });
  });
});