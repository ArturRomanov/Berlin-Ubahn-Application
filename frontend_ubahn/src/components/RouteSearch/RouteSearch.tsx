import { useContext, useState } from "react";
import linesContext from "../../context/Lines/LinesContext";
import { RouteSearchWrapper } from "./RouteSearchStyles";

/**
 * 
 * returns a component which shows a route search with inputs for stations and a button for a search
 */
export default function RouteSearch() {
    const LinesContext = useContext(linesContext);
    const [originStation, setOriginStation] = useState<string>("");
    const [destinationStation, setDestinationStation] = useState<string>("");
    // handleOriginStation assigns a value for an origin station in the input to useState
    function handleOriginStation(e: any) {
        const value = e.target.value;
        setOriginStation(value);
    }
    // handleDestinationStation assigns a value for a destination station in the input to useState
    function handleDestinationStation(e: any) {
        const value = e.target.value;
        setDestinationStation(value);
    }
    // handleSubmit gets a route in LinesContext using values of the stations in the useState
    async function handleSubmit(e: any) {
        e.preventDefault();
        LinesContext.getRoute(originStation, destinationStation);
    }

    return (
        <RouteSearchWrapper>
            <h1>Route</h1>
            <input className="search" type="text" onChange={handleOriginStation} placeholder="Origin Station" />
            <input className="search" type="text" onChange={handleDestinationStation} placeholder="Destination Station" />
            <button className="button" type="button" onClick={handleSubmit}>Search Route</button>
        </RouteSearchWrapper>
    );
}