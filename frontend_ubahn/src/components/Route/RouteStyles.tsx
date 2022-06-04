import styled from "styled-components";

export const RouteWrapper = styled.div`

    margin: 1em;
    padding: 1em;
    justify-content: left;
    color: grey;

    .route {

        .actions-and-station {
            margin: 5px 5px 5px 0px;
            padding: 3px 3px 3px 0px;
        }

        .line-container {
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;

            .line-text {
                margin: 5px 5px 5px 0px;
                padding: 3px 3px 3px 0px;
            }

            .line {
                color: white; 
                margin: 5px 5px 5px 0px;
                padding: 3px 3px 3px 0px;
                width: 37px;
                height: 25px;
                text-align: center;
                vertical-align: middle;
            }
        }
    }
`
