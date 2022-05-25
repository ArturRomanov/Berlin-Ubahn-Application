import { useContext, Fragment } from "react";
import linesContext from "../../context/Lines/LinesContext";
import { StationsContainerWrapper } from "./StationsContainerStyles";
import Stations from "../Stations/Stations";
import AccessibleLinesAndNextStops from "../AccessibleLinesAndNextStops/AccessibleLinesAndNextStops";

/**
 * 
 * returns a components which returns Stations, AccessibleLinesAndNextStops components with styles
 */
export default function StationsContainer() {
    const LinesContext = useContext(linesContext);

    return (
        <Fragment>
            {LinesContext.stations.length ?
            <StationsContainerWrapper>
                <Stations />
                <AccessibleLinesAndNextStops />
            </StationsContainerWrapper>
            :
            <StationsContainerWrapper style={{"display": "none"}}>
                <Stations />
                <AccessibleLinesAndNextStops />
            </StationsContainerWrapper>
            }
        </Fragment>
    );
}