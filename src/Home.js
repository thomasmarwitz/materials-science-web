import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getAllConcepts } from "./services/api/client";
import { FaCog } from "react-icons/fa";
import Settings from "./SettingsModal";

const SettingsButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 60vh;
  padding-top: 30vh; /* adjust to position the search bar on the screen */
  @media (orientation: portrait) {
    padding-top: 6vh;
  }
`;

const SearchBar = styled.input`
  width: 60vw;
  @media (orientation: portrait) {
    width: 80vw;
  }
  height: 50px;
  text-align: center;
  font-size: 1.5rem;
  @media (orientation: portrait) {
    font-size: 1rem;
  }
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
  width: 60vw;
  @media (orientation: portrait) {
    width: 80vw;
  }
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
    lookup[suggestionList[i].concept] = suggestionList[i].count;
  }

  return lookup;
}

function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [suggestionLookup, setSuggestionLookup] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const suggestionLength = localStorage.getItem("suggestionLength") || 5;

  useEffect(() => {
    console.log("Fetching suggestions");
    // Fetch the initial list of suggestions when the component mounts
    getAllConcepts()
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

      setSuggestions(filteredSuggestions.slice(0, suggestionLength));
    } else {
      setSuggestions([]);
    }
  }, [query, suggestionLookup, suggestionLength]);

  const onSearch = (e) => {
    setShowSuggestions(true);
    if (e.key === "Enter") {
      navigate(`/search?query=${query}`);
    }
  };

  const selectSuggestion = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    navigate(`/search?query=${suggestion}`);
  };

  const openModal = () => {
    setShowSuggestions(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setShowSuggestions(true);
    setIsModalOpen(false);
  };

  return (
    <Container>
      <SettingsButton onClick={openModal}>
        <FaCog size={24} />
      </SettingsButton>
      <Settings isOpen={isModalOpen} closeModal={closeModal} />
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
          setIsFocused(query !== "");
        }}
      />
      {showSuggestions && suggestions.length > 0 && (
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
