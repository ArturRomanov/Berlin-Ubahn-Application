import { useContext } from "react";
import { StationsWrapper } from "./StationsStyles";
import linesContext from "../../context/Lines/LinesContext";

/**
 * 
 * returns a component which shows selectable stations
 */
export default function Stations() {
    const LinesContext = useContext(linesContext);
    // getSelectedStation assigns a selected station to the state,
    // gets accessible lines and next stops in LinesContext,
    // when a station is selected
    function getSelectedStation(value: string): any {
        LinesContext.getSelectedStation(value);
        LinesContext.getAccessibleLines(LinesContext.selectedLine, value);
        LinesContext.getNextStops(LinesContext.selectedLine, value, "3", "forward");
    }

    return (
        <StationsWrapper>
           {LinesContext.stations.length ? LinesContext.stations.map((station) => (
               <div className="station" key={station} style={station === LinesContext.selectedStation ? 
               {"fontWeight": "bold"} : undefined} onClick={() => getSelectedStation(station)}>
                   <p>{station}</p>
               </div>
           ))
           : null}
        </StationsWrapper>
    );
}