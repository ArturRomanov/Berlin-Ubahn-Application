import { createContext } from "react";
import { Line } from "../../types/Line";
import { Route } from "../../types/Route";

interface Context {
    lines: Line[];
    selectedLine: string;
    stations: string[];
    selectedStation: string;
    accessibleLines: Line[];
    nextStops: string[];
    route: Route;
    getLines: () => void;
    getSelectedLine: (value: string) => void;
    getStations: (value: string) => void;
    getSelectedStation: (value: string) => void;
    getAccessibleLines: (lineValue: string, stationValue: string) => void;
    getNextStops: (lineValue: string, stationValue: string, nextStopsValue: string, directionValue: string) => void;
    removeSelectedStation: () => void;
    removeAccessibleLines: () => void;
    removeNextStops: () => void;
    getRoute: (originStationValue: string, destinationStationValue: string) => void;
}

const defaultValue = {
    lines: [],
    selectedLine: "",
    stations: [],
    selectedStation: "",
    accessibleLines: [],
    nextStops: [],
    route: [],
    getLines: () => ([]),
    getSelectedLine: () => ([]),
    getStations: () => ([]),
    getSelectedStation: () => ([]),
    getAccessibleLines: () => ([]),
    getNextStops: () => ([]),
    removeSelectedStation: () => ([]),
    removeAccessibleLines: () => ([]),
    removeNextStops: () => ([]),
    getRoute: () => ([]),
}

const LinesContext = createContext<Context>(defaultValue);

export default LinesContext;