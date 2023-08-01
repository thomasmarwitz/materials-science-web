import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { search } from "./services/api/client";

const Loading = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 2rem;
  font-family: sans-serif;
`;

const ResultsTable = styled.table`
  margin: 50px auto;
  border-collapse: collapse;
  width: 80%;
  text-align: left;
  font-size: 1.6rem;
  font-family: sans-serif;
`;

const Th = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 15px;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 15px;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CalculateButton = styled.button`
  font-size: 1.5rem;
  margin-bottom: 10px;
  border: none;
  border-radius: 25px;
  padding: 10px;
  box-shadow: 0px 0px 15px 4px rgba(0, 0, 0, 0.2);
  &:hover {
    outline: none;
    box-shadow: 0px 0px 15px 4px rgba(66, 135, 245, 0.5);
  }
  background-color: #4287f5; // Button background color
  color: #fff; // Button text color
`;

function getBgColor(score) {
  const ratio = 1 - score / 25;

  const color = `hsl(120, ${ratio * 100}%, 68%)`;
  return color;
}

function Search() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [selectedConcepts, setSelectedConcepts] = useState([]);

  useEffect(() => {
    search({ query, semantic: true, k: 10 })
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query]);

  const handleCheck = (concept) => {
    setSelectedConcepts((prev) => {
      if (prev.includes(concept)) {
        return prev.filter((item) => item !== concept);
      } else {
        return [...prev, concept];
      }
    });
  };

  const handleCalculateScores = () => {
    console.log(selectedConcepts);
    navigate(`/predict?concepts=${selectedConcepts.join(",")}`);
  };

  return (
    <>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <>
          <ResultsTable>
            <thead>
              <tr>
                <Th>Checkbox</Th>
                <Th>Concept</Th>
                <Th>Distance</Th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <Td>
                    <input
                      type="checkbox"
                      onChange={() => handleCheck(result.concept)}
                      style={{ transform: "scale(1.5)" }}
                    />
                  </Td>
                  <Td>{result.concept}</Td>
                  <Td style={{ backgroundColor: getBgColor(result.distance) }}>
                    {result.distance}
                  </Td>
                </tr>
              ))}
            </tbody>
          </ResultsTable>
          <ButtonContainer>
            <CalculateButton onClick={handleCalculateScores}>
              Calculate Scores
            </CalculateButton>
          </ButtonContainer>
        </>
      )}
    </>
  );
}

export default Search;
