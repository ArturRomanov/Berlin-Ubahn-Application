import { findShortestPath } from "../getPath";
import { graph } from "../../data";

describe("find shortest path for the graph", () => {
    it(`returns the shortest path between Hohenzollernplatz and Turmstraße`, () => {
        const shortestPath = findShortestPath(graph, "Hohenzollernplatz", "Turmstraße");
        expect(shortestPath).toStrictEqual({
            distance: 5,
            path: [
              'Hohenzollernplatz',
              'Spichernstraße',
              'Kurfürstendamm',
              'Zoologischer Garten',
              'Hansaplatz',
              'Turmstraße',
            ]
          })
    })

})
