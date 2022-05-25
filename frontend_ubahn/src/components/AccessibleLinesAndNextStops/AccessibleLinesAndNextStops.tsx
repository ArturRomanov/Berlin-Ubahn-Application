import { useContext } from "react";
import { AccessibleLinesAndNextStopsWrapper } from "./AccessibleLinesAndNextStopsStyles";
import linesContext from "../../context/Lines/LinesContext";

/**
 * 
 * returns a component which shows accessible lines and next stops for a selected station
 */
export default function AccessibleLinesAndNextStops() {
    const LinesContext = useContext(linesContext);

    return (
        <AccessibleLinesAndNextStopsWrapper>
            {LinesContext.selectedStation !== "" ?
            <div className="selected-station">
                <h1>{LinesContext.selectedStation}</h1>
            </div>
            :
            null}
            <div className="line-container">
                {LinesContext.accessibleLines.length ? 
                    <div className="line-access">
                        <p>Access to</p>
                    </div>
                : null}
                {LinesContext.accessibleLines.length ? LinesContext.accessibleLines.map((accessibleLine) => (
                    <div className="line" key={accessibleLine.name} style={{"backgroundColor": accessibleLine.color}}>
                        <p>{accessibleLine.name}</p>
                    </div>
                    ))
                : null}
           </div>
           {LinesContext.nextStops.length ? 
                <div className="next-stops-text">
                    <p><b>Next 3 stops</b></p>
                </div>
           : null}
           {LinesContext.nextStops.length ? LinesContext.nextStops.map((nextStop) => (
               <div className="next-stops" key={nextStop}>
                   <p>{nextStop}</p>
               </div>
                ))
            : null}
        </AccessibleLinesAndNextStopsWrapper>
    );
}
