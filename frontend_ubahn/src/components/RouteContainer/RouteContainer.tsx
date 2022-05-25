import { RouteContainerWrapper } from "./RouteContainerStyles";
import RouteSearch from "../RouteSearch/RouteSearch";
import Route from "../Route/Route";

/**
 * 
 * returns a component which returns RouteSearch, Route components with styles
 */
export default function PathContainer() {
    
    return (
        <RouteContainerWrapper>
            <RouteSearch />
            <Route />
        </RouteContainerWrapper>
    );
}