import styled from "styled-components";

export const AccessibleLinesAndNextStopsWrapper = styled.div`

   margin: 1em;
   padding: 1em;
   display: flex;
   flex-direction: column;
   flex-wrap: wrap;
   justify-content: left;
   
   .selected-station {
       @media(max-width: 375px) {
           h1 { 
            font-size: 25px;
           }
       }
   }

   .line-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 5px 5px 5px 0px;
    padding: 3px 3px 3px 0px;

    .line-access { 
        margin: 5px 5px 5px 0px;
        padding: 3px 3px 3px 0px;
        color: grey;
    }

    .line {
        color: white; 
        margin: 5px;
        padding: 3px;
        width: 37px;
        height: 25px;
        text-align: center;
        vertical-align: middle;
    }
   }
   .next-stops-text {
       color: grey;
       margin: 1px 1px 1px 0px;
       padding: 1px 1px 1px 0px;
   }
   .next-stops {
       color: grey;
   }
`