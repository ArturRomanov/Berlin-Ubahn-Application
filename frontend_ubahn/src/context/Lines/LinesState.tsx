import { useReducer } from "react";
import axios from "axios";
import LinesContext from "./LinesContext";
import LinesReducer from "./LinesReducer";
import { GET_LINES } from "../types";
import { GET_STATIONS } from "../types";
import { GET_ACCESSIBLE_LINES } from "../types";
import { GET_SELECTED_LINE } from "../types";
import { GET_SELECTED_STATION } from "../types";
import { GET_NEXT_STOPS } from "../types";
import { REMOVE_SELECTED_STATION } from "../types";
import { REMOVE_ACCESSIBLE_LINES } from "../types";
import { REMOVE_NEXT_STOPS } from "../types";
import { GET_ROUTE } from "../types";

// the initial state for the LinesState
const LinesState = (props: any) => {
  let initialState = {
    lines: [],
    selectedLine: "",
    stations: [],
    selectedStation: "",
    accessibleLines: [],
    nextStops: [],
    route: [],
  };

  const [state, dispatch] = useReducer(LinesReducer, initialState);

  const apiURL = "http://localhost:8080"

  // gets lines and assigns the lines to the state
  async function getLines() {
    try {
      let res = await axios.get(`${apiURL}/lines`);
      let { data } = res;

      dispatch({ type: GET_LINES, payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  // gets a selected line and assigns the selected line to the state
  async function getSelectedLine(value: string) {
    try {
      dispatch({ type: GET_SELECTED_LINE, payload: value });
    } catch (err) {
      console.error(err);
    }
  };

  // gets stations and assigns the stations to the state
  async function getStations(value: string) {
    try {
      let res = await axios.get(`${apiURL}/lines/${value}`);
      let { data } = res;

      dispatch({ type: GET_STATIONS, payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  // gets a selected station and assigns the selected station to the state
  async function getSelectedStation(value: string) {
    try {
      dispatch({ type: GET_SELECTED_STATION, payload: value });
    } catch (err) {
      console.error(err);
    }
  };

  // removes a selected station and from the state
  async function removeSelectedStation() {
    try {
      dispatch({ type: REMOVE_SELECTED_STATION, payload: "" });
    } catch (err) {
      console.error(err);
    }
  };

  // gets accessible lines and assigns the accessible lines to the state
  async function getAccessibleLines(lineValue: string, stationValue: string) {
    try {
      let res = await axios.get(`${apiURL}/lines/${lineValue}/${stationValue}`);
      let { data } = res;

      dispatch({ type: GET_ACCESSIBLE_LINES, payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  // removes accessible lines from the state
  async function removeAccessibleLines() {
    try {
      dispatch({ type: REMOVE_ACCESSIBLE_LINES, payload: [] });
    } catch (err) {
      console.error(err);
    }
  };

  // gets next stops and assigns the next stops to the state
  async function getNextStops(lineValue: string, stationValue: string, nextStopsValue: string, directionValue: string) {
    try {
      let res = await axios.get(`${apiURL}/lines/${lineValue}/${stationValue}/${nextStopsValue}/${directionValue}`);
      let { data } = res;

      dispatch({ type: GET_NEXT_STOPS, payload: data });
    } catch (err) {
      console.error(err);
    }
  };

  // removes next stops from the state
  async function removeNextStops() {
    try {
      dispatch({ type: REMOVE_NEXT_STOPS, payload: [] });
    } catch (err) {
      console.error(err);
    }
  };

  // gets a route and assigns the route to the state
  async function getRoute(originStationValue: string, destinationStationValue: string) {
    try {
      let response = await axios.get(`${apiURL}/lines/route/${originStationValue}/${destinationStationValue}`);
      let { data } = response;

      dispatch({ type: GET_ROUTE, payload: data});
    }
    catch (err) {
      console.error(err);
    }
  }

  return (
    <LinesContext.Provider
      value={{
        lines: state.lines,
        selectedLine: state.selectedLine,
        stations: state.stations,
        selectedStation: state.selectedStation,
        accessibleLines: state.accessibleLines,
        nextStops: state.nextStops,
        route: state.route,
        getLines,
        getSelectedLine,
        getStations,
        getSelectedStation,
        getAccessibleLines,
        getNextStops,
        removeSelectedStation,
        removeAccessibleLines,
        removeNextStops,
        getRoute,
      }}
    >
      {props.children}
    </LinesContext.Provider>
  );
};

export default LinesState;