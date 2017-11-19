import minimumMoves from './chateaudansleciel'

const test1 = {
    length: 3,
    data: [
        '.','X','X',
        '.','.','.',
        '.','.','.',
    ],
    startX: 0,
    startY: 0,
    goalX: 1,
    goalY: 2,
    output: 2
}

const test2 = {
    length: 3,
    data: [
        'X','.','X',
        '.','.','X',
        '.','.','.',
    ],
    startX: 2,
    startY: 0,
    goalX: 2,
    goalY: 2,
    output: 1
}

var assert = require('assert');
describe('n = 3', function() {
  describe('TEST 1', function() {
    it('should return ' + test1.output, function() {
      assert.equal(test1.output, minimumMoves(test1));
    });
  });
  describe('TEST 2', function() {
    it('should return ' + test2.output, function() {
      assert.equal(test2.output, minimumMoves(test2));
    });
  });
});