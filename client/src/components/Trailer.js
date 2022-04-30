import React from "react";
import "./Trailer.css";

function Trailer({ movieTrailer }) {
  const filterMovieTrailer = movieTrailer
    .filter((data) => data.name.indexOf("Trailer") !== -1)
    .slice(0, 3);
  return (
    <div className="trailerBox">
      {filterMovieTrailer[0] === undefined ? (
        <p className="notInfo"> 정보가 없습니다. </p>
      ) : (
        filterMovieTrailer.map((data) => (
          <div className="trailer" key={data.id}>
            <iframe
              className="youtube"
              src={`https://www.youtube.com/embed/${data.key}?showinfo=0`}
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
