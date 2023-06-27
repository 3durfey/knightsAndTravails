let gameBoard = [
  ["a8", "b8", "c8", "d8", "e8", "f8", "g8", "h8"],
  ["a7", "b7", "c7", "d7", "e7", "f7", "g7", "h7"],
  ["a6", "b6", "c6", "d6", "e6", "f6", "g6", "h6"],
  ["a5", "b5", "c5", "d5", "e5", "f5", "g5", "h5"],
  ["a4", "b4", "c4", "d4", "e4", "f4", "g4", "h4"],
  ["a3", "b3", "c3", "d3", "e3", "f3", "g3", "h3"],
  ["a2", "b2", "c2", "d2", "e2", "f2", "g2", "h2"],
  ["a1", "b1", "c1", "d1", "e1", "f1", "g1", "h1"],
];
//class for nodes in graph
class Node {
  constructor(value) {
    this.value = value;
    this.adjacents = new Set();
  }
}
//function to get the index number for a certain input in the gameBoardGraph
function findArrayValue(input) {
  for (x in gameBoardGraph) {
    if (gameBoardGraph[x].value === input) return x;
  }
  return "not found";
}

function populateGraph(input) {
  let startX = null;
  let startY = null;
  const startPoint = gameBoardGraph[findArrayValue(input)];

  //finding coordinates for inputed values
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      if (gameBoard[x][y] === input) {
        startX = x;
        startY = y;
      }
    }
  }
  //check each move and add to graph if valid
  if (startX + 2 < 7 && startY - 1 >= 0) {
    if (!startPoint.adjacents.has(gameBoard[startX + 2][startY - 1])) {
      startPoint.adjacents.add(gameBoard[startX + 2][startY - 1]);
      populateGraph(gameBoard[startX + 2][startY - 1]);
    }
  }
  if (startX + 2 <= 7 && startY + 1 <= 7) {
    if (!startPoint.adjacents.has(gameBoard[startX + 2][startY + 1])) {
      startPoint.adjacents.add(gameBoard[startX + 2][startY + 1]);
      populateGraph(gameBoard[startX + 2][startY + 1]);
    }
  }
  if (startX - 2 >= 0 && startY - 1 >= 0) {
    if (!startPoint.adjacents.has(gameBoard[startX - 2][startY - 1])) {
      startPoint.adjacents.add(gameBoard[startX - 2][startY - 1]);
      populateGraph(gameBoard[startX - 2][startY - 1]);
    }
  }
  if (startX - 2 >= 0 && startY + 1 <= 7) {
    if (!startPoint.adjacents.has(gameBoard[startX - 2][startY + 1])) {
      startPoint.adjacents.add(gameBoard[startX - 2][startY + 1]);
      populateGraph(gameBoard[startX - 2][startY + 1]);
    }
  }
  if (startX + 1 <= 7 && startY + 2 <= 7) {
    if (!startPoint.adjacents.has(gameBoard[startX + 1][startY + 2])) {
      startPoint.adjacents.add(gameBoard[startX + 1][startY + 2]);
      populateGraph(gameBoard[startX + 1][startY + 2]);
    }
  }
  if (startX + 1 <= 7 && startY - 2 >= 0) {
    if (!startPoint.adjacents.has(gameBoard[startX + 1][startY - 2])) {
      startPoint.adjacents.add(gameBoard[startX + 1][startY - 2]);
      populateGraph(gameBoard[startX + 1][startY - 2]);
    }
  }
  if (startX - 1 >= 0 && startY - 2 >= 0) {
    if (!startPoint.adjacents.has(gameBoard[startX - 1][startY - 2])) {
      startPoint.adjacents.add(gameBoard[startX - 1][startY - 2]);
      populateGraph(gameBoard[startX - 1][startY - 2]);
    }
  }
  if (startX - 1 >= 0 && startY + 2 <= 7) {
    if (!startPoint.adjacents.has(gameBoard[startX - 1][startY + 2])) {
      startPoint.adjacents.add(gameBoard[startX - 1][startY + 2]);
      populateGraph(gameBoard[startX - 1][startY + 2]);
    }
  }
  return;
}

//number of nodes
const n = 64;

//intilize graph array and put nodes for each spot
gameBoardGraph = [];
for (x in gameBoard) {
  for (y in gameBoard[x]) gameBoardGraph.push(new Node(gameBoard[x][y]));
}

//find path function
function bfs(start, end) {
  const result = reconstructPath(start, end, solve(start));

  for (x in result) {
    console.log(findCoordinates(result[x]));
  }
  //function to print out the shortest path
  function reconstructPath(start, end, prev) {
    let path = [];
    for (let at = end; true; at = prev[at]) {
      path.push(at);
      if (at === start) break;
    }
    path.reverse();
    if (path[0] === start)
      for (x in path) console.log(findCoordinates(path[x]));
  }
  //find the path using iteration
  function solve(start) {
    let node;
    let queue = [];
    queue.push(start);

    let visited = new Array(n);
    visited.fill(false);

    visited[findArrayValue(start)];
    prev = [n].fill(null);

    while (queue.length >= 1) {
      node = queue.shift();
      let neighbors = gameBoardGraph[findArrayValue(node)].adjacents;

      for (next of neighbors) {
        if (!visited[findArrayValue(next)]) {
          queue.push(next);
          visited[findArrayValue(next)] = true;
          prev[next] = node;
        }
      }
    }
    return prev;
  }
}
function findCoordinates(input) {
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++)
      if (gameBoard[x][y] === input) return `[${x}][${y}]`;
  }
  return "not found";
}
//initialize graph
populateGraph(gameBoard[4][3]);
bfs(gameBoard[0][0], gameBoard[7][7]);
