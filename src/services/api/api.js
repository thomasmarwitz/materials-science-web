import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

async function cached_get(url, forceRefresh = false) {
  console.log("Fetching", url);

  if (forceRefresh || !localStorage.getItem(url)) {
    console.log("Not cached, fetching from API");
    const response = await api.get(url);

    const data = JSON.stringify(response);
    console.log("Caching", data);
    localStorage.setItem(url, data);
  }

  return JSON.parse(localStorage.getItem(url));
}

api.cached_get = cached_get;

export default api;
