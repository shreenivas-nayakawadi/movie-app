import { useState, useEffect } from "react";
import { fetchMovies, BACKDROP_URL } from "../tmdb";
import requests from "../tmdb";

export default function Banner({ onMovieClick }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovies(requests.trending).then((movies) => {
      const filtered = movies.filter((m) => m.backdrop_path);
      setMovie(filtered[Math.floor(Math.random() * filtered.length)]);
    });
  }, []);

  if (!movie) return <div className="banner banner--loading" />;

  const title = movie.title || movie.name || movie.original_name;
  const description = movie.overview
    ? movie.overview.length > 200
      ? movie.overview.substring(0, 200) + "..."
      : movie.overview
    : "";

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(${BACKDROP_URL}${movie.backdrop_path})`,
      }}
    >
      <div className="banner__overlay" />
      <div className="banner__content">
        <h1 className="banner__title">{title}</h1>
        <p className="banner__description">{description}</p>
        <div className="banner__buttons">
          <button className="banner__btn banner__btn--play">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Play
          </button>
          <button
            className="banner__btn banner__btn--info"
            onClick={() => onMovieClick(movie)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            More Info
          </button>
        </div>
      </div>
      <div className="banner__fadeBottom" />
    </div>
  );
}
