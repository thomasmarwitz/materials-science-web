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

export { search, getAllConcepts };
