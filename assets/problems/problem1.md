You are given a weighted undirected graph. The vertices are enumerated from $1,$ to $n.$ Your task is to find the shortest path between the vertex $1,$ and the vertex $n.$


---
# Input
The first line contains two integers $n,$ and $m (2  \leq n  \leq 105, 0  \leq m  \leq 105)$, where n is the number of vertices and $m,$ is the number of edges. Following $m$, lines contain one edge each in form $a_i$, $b_i$ and $w_i (1  \leq a_i, b_i  \leq n, 1  \leq w_i  \leq 106)$, where $a_i$, $b_i$ are edge endpoints and wi is the length of the edge.

It is possible that the graph has loops and multiple edges between pair of vertices.

# Output
Write the only integer $-1$ in case of no path. Write the shortest path in opposite case. If there are many solutions, print any of them


---
## Examples
### Sample Input
```
5 6
1 2 2
2 5 5
2 3 4
1 4 1
4 3 3
3 5 1
```

### Sample Output

```
1 4 3 5 
```

### Sample Input
```
5 6
1 2 2
2 5 5
2 3 4
1 4 1
4 3 3
3 5 1
```

### Sample Output

```
1 4 3 5 
```
