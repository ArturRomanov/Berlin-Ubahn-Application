import styled from "styled-components";

export const LinesContainerWrapper = styled.div`

   margin: 1em auto;
   padding: 1em;
   display: flex;
   flex-direction: column;
   justify-content: center;
   border-style: solid;
   border-color: grey;
   max-width: 900px;

   @media(max-width: 900px) {
      margin: 1em;
   }
`