import express from "express";
import { lines } from "../data";
import { Line, LineNameAndColor } from "../domain/Line";
import { getRequestedLine } from "../domain/getRequestedLine";
import { Direction } from "../domain/Direction";
import { getNextStops } from "../domain/getNextStops";
import { getAccessibleLines } from "../domain/getAccessibleLines";
import { Route, getRoute } from "../domain/getRoute";
import { Routes } from "../models/routes";

const router = express.Router();

router.get(
  "/",
  /**
   * returns an array of line information from the route "/"":
   *
   * ```json
   * {
   *  "name": "string";
   *  "color": "string";
   * }
   * ```
   */
  async function getAllLines(req, res) {
    try {
      const responseItems: LineNameAndColor[] = lines.map((line) => ({
        name: line.name,
        color: line.color,
      }));
      res.send(responseItems);
    }
    catch (err: any) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

router.get(
  "/:id",
  /**
   * returns a specific line by id, e.g. `GET /lines/U8`
   */
  async function getLineById(req, res) {
    try {
      // find the specific line by key
      const requestedLineId: string = req.params.id;

      const requestedLine: Line | undefined = getRequestedLine(requestedLineId, lines);
      if (!requestedLine) {
        res.sendStatus(404);
        return;
      }

      // find the stations of the specific line
      const requestedLineStations: string[] | undefined = requestedLine.stations;

      res.send(requestedLineStations);
    }
    catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// TODO: add further routes here

router.get(
  "/:id/:station/:nextStops/:direction",
  /**
   * returns the next N stops relative to the passed station 
   */
  async function getNextStopsByIdAndStationAndNextStopsAndDirection(req, res) {
    try {
      // convert input arguments for getNextStops from the req params to the required types
      const requestedLineId: string = req.params.id;

      const requestedLine: Line | undefined = getRequestedLine(requestedLineId, lines);
      if (!requestedLine) {
        res.sendStatus(404);
        return;
      }

      const requestedStation: string = req.params.station;

      const nextStopsString: string | undefined = req.params.nextStops;
      let nStops: number;
      const defaultNextStops: number = 3;
      if (typeof nextStopsString === "string") {
        nStops = parseInt(nextStopsString);
      }
      else {
        nStops = defaultNextStops;
      }

      let directionString: string | undefined = req.params.direction;
      let direction: Direction;
      if (directionString === Direction.Forward) {
        direction = Direction.Forward;
      }
      else if (directionString === Direction.Backward) {
        direction = Direction.Backward;
      }
      else {
        direction = Direction.Forward;
      }

      // find the next stops according to the station in the input
      const nextStops: string[] = getNextStops(requestedLine, direction, nStops, requestedStation);

      res.send(nextStops);
    }
    catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get(
  "/:id/:station",
  /**
   * returns accessible lines at the stantion
   */
  async function getAccessibleLinesByIdAndStation(req, res) {
    try {
      const requestedLineId: string = req.params.id;

      const requestedLine: Line | undefined = getRequestedLine(requestedLineId, lines);
      if (!requestedLine) {
        res.sendStatus(404);
        return;
      }

      const requestedStation: string = req.params.station;

      // find accessible lines at the stantion
      const accessibleLines: Line[] = getAccessibleLines(requestedLine, requestedStation, lines);
      
      res.send(accessibleLines);
    }
    catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get(
  "/route/:originStation/:destinationStation", 
  /**
   * returns the path between two stations
   */
  async function getPathByOriginStationAndDestinationStation(req, res) {
    try {
      const originStation: string = req.params.originStation;
      const destinationStation: string = req.params.destinationStation;
      
      //const routes = await Routes.create({ originStation: originStation, destinationStation: destinationStation });

      //const id: number = 0;

      //const deleteRoutes = await Routes.destroy({ where: {id}});

      //const theRoutes = await Routes.findAll();

      //const theRoute = await Routes.findByPk(id);

      //const updateRoutes = await Routes.update({originStation: originStation, destinationStation: destinationStation}, {where: {id}});

      // find the path between the stations
      const route: Route = getRoute(originStation, destinationStation, lines);
      res.send(route);
    }
    catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

export const lineRoutes = router;