import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const SearchInput = styled.input`
  width: 80%;
  height: 35px;
  margin: 1rem 0;
  padding: 0 1rem;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ddd;
`;

const SuggestionBox = styled.div`
  width: 80%;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Suggestion = styled.div`
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f5f5;
    cursor: pointer;
  }
`;

const SearchBar = ({ suggestions, maxSuggestions, onSuggestionClick }) => {
  const [search, setSearch] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  const handleChange = (e) => {
    const searchVal = e.target.value;
    setSearch(searchVal);

    if (searchVal.length > 0) {
      const regex = new RegExp(`^${searchVal}`, "i");
      const filtered = suggestions.sort().filter((v) => regex.test(v));
      setFilteredSuggestions(filtered.slice(0, maxSuggestions));
    } else {
      setFilteredSuggestions([]);
    }
  };

  const handleClick = (suggestion) => {
    setSearch(suggestion);
    setFilteredSuggestions([]);
    onSuggestionClick(suggestion);
  };

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search..."
      />
      {filteredSuggestions.length > 0 && (
        <SuggestionBox>
          {filteredSuggestions.map((suggestion, i) => (
            <Suggestion key={i} onClick={() => handleClick(suggestion)}>
              {suggestion}
            </Suggestion>
          ))}
        </SuggestionBox>
      )}
    </SearchContainer>
  );
};

export default SearchBar;
