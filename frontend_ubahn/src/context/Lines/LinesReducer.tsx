import { GET_LINES } from "../types";
import { GET_STATIONS } from "../types";
import { GET_ACCESSIBLE_LINES } from "../types";
import { GET_SELECTED_LINE } from "../types";
import { GET_SELECTED_STATION } from "../types";
import { GET_NEXT_STOPS } from "../types";
import { REMOVE_ACCESSIBLE_LINES } from "../types";
import { REMOVE_NEXT_STOPS } from "../types";
import { REMOVE_SELECTED_STATION } from "../types";
import { GET_ROUTE } from "../types";

export default (state: any, action: any) => {
  const { payload, type } = action;

  switch (type) {
    case GET_LINES:
      return {
        ...state,
        lines: payload,
      };
    case GET_SELECTED_LINE:
      return {
        ...state,
        selectedLine: payload,
      };
    case GET_STATIONS:
      return {
        ...state,
        stations: payload,
      };
    case GET_SELECTED_STATION:
      return {
        ...state,
        selectedStation: payload,
      };
    case REMOVE_SELECTED_STATION:
      return {
        ...state,
        selectedStation: payload,
      };
    case GET_ACCESSIBLE_LINES:
      return {
        ...state,
        accessibleLines: payload,
      };
    case REMOVE_ACCESSIBLE_LINES:
      return {
        ...state,
        accessibleLines: payload,
      };
    case GET_NEXT_STOPS:
      return {
        ...state,
        nextStops: payload,
      };
    case REMOVE_NEXT_STOPS:
      return {
        ...state,
        nextStops: payload,
      };
    case GET_ROUTE:
      return {
        ...state,
        route: payload,
      };
    default:
      return state;
  }
};
