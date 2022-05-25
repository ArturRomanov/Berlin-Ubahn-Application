import { Line } from "./Line";
import { findShortestPath } from "./getPath";
import { graph } from "../data";

export type RouteSegment = {
  /**
   * `enter` = enter to `line` at this `station`
   *
   * `switch` = switch to `line` at this `station`
   *
   * `exit` = exit `line` at `station`
   */

  action: "enter" | "switch" | "exit";
  station: string;
  line: Line;
};

export type Route = RouteSegment[];

/**
 * returns the `Route` from `originStation` to `destinationStation`.
 * If there are multiple possible routes, you can return any of those routes.
 *
 * You can assume `allLines` to be the sample data included in this project, which means you can make the following assumptions:
 *  - all stations are interconnected, so it should always be possible to find a valid Route.
 *  - there's a finite set of stations with a size of around ~100
 *
 * @returns a structure like e.g.
 * ```json
 * [{
 *   "action": "enter",
 *   "station": "Otisstraße",
 *   "line": (U9)
 * }, {
 *   "action": "switch",
 *   "station": "Leopoldplatz",
 *   "line": (U9)
 *  }, {
 *   "action": "exit",
 *   "station": "Hansaplatz",
 *   "line": (U9)
 *  }]
 * ```
 */
export function getRoute(
  originStation: string,
  destinationStation: string,
  allLines: Line[]
): Route {
  // if data for lines is updated, the new graph should be produced using getGraph function 
  // which should be imported from getGraph.ts, while to find the path faster, data graph.json is used for the path
  // const graph: object = getGraph(allLines);

  // find the shortest path between stations whihc returns an object with a distance and an array of stations
  const routeStations: any = findShortestPath(graph, originStation, destinationStation);
  const routeStationsPath: string[] = routeStations.path;

  let route: Route = [];
  let lineStartNode: Line = allLines[0];
  let linesStartNode: Line[] = [];
  let linesNextNode: Line[] = [];
  let linesPreviousNode: Line[] = [];
  let sameLinesPreviousAndNextNode: Line[] = [];

  // the code converts an array of stations to the Route type for the path
  // for each station in the path
  for (let i = 0; i < routeStationsPath.length; i++) {
    // the first station in the path has the same line as the next station
    if (i === 0) {
      linesStartNode = allLines.filter((line) => (line.stations.includes(routeStationsPath[i])));
      linesNextNode = allLines.filter((line) => (line.stations.includes(routeStationsPath[i + 1])));
    for (let j = 0; j < linesStartNode.length; j++) {
      if (linesNextNode.includes(linesStartNode[j])) {
        lineStartNode = linesStartNode[j];
      }
    }
      route.push({action: "enter", station: routeStationsPath[i], line: lineStartNode});
      linesStartNode = [];
      linesNextNode = [];
    }
    // the last station in the path has the same line as the previous station
    else if (i === routeStationsPath.length - 1) {
      linesStartNode = allLines.filter((line) => (line.stations.includes(routeStationsPath[i])));
      linesPreviousNode = allLines.filter((line) => (line.stations.includes(routeStationsPath[i - 1])));
    for (let j = 0; j < linesStartNode.length; j++) {
      if (linesPreviousNode.includes(linesStartNode[j])) {
        lineStartNode = linesStartNode[j];
      }
    }
      route.push({action: "exit", station: routeStationsPath[i], line: lineStartNode});
      linesStartNode = [];
      linesPreviousNode = [];
    }
    // the stations in between are added to the Route path only when they are switch stations which are stations, 
    // where previous and next stations of the stations do not have same lines
    else {
      
      // find lines of the next station and previous station of the station in the path
      linesNextNode = allLines.filter((line) => (line.stations.includes(routeStationsPath[i + 1])));
      linesPreviousNode = allLines.filter((line) => (line.stations.includes(routeStationsPath[i - 1])));
      // push to an array of the same lines of previous and next stations
      for (let j = 0; j < linesNextNode.length; j++) {
        if (linesPreviousNode.includes(linesNextNode[j])) {
          lineStartNode = linesNextNode[j];
          sameLinesPreviousAndNextNode.push(lineStartNode);
        }
      }
      // the switch station is added when previous and next stations of a station in the path do not have the same lines
      if (sameLinesPreviousAndNextNode.length === 0) {
        linesStartNode = allLines.filter((line) => (line.stations.includes(routeStationsPath[i])));
        for (let j = 0; j < linesStartNode.length; j++) {
          if (linesNextNode.includes(linesStartNode[j])) {
            lineStartNode = linesStartNode[j];
          }
        }
        route.push({action: "switch", station: routeStationsPath[i], line: lineStartNode});
      }
      linesStartNode = [];
      linesNextNode = [];
      sameLinesPreviousAndNextNode = [];
    }
  }
  return route;
}