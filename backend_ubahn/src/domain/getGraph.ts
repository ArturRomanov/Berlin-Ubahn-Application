import { Line } from "./Line";
import { getAccessibleLines } from "./getAccessibleLines";

/**
 * 
 * returns a graph with nodes of stations and edges of adjacent stations for the algorithm of Dijkstra to find the path 
 * between two stations where the distance is assumed to be equal between the station
 */
 export function getGraph(
    allLines: Line[]
  ): object {
  
    let graph: object = {};
  
    let adjacentStations: object = {};
  
    let distance: number = 1;
  
    let accessibleLines: Line[];
  
    let indexOfStation: number;
  
    // for each line
    for (let i = 0; i < allLines.length; i++) {
      // for each station
      for (let j = 0; j < allLines[i].stations.length; j++) {
        // checks for duplicates
        if (!Object.getOwnPropertyNames(graph).includes(allLines[i].stations[j])) {
          // for the first station the code adds only a forward station and adjacent stations on accessible lines to the graph
          if (j === 0) {
            Object.defineProperty(adjacentStations, allLines[i].stations[j + 1], { value: distance, enumerable: true });
            accessibleLines = getAccessibleLines(allLines[i], allLines[i].stations[j], allLines);
            if (accessibleLines !== []) {
              for (let y = 0; y < accessibleLines.length; y++) {
                indexOfStation = accessibleLines[y].stations.indexOf(allLines[i].stations[j]);
                if (indexOfStation === 0) {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation + 1], { value: distance, enumerable: true });
                }
                else if (indexOfStation === accessibleLines[y].stations.length - 1) {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation - 1], { value: distance, enumerable: true });
                }
                else {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation + 1], { value: distance, enumerable: true });
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation - 1], { value: distance, enumerable: true });
                }
              }
            }
            Object.defineProperty(graph, allLines[i].stations[j], { value: adjacentStations, enumerable: true });
            adjacentStations = {};
          }
          // for the last station the code adds only a backward station and adjacent stations on accessible lines to the graph
          else if (j === allLines[i].stations.length - 1) {
            Object.defineProperty(adjacentStations, allLines[i].stations[j - 1], { value: distance, enumerable: true });
            accessibleLines = getAccessibleLines(allLines[i], allLines[i].stations[j], allLines);
            if (accessibleLines !== []) {
              for (let y = 0; y < accessibleLines.length; y++) {
                indexOfStation = accessibleLines[y].stations.indexOf(allLines[i].stations[j]);
                if (indexOfStation === 0) {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation + 1], { value: distance, enumerable: true });
                }
                else if (indexOfStation === accessibleLines[y].stations.length - 1) {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation - 1], { value: distance, enumerable: true });
                }
                else {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation + 1], { value: distance, enumerable: true });
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation - 1], { value: distance, enumerable: true });
                }
              }
            }
            Object.defineProperty(graph, allLines[i].stations[j], { value: adjacentStations, enumerable: true });
            adjacentStations = {};
          }
          // for the station in the middle the code adds a forward station, a backward stantion and adjacent stations on accessible lines to the graph
          else {
            Object.defineProperty(adjacentStations, allLines[i].stations[j + 1], { value: distance, enumerable: true });
            Object.defineProperty(adjacentStations, allLines[i].stations[j - 1], { value: distance, enumerable: true });
            accessibleLines = getAccessibleLines(allLines[i], allLines[i].stations[j], allLines);
            if (accessibleLines !== []) {
              for (let y = 0; y < accessibleLines.length; y++) {
                indexOfStation = accessibleLines[y].stations.indexOf(allLines[i].stations[j]);
                if (indexOfStation === 0) {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation + 1], { value: distance, enumerable: true });
                }
                else if (indexOfStation === accessibleLines[y].stations.length - 1) {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation - 1], { value: distance, enumerable: true });
                }
                else {
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation + 1], { value: distance, enumerable: true });
                  Object.defineProperty(adjacentStations, accessibleLines[y].stations[indexOfStation - 1], { value: distance, enumerable: true });
                }
              }
            }
            Object.defineProperty(graph, allLines[i].stations[j], { value: adjacentStations, enumerable: true });
            adjacentStations = {};
          }
        }
      }
    }
    return graph;
  }