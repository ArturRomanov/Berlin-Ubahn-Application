import { getRequestedLine } from "../getRequestedLine";
import { lines } from "../../data";

describe("lines", () => {
    it(`returns U5 line when the input is U5`, () => {
        const requestedLine = getRequestedLine(
            "U5",
            lines
        );
        expect(requestedLine).toStrictEqual({
            "name": "U5",
            "color": "#7F532D",
            "type": "linear",
            "stations": [
              "Bundestag",
              "Brandenburger Tor",
              "Unter den Linden",
              "Kupfergraben",
              "Museumsinsel",
              "Rotes Rathaus",
              "Alexanderplatz",
              "Schillingstraße",
              "Strausberger Platz",
              "Weberwiese",
              "Frankfurter Tor",
              "Samariterstraße",
              "Frankfurter Allee",
              "Magdalenenstraße",
              "Lichtenberg",
              "Friedrichsfelde",
              "Tierpark",
              "Biesdorf-Süd",
              "Elsterwerdaer Platz",
              "Wuhletal",
              "Kaulsdorf-Nord",
              "Kienberg (Gärten der Welt)",
              "Cottbusser Platz",
              "Hellersdorf",
              "Louis-Lewin-Straße",
              "Hönow"
            ]
          });
    });

    it(`returns undefined when the input is UU5`, () => {
        const requestedLine = getRequestedLine(
            "UU5",
            lines
        );
        expect(requestedLine).toStrictEqual(undefined);
    })
})