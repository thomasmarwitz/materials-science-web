import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
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

function getBgColor(score) {
  const ratio = 1 - score / 25;

  const color = `hsl(120, ${ratio * 100}%, 68%)`;
  return color;
}

function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    search({ query, semantic: true, k: 30 })
      .then((res) => {
        setResults(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [query]);

  return (
    <>
      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <ResultsTable>
          <thead>
            <tr>
              <Th>Concept</Th>
              <Th>Distance</Th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <Td>{result.concept}</Td>
                <Td style={{ backgroundColor: getBgColor(result.distance) }}>
                  {result.distance}
                </Td>
              </tr>
            ))}
          </tbody>
        </ResultsTable>
      )}
    </>
  );
}

export default Search;
