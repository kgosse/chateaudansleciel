import minimumMoves from './chateaudansleciel'

const test31 = {
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

const test32 = {
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

const test41 = {
  length: 4,
  data: [
      '.','.','.','.',
      '.','.','.','X',
      '.','.','.','.',
      '.','.','X','.',
  ],
  startX: 0,
  startY: 0,
  goalX: 3,
  goalY: 3,
  output: 3
}

const test101 = {
    length: 10,
    data: [
        '.','.','.','.','.','.','X','.','.','.',
        '.','.','.','.','.','X','.','.','.','.',
        '.','.','.','X','.','.','.','.','.','.',
        '.','.','X','.','.','.','.','.','.','.',
        '.','.','.','X','.','.','.','.','.','.',
        '.','.','X','.','.','.','.','.','.','.',
        '.','.','.','.','.','X','X','.','.','X',
        'X','.','.','.','.','.','.','.','.','.',
        '.','.','.','.','.','X','.','.','.','.',
        '.','.','.','.','.','.','.','X','.','.',
    ],
    startX: 0,
    startY: 0,
    goalX: 9,
    goalY: 9,
    output: 4
}

var assert = require('assert');
describe('n = 3', function() {
  describe('TEST 3.1', function() {
    it('should return ' + test31.output, function() {
      assert.equal(test31.output, minimumMoves(test31));
    });
  });
  describe('TEST 3.2', function() {
    it('should return ' + test32.output, function() {
      assert.equal(test32.output, minimumMoves(test32));
    });
  });
});
describe('n = 4', function() {
    describe('TEST 4.1', function() {
      it('should return ' + test41.output, function() {
        assert.equal(test41.output, minimumMoves(test41));
      });
    });
  });
describe.skip('n = 10', function() {
    describe('TEST 10.1', function() {
      it('should return ' + test101.output, function() {
        assert.equal(test101.output, minimumMoves(test101));
      });
    });
  });