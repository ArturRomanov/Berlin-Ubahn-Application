import { findShortestPath } from "../getPath";
import { graph } from "../../data";

describe("find shortest path for the graph", () => {
    it(`returns the shortest path between Hohenzollernplatz and Bundesplatz`, () => {
        const shortestPath = findShortestPath(graph, "Hohenzollernplatz", "Bundesplatz");
        expect(shortestPath).toStrictEqual({
            distance: 3,
            path: [
              'Hohenzollernplatz',
              'Spichernstraße',
              'Güntzelstraße',
              'Bundesplatz'
            ]
          })
    })

})
