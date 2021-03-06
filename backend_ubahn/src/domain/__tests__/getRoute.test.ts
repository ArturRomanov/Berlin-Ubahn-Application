import { lines } from "../../data";
import { getRoute } from "../getRoute";

it(`finds route on the same line U7 Siemensdamm -> Jungfernheide`, () => {
  const route = getRoute("Siemensdamm", "Jungfernheide", lines);

  expect(route).toBeDefined();
  expect(route).toHaveLength(2);

  const [enter, exit] = route!;
  expect(enter.action).toBe("enter");
  expect(enter.station).toBe("Siemensdamm");
  expect(enter.line.name).toBe("U7");

  expect(exit.action).toBe("exit");
  expect(exit.station).toBe("Jungfernheide");
  expect(exit.line.name).toBe("U7");
});

it(`works when switching lines in one direction`, () => {
  const route = getRoute("Hohenzollernplatz", "Güntzelstraße", lines);

  expect(route).toBeDefined();
  expect(route).toHaveLength(3);

  const [enter, $switch, exit] = route!;
  expect(enter.action).toBe("enter");
  expect(enter.station).toBe("Hohenzollernplatz");
  expect(enter.line.name).toBe("U3");

  expect($switch.action).toBe("switch");
  expect($switch.station).toBe("Spichernstraße");
  expect($switch.line.name).toBe("U9");

  expect(exit.action).toBe("exit");
  expect(exit.station).toBe("Güntzelstraße");
  expect(exit.line.name).toBe("U9");
});

it(`works when switching lines in another direction`, () => {
  const route = getRoute("Hohenzollernplatz", "Birkenstraße", lines);

  expect(route).toBeDefined();
  expect(route).toHaveLength(3);

  const [enter, $switch, exit] = route!;
  expect(enter.action).toBe("enter");
  expect(enter.station).toBe("Hohenzollernplatz");
  expect(enter.line.name).toBe("U3");

  expect($switch.action).toBe("switch");
  expect($switch.station).toBe("Spichernstraße");
  expect($switch.line.name).toBe("U9");

  expect(exit.action).toBe("exit");
  expect(exit.station).toBe("Birkenstraße");
  expect(exit.line.name).toBe("U9");
});

it(`works when switching lines with several switches`, () => {
  const route = getRoute("Kochstraße", "Yorckstraße", lines);

  expect(route).toBeDefined();
  expect(route).toHaveLength(4);

  const [enter, $switch, $$switch, exit] = route!;
  expect(enter.action).toBe("enter");
  expect(enter.station).toBe("Kochstraße");
  expect(enter.line.name).toBe("U6");

  expect($switch.action).toBe("switch");
  expect($switch.station).toBe("Hallesches Tor");
  expect($switch.line.name).toBe("U3");

  expect($$switch.action).toBe("switch");
  expect($$switch.station).toBe("Möckernbrücke");
  expect($$switch.line.name).toBe("U7");

  expect(exit.action).toBe("exit");
  expect(exit.station).toBe("Yorckstraße");
  expect(exit.line.name).toBe("U7");
});

// ignore these for now - we'll talk about it in the interview
describe("cyclic lines", () => {
  it(`chooses S41 for Westend -> Ostkreuz`, () => {
    const route = getRoute("Westend", "Ostkreuz", lines);

    expect(route).toBeDefined();
    expect(route).toHaveLength(2);

    const [enter, exit] = route!;
    expect(enter.action).toBe("enter");
    expect(enter.station).toBe("Westend");
    expect(enter.line.name).toBe("S41");

    expect(exit.action).toBe("exit");
    expect(exit.station).toBe("Ostkreuz");
    expect(exit.line.name).toBe("S41");
  });

  it(`chooses S42 for Ostkreuz -> Westend`, () => {
    const route = getRoute("Ostkreuz", "Westend", lines);

    expect(route).toBeDefined();
    expect(route).toHaveLength(2);

    const [enter, exit] = route!;
    expect(enter.action).toBe("enter");
    expect(enter.station).toBe("Ostkreuz");
    expect(enter.line.name).toBe("S42");

    expect(exit.action).toBe("exit");
    expect(exit.station).toBe("Westend");
    expect(exit.line.name).toBe("S42");
  });

  it(`works when switching lines`, () => {
    const route = getRoute("Westkreuz", "Hohenzollernplatz", lines);

    expect(route).toBeDefined();
    expect(route).toHaveLength(3);

    const [enter, $switch, exit] = route!;
    expect(enter.action).toBe("enter");
    expect(enter.station).toBe("Westkreuz");
    expect(enter.line.name).toBe("S42");

    expect($switch.action).toBe("switch");
    expect($switch.station).toBe("Heidelberger Platz");
    expect($switch.line.name).toBe("U3");

    expect(exit.action).toBe("exit");
    expect(exit.station).toBe("Hohenzollernplatz");
    expect(exit.line.name).toBe("U3");
  })
});

