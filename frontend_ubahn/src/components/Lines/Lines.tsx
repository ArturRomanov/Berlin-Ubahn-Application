import { useContext, useEffect, useState, useRef } from "react";
import { LinesWrapper } from "./LinesStyles";
import linesContext from "../../context/Lines/LinesContext";

/**
 * 
 * returns a components which shows selectable lines
 */
export default function Lines() {
    const LinesContext =  useContext(linesContext);
    const LinesContextUseEffect = useRef(useContext(linesContext));
    const [selectedLine, setSelectedLine] = useState<string>("");
    // useEffect loads lines when a page loads
    useEffect(() => {
        LinesContextUseEffect.current.getLines();
    }, []);
    // getSelectedLines assigns a selected line to a state in LinesContext and in useState to render the component,
    // gets stations for the line in LinesContext and, if a line and a station are already selected, for example,
    // when selecting another line, so that accessibleLines and nextStops have data in LinesContext,
    // removes a selected station, accessible lines and next stops,
    // when a line is selected.
    function getSelectedLines(value: string): any {
        LinesContext.getSelectedLine(value);
        setSelectedLine(value);
        LinesContext.getStations(value);
        if (LinesContext.accessibleLines !== [] && LinesContext.nextStops !== []) {
            LinesContext.removeSelectedStation();
            LinesContext.removeAccessibleLines();
            LinesContext.removeNextStops();
        }
    };

    return (
        <LinesWrapper>
            {LinesContext.lines.length ? LinesContext.lines.map((line) => (
                <div className="line" key={line.name} style={line.name === selectedLine ? 
                {"backgroundColor": line.color, "borderStyle": "solid", "borderColor": "blue"} 
                : {"backgroundColor": line.color}} onClick={() => getSelectedLines(line.name)}>
                    <p><b>{line.name}</b></p>
                </div>
                ))
            : null}
        </LinesWrapper>
    );
}
