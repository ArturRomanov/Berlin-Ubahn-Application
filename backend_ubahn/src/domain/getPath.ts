/**
 * algorithm of Dijkstra which returns an object with a distance and path of the stations
 */

export function shortestDistanceNode(
    distances: any, 
    visited: any
    ) {
    // create a default value for shortest
      let shortest = null;
      
        // for each node in the distances object
      for (let node in distances) {
          // if no node has been assigned to shortest yet
            // or if the current node's distance is smaller than the current shortest
          let currentIsShortest =
              shortest === null || distances[node] < distances[shortest];
              
            // and if the current node is in the unvisited set
          if (currentIsShortest && !visited.includes(node)) {
              // update shortest to be the current node
              shortest = node;
          }
      }
      return shortest;
  };
  
export function findShortestPath(
    graph: any, 
    startNode: string, 
    endNode: string
    ): object {
   
    // track distances from the start node using a hash object
    let distances: any = {};
    Object.defineProperty(distances, endNode, { value: "Infinity", writable: true, enumerable: true, configurable: true});
    distances = Object.assign(distances, graph[startNode]);
    // track paths using a hash object
    let theNodes: any = { endNode: null };
    for (let adjacentNode in graph[startNode]) {
     theNodes[adjacentNode] = startNode;
    }
     
    // collect visited nodes
    let visited: string[] = [];
    // find the nearest node
    let node = shortestDistanceNode(distances, visited);
    
    // for that node:
    while (node) {
     // find its distance from the start node & its adjacentNode nodes
     let distance = distances[node];
     let adjacentNodes = graph[node]; 
         
     // for each of those adjacentNode nodes:
     for (let adjacentNode in adjacentNodes) {
     
           // make sure each adjacentNode node is not the start node
           if (String(adjacentNode) === String(startNode)) {
             continue;
           } else {
             // save the distance from the start node to the adjacentNode node
             let newdistance = distance + adjacentNodes[adjacentNode];
             // if there's no recorded distance from the start node to the adjacentNode node in the distances object
             // or if the recorded distance is shorter than the previously stored distance from the start node to the adjacentNode node
             if (!distances[adjacentNode] || distances[adjacentNode] > newdistance) {
                // save the distance to the object
                Object.defineProperty(distances, adjacentNode, { value: newdistance, writable: true, enumerable: true, configurable: true });
                // record the path
                theNodes[adjacentNode] = node;
             } 
            }
      }
        
      // move the current node to the visited set
      visited.push(node);
      // move to the nearest neighbor node
      node = shortestDistanceNode(distances, visited);
    }
     
    // using the stored paths from start node to end node
    // record the shortest path
    let shortestPath = [endNode];
    let theNode = theNodes[endNode];
    while (theNode) {
     shortestPath.push(theNode);
     theNode = theNodes[theNode];
    }
    shortestPath.reverse();
     
    //this is the shortest path
    let results = {
     distance: distances[endNode],
     path: shortestPath,
    };
    // return the shortest path & the end node's distance from the start node
      return results;
   };
