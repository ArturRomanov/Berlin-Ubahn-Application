import { useContext } from "react";
import linesContext from "../../context/Lines/LinesContext";
import { RouteWrapper } from "./RouteStyles";

/**
 * 
 * returns a component which shows a route between stations
 */
export default function Route() {
    const LinesContext = useContext(linesContext);

    return (
        <RouteWrapper>
            {LinesContext.route.length ? LinesContext.route.map((theRoute) => (
                <div className="route" key={theRoute.station}>
                    <div className="action-and-stations">
                        <p><b>Action:</b> {theRoute.action}</p>
                        <p><b>Station:</b> {theRoute.station}</p>
                    </div>
                    <div className="line-container">
                        <div className="line-text">
                            <p><b>Line:</b></p>
                        </div>
                        <div className="line" style={{"backgroundColor": theRoute.line.color}}>
                            {theRoute.line.name}
                        </div>
                    </div>
                </div>
            ))
        : null}
        </RouteWrapper>
    );
}