import { getGraph } from "../getGraph";
import { lines } from "../../data";
import { graph } from "../../data";

describe("lines graph", () => {
    it(`returns lines graph`, () => {
        const graphTest = getGraph(
            lines
            );
            expect(graphTest).toStrictEqual(graph);

    })
})

