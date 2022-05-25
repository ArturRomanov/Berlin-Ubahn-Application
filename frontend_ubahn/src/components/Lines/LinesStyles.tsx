import styled from "styled-components";

export const LinesWrapper = styled.div`

   margin: 1em;
   padding: 1em;
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
   justify-content: left;

   div {

       background-color: grey;
       color: white; 
       margin: 5px;
       padding: 3px;
       width: 31px;
       height: 25px;
       text-align: center;
       vertical-align: middle;
       cursor: pointer;
   }
`
