import React, { useEffect } from "react";
import "./Trailer.css";

function Trailer({ movieTrailer }) {
  const filterMovieTrailer = movieTrailer
    .filter(
      (data) =>
        data.name.indexOf("예고") !== -1 || data.name.indexOf("티저") !== -1
    )
    .slice(0, 3);

    
  const movie = movieTrailer.length > 3 ? filterMovieTrailer : movieTrailer;
  return (
    <div className="trailerBox">
      {movie[0] === undefined ? (
        <p className="notInfo"> 정보가 없습니다. </p>
      ) : (
        movie.map((data) => (
          <div className="trailer" key={data.id}>
            <iframe
              className="youtube"
              src={`https://www.youtube.com/embed/${data.key}`}
              // allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="trailerName">{data.name}</div>
          </div>
        ))
      )}
    </div>
  );
}

export default Trailer;
