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

function predict(concept, max_degree = 50, k = 10) {
  return api.get(`/predict?concept=${concept}&max_degree=${max_degree}&k=${k}`);
}

export { search, getAllConcepts, predict };
