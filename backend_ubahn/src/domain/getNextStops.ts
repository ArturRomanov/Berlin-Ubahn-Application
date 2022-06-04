import { Direction } from "./Direction";
import { Line } from "./Line";
import { LineType } from "./LineType";

/**
 * Computes which stations of a given line follow next after a given station
 *
 * @returns the next `nStops` stations of `line`, counting from `fromStation` and in direction `direction`
 */

export function getNextStops(
  line: Line,
  /**
   * if `forward`, returns the stations that follow `fromStation` in the `line.stations` array.
   *
   * if `backward`, returns the stations that precede `fromStation` in the `line.stations` array.
   */
  direction: Direction,
  /**
   * the maximum number of stops that should be returned
   */
  nStops: number,
  /**
   * which station within `line` to base the computation on
   */
  fromStation: string
): string[] {
  // TODO: implement

  const indexFromStation: number = line.stations.indexOf(fromStation);
  
  // returns an updated array of stations for a linear line
  if (line.type === LineType.Linear && indexFromStation !== -1) {
    // returns an updated array of stations for a linear line with a forward direction of the line
    if (direction === Direction.Forward) {
      // checks if the stations array has sufficient number of elements to return the 
      // updated stations array with nStops, else it slices and returns the updated stations array
      if (indexFromStation < line.stations.length - nStops) {
        return line.stations.filter((station, indexOfStation) => (indexOfStation > indexFromStation && indexOfStation <= indexFromStation + nStops));
      }
      else {
        // checks if the indexFromStation is not the last element in the stations array to slice and return the 
        // updated stations array, else it returns an empty array
        if (indexFromStation < line.stations.length - 1) {
          return line.stations.slice(indexFromStation + 1, line.stations.length);
        }
        else {
          return [];
        }
      }
    }
    // returns an updated array of stations for a linear line with a backward direction of the line
    else if (direction === Direction.Backward) {
      // checks if the stations array has sufficient number of elements to return the 
      // updated stations array with nStops, else it slices and returns the updated stations array
      if (indexFromStation >= nStops) {
        return line.stations.filter((station, indexOfStation) => (indexOfStation < indexFromStation && indexOfStation >= indexFromStation - nStops)).reverse();
      }
      else {
        // checks if the indexFromStation is not the first element in the stations array to slice and return the 
        // updated stations array, else it returns an empty array
        if (indexFromStation > 0) {
          return line.stations.slice(0, indexFromStation).reverse();
        }
        else {
          return [];
        }
      }
    }
  }
  // returns an updated array of stations for a circular line
  else if (line.type === LineType.Cyclic && indexFromStation !== -1) {
    // returns an updated array of stations for a circular line with a circular direction of the line
    if (direction === Direction.Forward) {
      // returns an updated array of stations for nStops more than a length of the circular line, else returns 
      // updated array of stations for nStops equal or less than a length of the circular line
      if (indexFromStation + nStops > line.stations.length - 1) {
        let circledStations: string[] = [];
        let circledStationsCount: number = nStops;
        // updates circledStations array with stations in the first circle
        if (indexFromStation < line.stations.length - 1) {
          circledStations = line.stations.slice(indexFromStation + 1, line.stations.length);
          circledStationsCount = circledStationsCount - (line.stations.length - indexFromStation - 1);
        }
        // updates circledStations array with circles of stations while the number of stations in stations array fits 
        // to the number of the nStops
        while (circledStationsCount >= line.stations.length) {
          circledStations = circledStations.concat(line.stations);
          circledStationsCount -= line.stations.length;
        }
        // updates circledStations array with the remaining stations on a circle
        if (circledStationsCount > 0 && circledStationsCount < line.stations.length) {
          circledStations = circledStations.concat(line.stations.slice(0, circledStationsCount));
          circledStationsCount = circledStationsCount - circledStationsCount;
        }
        return circledStations;
      }
      else {
        return line.stations.slice(indexFromStation + 1, indexFromStation + 1 + nStops);
      }
    }
    else if (direction === Direction.Backward) {

      throw new Error("Backward direction for circled line");
    }
  }
  else {
    throw new Error("Station is not found");
  }
  throw new Error("getNextStops Error");
}
