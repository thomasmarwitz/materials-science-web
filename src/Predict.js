import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { predict } from "./services/api/client"; // Import the predict function
import styled from "styled-components";
import CombinationModal from "./CombinationModal";
import { Summary, Details } from "./styles/CustomComponents";

const Loading = styled.div`
  text-align: center;
  margin-top: 50px;
  font-size: 2rem;
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

function Predict() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("concepts");
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const maxDegree = localStorage.getItem("maxDegree") || 25;
  const resultsLengthPredict =
    localStorage.getItem("resultsLengthPredict") || 20;
  const minDepth = localStorage.getItem("minDepth") || "";

  useEffect(() => {
    console.log("Fetching predictions");

    setIsLoading(true);
    const concepts = query.split(",");
    Promise.all(
      concepts.map((concept) =>
        predict(concept, maxDegree, resultsLengthPredict, minDepth)
      )
    )
      .then((results) => {
        setPredictions(results);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, [query]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [conceptA, setConceptA] = useState("");
  const [conceptB, setConceptB] = useState("");

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  const concepts = query.split(",");

  // zip the concepts and predictions together
  const c_and_p = concepts.map((concept, index) => ({
    concept,
    data: predictions[index].data,
  }));

  const combine = (concept_a, concept_b) => {
    setIsModalOpen(true);
    setConceptA(concept_a);
    setConceptB(concept_b);
  };

  return (
    <div>
      <CombinationModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        conceptA={conceptA}
        conceptB={conceptB}
      />
      {c_and_p.map((el, index) => (
        <Details key={index}>
          <Summary>{el.concept}</Summary>
          <table>
            <thead>
              <tr>
                <Th>Concept</Th>
                <Th>Score</Th>
                <Th>Feature</Th>
              </tr>
            </thead>
            <tbody>
              {el.data.map((item, i) => (
                <tr key={i}>
                  <Td>{item.concept}</Td>
                  <Td>{item.score.toFixed(4)}</Td>
                  <Td>
                    <button onClick={() => combine(item.concept, el.concept)}>
                      Combine
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Details>
      ))}
    </div>
  );
}

export default Predict;
