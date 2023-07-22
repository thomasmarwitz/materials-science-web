import React from "react";
import styled from "styled-components";

const ResultBox = styled.div`
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  background: #f5f5f5;
`;

const TrashButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  margin-left: 10px;
  color: #f00;
`;

const SearchResult = ({ result, onDelete }) => {
  return (
    <ResultBox>
      {result}
      <TrashButton onClick={onDelete}>X</TrashButton>
    </ResultBox>
  );
};

export default SearchResult;
