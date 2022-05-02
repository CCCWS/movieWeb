import React from "react";
import "./Trailer.css";

function Trailer({ movieTrailer, setTrailerModalOpen, setTrailerUrl }) {
  const filterMovieTrailer = movieTrailer
    .filter(
      (data) =>
        data.name.indexOf("예고") !== -1 || data.name.indexOf("티저") !== -1
    )
    .slice(0, 3);

  const movie = movieTrailer.length > 3 ? filterMovieTrailer : movieTrailer;

  const open = (event) => {
    setTrailerUrl(event.target.previousSibling.src);
    setTrailerModalOpen(true);
  };
  return (
    <>
      <div className="trailerBox">
        {movie[0] === undefined ? (
          <p className="notInfo"> 정보가 없습니다. </p>
        ) : (
          movie.map((data) => (
            <div className="trailer" key={data.id}>
              <iframe
                title="YouTube video player"
                className="youtube"
                src={`https://www.youtube.com/embed/${data.key}`}
                // allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <div onClick={open} className="trailerName">
                {data.name}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default React.memo(Trailer);
