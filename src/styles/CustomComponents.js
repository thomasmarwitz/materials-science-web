import styled from "styled-components";

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const Summary = styled.summary`
  font-size: 1.5rem;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: bold;
`;

const Details = styled.details`
  margin-bottom: 30px;
  font-family: sans-serif;
  font-size: 1rem;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 4px rgba(0, 0, 0, 0.2);
`;

export { CloseButton, Summary, Details };
