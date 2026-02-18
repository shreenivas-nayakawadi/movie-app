import { useState, useEffect } from "react";
import { BACKDROP_URL, IMAGE_URL, fetchMovieDetails } from "../tmdb";

export default function Modal({ movie, onClose }) {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    if (!movie) return;
    const type = movie.media_type === "tv" || movie.first_air_date ? "tv" : "movie";
    fetchMovieDetails(movie.id, type)
      .then(setDetails)
      .catch(() => {});

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [movie]);

  if (!movie) return null;

  const title = movie.title || movie.name || movie.original_name;
  const backdrop = movie.backdrop_path
    ? `${BACKDROP_URL}${movie.backdrop_path}`
    : null;
  const trailer = details?.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const cast = details?.credits?.cast?.slice(0, 6) || [];
  const genres = details?.genres || [];
  const runtime = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : details?.episode_run_time?.[0]
    ? `${details.episode_run_time[0]}m per ep`
    : null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>✕</button>

        {/* Hero */}
        <div className="modal__hero">
          {trailer ? (
            <iframe
              className="modal__trailer"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=0&showinfo=0`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ) : backdrop ? (
            <img src={backdrop} alt={title} className="modal__backdrop" />
          ) : (
            <div className="modal__backdrop modal__backdrop--empty" />
          )}
          <div className="modal__hero-overlay" />
          <div className="modal__hero-content">
            <h2 className="modal__title">{title}</h2>
            <div className="modal__hero-buttons">
              <button className="banner__btn banner__btn--play">
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Play
              </button>
              <button className="modal__circle-btn">+</button>
              <button className="modal__circle-btn">👍</button>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="modal__info">
          <div className="modal__info-left">
            <div className="modal__meta">
              <span className="modal__match">
                {Math.round((movie.vote_average || 0) * 10)}% Match
              </span>
              <span className="modal__year">
                {(movie.release_date || movie.first_air_date || "").split("-")[0]}
              </span>
              {runtime && <span className="modal__runtime">{runtime}</span>}
              <span className="modal__quality">HD</span>
            </div>
            <p className="modal__overview">{movie.overview}</p>
          </div>
          <div className="modal__info-right">
            {genres.length > 0 && (
              <p className="modal__detail">
                <span className="modal__detail-label">Genres: </span>
                {genres.map((g) => g.name).join(", ")}
              </p>
            )}
            {cast.length > 0 && (
              <p className="modal__detail">
                <span className="modal__detail-label">Cast: </span>
                {cast.map((c) => c.name).join(", ")}
              </p>
            )}
            {details?.vote_average && (
              <p className="modal__detail">
                <span className="modal__detail-label">Rating: </span>
                ⭐ {details.vote_average.toFixed(1)} / 10
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
