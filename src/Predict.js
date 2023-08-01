import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { predict } from "./services/api/client"; // Import the predict function
import styled from "styled-components";

const Loading = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 2rem;
  font-family: sans-serif;
`;

const Summary = styled.summary`
  font-size: 1.5rem;
  cursor: pointer;
  font-family: sans-serif;
  font-weight: bold;
`;

const Th = styled.th`
  border-bottom: 2px solid #ddd;
  padding: 15px;
`;

const Td = styled.td`
  border-bottom: 1px solid #ddd;
  padding: 15px;
`;

function Predict() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("concepts");
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Fetching predictions");

    setIsLoading(true);
    const concepts = query.split(",");
    Promise.all(concepts.map((concept) => predict(concept, 25, 30)))
      .then((results) => {
        setPredictions(results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [query]);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  const concepts = query.split(",");

  // zip the concepts and predictions together
  const c_and_p = concepts.map((concept, index) => ({
    concept,
    data: predictions[index].data,
  }));

  return (
    <div>
      {c_and_p.map((el, index) => (
        <details key={index}>
          <Summary>{el.concept}</Summary>
          <table>
            <thead>
              <tr>
                <Th>Concept</Th>
                <Th>Score</Th>
              </tr>
            </thead>
            <tbody>
              {el.data.map((item, i) => (
                <tr key={i}>
                  <Td>{item.concept}</Td>
                  <Td>{item.score.toFixed(4)}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </details>
      ))}
    </div>
  );
}

export default Predict;
