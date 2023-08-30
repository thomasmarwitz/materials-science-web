import React from "react";
import { Summary, Details } from "./styles/CustomComponents";
import styled from "styled-components";

// text should be justified
const Abstract = styled.p`
  font-size: 1.25rem;
  padding-left: 15%;
  padding-right: 15%;
  text-align: justify;
`;

function Work({ title, abstract, key, neighborConcepts }) {
  return (
    <Details key={key}>
      <Summary>{title}</Summary>
      <Abstract>{abstract}</Abstract>
    </Details>
  );
}

export default Work;
