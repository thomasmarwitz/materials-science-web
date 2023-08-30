import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { generateAbstracts } from "./services/api/client";
import Work from "./Work";
import { CloseButton } from "./styles/CustomComponents";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: sans-serif;
  font-size: 1.5rem;
`;

// This line is important for accessibility reasons.
// You should set the app element to the root of your app.
// Normally it's the element with id 'root' or 'app'.
Modal.setAppElement("#root");

function CombinationModal({ isOpen, closeModal, conceptA, conceptB }) {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [neighborConcepts, setNeighborConcepts] = useState([]);

  useEffect(() => {
    if (!conceptA || !conceptB) {
      return;
    }
    setLoading(true);
    generateAbstracts(conceptA, conceptB).then((r) => {
      setWorks(r.data.abstracts);
      setNeighborConcepts(r.data.neighbor_concepts);
      setLoading(false);
    });
  }, [conceptA, conceptB]);

  console.log(neighborConcepts);

  return (
    <Modal isOpen={isOpen} contentLabel="Combination Modal">
      <CloseButton onClick={closeModal}>
        <FaTimes size={24} />
      </CloseButton>
      <Container>
        <h2>
          {conceptA} & {conceptB}
        </h2>
        {loading && <p>Loading...</p>}
        {works.map((work, index) =>
          Work({ ...work, neighborConcepts, key: index })
        )}
      </Container>
    </Modal>
  );
}

export default CombinationModal;
