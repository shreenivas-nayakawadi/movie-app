import { useState, useEffect, useRef } from "react";
import { fetchMovies, IMAGE_URL } from "../tmdb";

export default function Row({ title, fetchUrl, isLargeRow, onMovieClick }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef(null);

  useEffect(() => {
    fetchMovies(fetchUrl).then(setMovies).catch(() => {});
  }, [fetchUrl]);

  const scroll = (direction) => {
    if (rowRef.current) {
      const amount = direction === "left" ? -800 : 800;
      rowRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <div className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__container">
        <button className="row__arrow row__arrow--left" onClick={() => scroll("left")}>
          ‹
        </button>
        <div className="row__posters" ref={rowRef}>
          {movies.map(
            (movie) =>
              (isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path) && (
                <div
                  className={`row__poster-wrapper ${isLargeRow ? "row__poster-wrapper--large" : ""}`}
                  key={movie.id}
                  onClick={() => onMovieClick(movie)}
                >
                  <img
                    className={`row__poster ${isLargeRow ? "row__poster--large" : ""}`}
                    src={`${IMAGE_URL}${isLargeRow ? movie.poster_path : movie.backdrop_path || movie.poster_path}`}
                    alt={movie.title || movie.name}
                    loading="lazy"
                  />
                  <div className="row__poster-hover">
                    <p className="row__poster-title">{movie.title || movie.name}</p>
                    <div className="row__poster-meta">
                      <span className="row__rating">
                        ⭐ {movie.vote_average?.toFixed(1)}
                      </span>
                      <span className="row__year">
                        {(movie.release_date || movie.first_air_date || "").split("-")[0]}
                      </span>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
        <button className="row__arrow row__arrow--right" onClick={() => scroll("right")}>
          ›
        </button>
      </div>
    </div>
  );
}
