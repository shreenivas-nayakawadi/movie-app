const API_KEY = "YOUR_TMDB_API_KEY"; // ← Replace with your TMDB API key
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_BASE = "https://image.tmdb.org/t/p";

export const IMAGE_URL = `${IMG_BASE}/w500`;
export const BACKDROP_URL = `${IMG_BASE}/original`;

const requests = {
  trending: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  netflixOriginals: `${BASE_URL}/discover/tv?api_key=${API_KEY}&with_networks=213`,
  topRated: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  action: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  comedy: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  horror: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  romance: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  documentaries: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=99`,
  sciFi: `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=878`,
};

export default requests;

export async function fetchMovies(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch");
  const data = await res.json();
  return data.results;
}

export async function fetchMovieDetails(id, type = "movie") {
  const res = await fetch(
    `${BASE_URL}/${type}/${id}?api_key=${API_KEY}&append_to_response=videos,credits`
  );
  if (!res.ok) throw new Error("Failed to fetch details");
  return res.json();
}
