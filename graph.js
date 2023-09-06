class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let v of vertexArray) this.nodes.add(v);
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);
    if (vertex.adjacent) {
      for (let v of vertex.adjacent) v.adjacent.delete(vertex);
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let visited = new Set();
    let nodeVisited = [start];
    while (nodeVisited.length) {
      let current = nodeVisited.pop();
      visited.add(current.value);
      if (current.adjacent) {
        for (let v of current.adjacent) {
          if (!visited.has(v.value)) {
            nodeVisited.push(v);
          }
        }
      }
    }
    return [...visited];
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let visited = new Set(start.value);
    let nodeVisited = [start.value];
    let current = start;
    while (nodeVisited.length) {
      if (current.adjacent) {
        for (let v of current.adjacent) {
          if (!visited.has(v.value)) {
            visited.add(v.value);
            nodeVisited.push(v);
          }
        }
      }
      current = nodeVisited.shift();
    }
    return [...visited];
  }
}

let graph = new Graph();
// let a = new Node("A");
// let b = new Node("B");
// let c = new Node("C");
// let d = new Node("D");

// graph.addVertex(c);
// graph.addVertices([a, b, d]);

// console.log(graph);
// console.log(graph.nodes.has(a)); // true
// console.log(graph.nodes.has(b)); // true
// console.log(graph.nodes.has(c)); // true

// graph.addEdge(a, b);
// graph.addEdge(a, c);
// graph.addEdge(b, d);
// graph.addEdge(c, d);

// console.log(a.adjacent); // contains b and c
// console.log(b.adjacent); // contains a and d
// console.log(c.adjacent); // contains a and d
// console.log(d.adjacent); // contains b and c

// // graph.removeEdge(b,a)
// // graph.removeEdge(c,d)

// console.log(a.adjacent); // does not contain b
// console.log(b.adjacent); // does not contain a

// console.log(c.adjacent); // does not contain d
// console.log(d.adjacent); // does not contain c

// graph.removeVertex(c);
// graph.removeVertex(d);

// graph.nodes.has(a); // true
// graph.nodes.has(b); // true
// graph.nodes.has(c); // false
// graph.nodes.has(d); // false

let S = new Node("S");
let P = new Node("P");
let U = new Node("U");
let X = new Node("X");
let Q = new Node("Q");
let Y = new Node("Y");
let V = new Node("V");
let R = new Node("R");
let W = new Node("W");
let T = new Node("T");

graph.addVertices([S, P, U, X, Q, Y, V, R, W, T]);

graph.addEdge(S, P);
graph.addEdge(S, U);

graph.addEdge(P, X);
graph.addEdge(U, X);

graph.addEdge(P, Q);
graph.addEdge(U, V);

graph.addEdge(X, Q);
graph.addEdge(X, Y);
graph.addEdge(X, V);

graph.addEdge(Q, R);
graph.addEdge(Y, R);

graph.addEdge(Y, W);
graph.addEdge(V, W);

graph.addEdge(R, T);
graph.addEdge(W, T);
console.log(graph);
// this is one option:
console.log(graph.depthFirstSearch(S)); // ["S", "P", "U", "X", "Q", "V", "Y", "R", "W", "T"]
console.log(graph.breadthFirstSearch(S)); // ["S", "U", "V", "W", "T", "R", "Q", "Y", "X", "P"]

module.exports = { Graph, Node };
