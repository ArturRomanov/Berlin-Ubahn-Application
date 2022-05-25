import { LinesContainerWrapper } from "./LinesContainerStyles";
import Lines from "../Lines/Lines";
import StationsContainer from "../StationsContainer/StationsContainer";
import PathContainer from "../RouteContainer/RouteContainer";

/**
 * 
 * returns the main component in the App which returns Lines, StationContainer, PathContainer components with styles
 */
export default function LinesContainer() {

    return (
        <LinesContainerWrapper>
            <Lines />
            <StationsContainer />
            <PathContainer />
        </LinesContainerWrapper>
    );
}