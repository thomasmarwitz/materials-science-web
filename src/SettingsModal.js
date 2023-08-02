import Modal from "react-modal";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: sans-serif;
  font-size: 1.5rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 10px;
  background: transparent;
  border: none;
  cursor: pointer;
`;

const SettingsField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  margin: 5px 0;
`;

const SettingsLabel = styled.label`
  font-size: 1.25rem;
`;

const SettingsInput = styled.input`
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const SaveButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #5485ed; /* Blue */
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: #ddd; /* Gray */
    cursor: not-allowed;
  }
`;

const Heading = styled.h3`
  font-size: 1.75rem;
  margin: 20px 0 10px 0;
`;

function Settings({ isOpen, closeModal }) {
  const [suggestionLength, setSuggestionLength] = useState(
    localStorage.getItem("suggestionLength") || 5
  );
  const [resultsLengthSearch, setResultsLengthSearch] = useState(
    localStorage.getItem("resultsLengthSearch") || 10
  );

  const [maxDegree, setMaxDegree] = useState(
    localStorage.getItem("maxDegree") || 25
  );

  const [minDepth, setMinDepth] = useState(
    localStorage.getItem("minDepth") || ""
  );

  const [resultsLengthPredict, setResultsLengthPredict] = useState(
    localStorage.getItem("resultsLengthPredict") || 20
  );

  const handleSave = () => {
    localStorage.setItem("suggestionLength", suggestionLength);
    localStorage.setItem("resultsLengthSearch", resultsLengthSearch);
    localStorage.setItem("maxDegree", maxDegree);
    localStorage.setItem("minDepth", minDepth);
    localStorage.setItem("resultsLengthPredict", resultsLengthPredict);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} contentLabel="Settings Modal">
      <CloseButton onClick={closeModal}>
        <FaTimes size={24} />
      </CloseButton>
      <Container>
        <h2>Settings</h2>

        <Heading>Search</Heading>

        <SettingsField>
          <SettingsLabel>Suggestion length</SettingsLabel>
          <SettingsInput
            type="number"
            value={suggestionLength}
            onChange={(e) => setSuggestionLength(e.target.value)}
          />
        </SettingsField>
        <SettingsField>
          <SettingsLabel>Results length</SettingsLabel>
          <SettingsInput
            type="number"
            value={resultsLengthSearch}
            onChange={(e) => setResultsLengthSearch(e.target.value)}
          />
        </SettingsField>

        <Heading>Predict</Heading>

        <SettingsField>
          <SettingsLabel>Max degree</SettingsLabel>
          <SettingsInput
            type="number"
            value={maxDegree}
            onChange={(e) => setMaxDegree(e.target.value)}
          />
        </SettingsField>

        <SettingsField>
          <SettingsLabel>Min depth</SettingsLabel>
          <SettingsInput
            type="number"
            value={minDepth}
            onChange={(e) => setMinDepth(e.target.value)}
          />
        </SettingsField>

        <SettingsField>
          <SettingsLabel>Results length</SettingsLabel>
          <SettingsInput
            type="number"
            value={resultsLengthPredict}
            onChange={(e) => setResultsLengthPredict(e.target.value)}
          />
        </SettingsField>

        <SaveButton onClick={handleSave}>Save</SaveButton>
      </Container>
    </Modal>
  );
}

export default Settings;
