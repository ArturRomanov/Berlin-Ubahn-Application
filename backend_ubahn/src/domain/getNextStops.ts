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
    // to implement during the interview according to the tests
    throw new Error("To implement the cyclic lines");
  }
  else {
    throw new Error("Station is not found");
  }
  throw new Error("getNextStops Error");
}
