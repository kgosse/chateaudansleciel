// chateaudansleciel

process.stdin.resume();
process.stdin.setEncoding('ascii');

var input_stdin = "";
var input_stdin_array = "";
var input_currentline = 0;

process.stdin.on('data', function (data) {
    input_stdin += data;
});

process.stdin.on('end', function () {
    input_stdin_array = input_stdin.split("\n");
    main();    
});

function readLine() {
    return input_stdin_array[input_currentline++];
}

/////////////// ignore above this line ////////////////////

let MAX = 500
const UP = 1
const RIGHT = 2
const DOWN = 3
const LEFT = 4

class Point {
    constructor(x, y) {
        this._x = x
        this._y = y
    }

    equals (p) {
        return this._x === p._x && this._y === p._y
    }
    
    toString() {
        return 'x=' + this._x + ' y=' + this._y
    }
}

class Grid {
    constructor({matrix, goalX, goalY, length}) {
        this._matrix = matrix
        this._length = length
        this._goal = new Point(goalX, goalY)
    }

    static make(data, len) {
        let matrix = new Array(len)
        for (let i = 0; i < len; ++i) {
            matrix[i] = new Array(len)
            for (let j = 0; j < len; ++j) {
                if (data[i * len + j] == '.') {
                    matrix[i][j] = 0
                } else {
                    matrix[i][j] = -1
                }
            }
        }
        //console.log(JSON.stringify(matrix))
        return matrix
    }

    static create(grid) {
        return new Grid({
            matrix: Array.from(grid._matrix),
            goalX: grid._goal._x,
            goalY: grid._goal._y,
            length: grid._length
        })
    }

    canMove(p) {
        const n = this._length
        //console.log('  x=' + p._x + ' y=' + p._y)
        if (p._x >= 0 && p._x < n && p._y >= 0 && p._y <= n)
        //console.log('  m[x][y] = ' + this._matrix[p._x][p._y])
        return p._x >= 0 && p._x < n && p._y >= 0 && p._y <= n && this._matrix[p._x][p._y] === 0
    }
    
    isOver(p) {
        //console.log('     isOver: p=' + p + ' g=' + this._goal + ' val=' + this._goal.equals(p))
        return this._goal.equals(p)
    }

    mark(p) {
        this._matrix[p._x][p._y] = 1
    }
}


class Node {
    constructor({ parent, x, y, state, prev }) {
        this._parent = parent;
        this._steps = parent ? parent._steps : 1;
        this._state = state;
        this._pos = new Point(x, y)
        this._prev = parent ? new Point(parent._prev._x, parent._prev._y) : new Point(x, y)        
        this._state.mark(this._pos)
    }

    move(n) {
        //console.log('      p' + this._prev + ' n' + n)
        let p = this.parent ? this.parent.parent : this
        p = !p ? this.parent : p 
        if (p._prev._x != n._x && p._prev._y != n._y) {
            ++this._steps
            //console.log('inc steps: ' + this._steps)
        }
        this._prev = new Point(this._pos._x, this._pos._y)
        this._pos = new Point(n._x, n._y)
        this._state.mark(n)
    }
}

function min(a, b, c, d) {
    const x = a <= b ? a : b
    const y = c <= d ? c : d
    return x <= y ? x : y
}

function handleMove(n, direction) {
    let next = null
    const prev = new Point(n._prev._x, n._prev._y)
    //console.log('    prev: ' + prev)
    switch (direction) {
        case UP:
            next = new Point(n._pos._x - 1, n._pos._y)
            break
        case RIGHT:
            next = new Point(n._pos._x, n._pos._y + 1)
            break
        case DOWN:
            next = new Point(n._pos._x + 1, n._pos._y)
            break
        case LEFT:
            next = new Point(n._pos._x, n._pos._y - 1)
            break
    }
    if (next) {
        //console.log('x = ' + next._x + ' y = ' + next._y)
        if (!n._state.canMove(next)) {
            //console.log('returning MAX')
            return MAX
        }
        n.move(next)
        if (n._state.isOver(n._pos)) {
            //console.log('returning ' + n._steps)
            return n._steps
        }
    } 
    const left = handleMove(new Node({ parent: n, x: n._pos._x, y: n._pos._y, state: Grid.create(n._state)}), LEFT)
    const up = handleMove(new Node({ parent: n, x: n._pos._x, y: n._pos._y, state: Grid.create(n._state)}), UP)
    const right = handleMove(new Node({ parent: n, x: n._pos._x, y: n._pos._y, state: Grid.create(n._state)}), RIGHT)
    const down = handleMove(new Node({ parent: n, x: n._pos._x, y: n._pos._y, state: Grid.create(n._state)}), DOWN)
    return min(left, up, right, down)
}

function minimumMoves(grid, startX, startY, goalX, goalY, n) {
    const r = new Node({
        state: new Grid({
            matrix: Grid.make(grid, n),
            goalX,
            goalY,
            length: n
        }),
        x: startX,
        y: startY
    })
    if (r._state.isOver(r._pos))
        return 0
    const left = handleMove(new Node({ parent: r, x: r._pos._x, y: r._pos._y, state: Grid.create(r._state) }), LEFT)
    const up = handleMove(new Node({ parent: r, x: r._pos._x, y: r._pos._y, state: Grid.create(r._state) }), UP)
    const right = handleMove(new Node({ parent: r, x: r._pos._x, y: r._pos._y, state: Grid.create(r._state) }), RIGHT)
    const down = handleMove(new Node({ parent: r, x: r._pos._x, y: r._pos._y, state: Grid.create(r._state) }), DOWN)
    return min(left, up, right, down)
}

function main() {
    var n = parseInt(readLine())
    MAX = n * n * n
    let mat = new Array(n * n)
    for (let i = 0; i < n; ++i) {
        let grid = readLine();
        for (let j = 0; j < n; ++j) {
            mat[i * n + j] = grid[j]
        }
    }
    var startX_temp = readLine().split(' ');
    var startX = parseInt(startX_temp[0]);
    var startY = parseInt(startX_temp[1]);
    var goalX = parseInt(startX_temp[2]);
    var goalY = parseInt(startX_temp[3]);
    var result = minimumMoves(mat, startX, startY, goalX, goalY, n);
    console.log(result);
}
