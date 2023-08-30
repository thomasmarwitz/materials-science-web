import api from "./api";

function search({ query, semantic, k }) {
  let request = `/search?query=${query}&semantic=${semantic}`;
  if (typeof k !== "undefined") {
    request += `&k=${k}`;
  }

  return api.get(request);
}

function getAllConcepts() {
  return search({ query: "", semantic: false });
}

function predict(concept, max_degree = 50, k = 10, minDepth = "") {
  let request = `/predict?concept=${concept}&max_degree=${max_degree}&k=${k}`;

  if (minDepth) {
    request += `&min_depth=${minDepth}`;
  }

  return api.cached_get(request);
}

function generateAbstracts(
  conceptA,
  conceptB,
  k = 3,
  minWords = 100,
  maxWords = 150
) {
  return api.cached_get(
    `/generate_abstracts?concept_a=${conceptA}&concept_b=${conceptB}&k=${k}&min_words=${minWords}&max_words=${maxWords}`
  );
}

export { search, getAllConcepts, predict, generateAbstracts };
