import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 60vh;
  padding-top: 30vh; /* adjust to position the search bar on the screen */
`;

const SearchBar = styled.input`
  width: 50vw;
  height: 50px;
  text-align: center;
  font-size: 20px;
  margin-bottom: 10px;
  border: none;
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0px 0px 15px 4px rgba(0, 0, 0, 0.2);
  &:focus {
    outline: none;
    box-shadow: 0px 0px 15px 4px rgba(66, 135, 245, 0.5);
  }
`;

const Suggestions = styled.div`
  width: 50vw;
  background-color: #f1f1f1;
  border-radius: 5px;
  box-shadow: 0px 0px 15px 4px rgba(0, 0, 0, 0.2);
  border-top: none;
  z-index: 99;
  margin-top: 10px;
  font-family: sans-serif;
`;

const SuggestionItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 20px;
  &:hover {
    background-color: #ddd;
  }
`;

function parseSuggestionList(suggestionList) {
  const lookup = {};

  for (let i = 0; i < suggestionList.length; i++) {
    lookup[suggestionList[i].match] = suggestionList[i].count;
  }

  return lookup;
}

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLookup, setSuggestionLookup] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  // Assuming this is your list of suggestions

  useEffect(() => {
    console.log("Fetching suggestions");
    // Fetch the initial list of suggestions when the component mounts
    axios
      .get("http://localhost:8000/search?query=&semantic=false&k=200000")
      .then((response) => {
        const suggestionLookup = parseSuggestionList(response.data);
        setSuggestionLookup(suggestionLookup);
      })
      .catch((error) => console.error("Error fetching suggestions:", error));
  }, []);

  useEffect(() => {
    if (query !== "") {
      const filteredSuggestions = Object.keys(suggestionLookup).filter(
        (suggestion) =>
          suggestion.toLowerCase().indexOf(query.toLowerCase()) > -1
      );

      filteredSuggestions.sort((a, b) => {
        return suggestionLookup[b] - suggestionLookup[a];
      });

      setSuggestions(filteredSuggestions.slice(0, 5));
    } else {
      setSuggestions([]);
    }
  }, [query, suggestionLookup]);

  const onSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/search?query=${query}`);
    }
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    navigate(`/search?query=${suggestion}`);
  };

  return (
    <Container>
      <SearchBar
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={onSearch}
        placeholder={
          isFocused ? "" : "Search for a materials science concept..."
        }
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          console.log(typeof query);
          setIsFocused(query !== "");
        }}
      />
      {suggestions.length > 0 && (
        <Suggestions>
          {suggestions.map((suggestion, index) => (
            <SuggestionItem
              key={index}
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion}
            </SuggestionItem>
          ))}
        </Suggestions>
      )}
    </Container>
  );
}

export default Home;
