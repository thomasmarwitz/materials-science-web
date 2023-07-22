import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResult from "./SearchResult";

const App = () => {
  const suggestions = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
  ]; // replace this with your list
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);

  const handleSuggestionClick = (suggestion) => {
    setSelectedSuggestions((prevSuggestions) => [
      ...prevSuggestions,
      suggestion,
    ]);
  };

  const handleDelete = (index) => {
    setSelectedSuggestions((prevSuggestions) =>
      prevSuggestions.filter((s, i) => i !== index)
    );
  };

  return (
    <div className="App">
      <SearchBar
        suggestions={suggestions}
        maxSuggestions={5}
        onSuggestionClick={handleSuggestionClick}
      />
      <hr />
      {selectedSuggestions.map((suggestion, i) => (
        <SearchResult
          key={i}
          result={suggestion}
          onDelete={() => handleDelete(i)}
        />
      ))}
    </div>
  );
};

export default App;
