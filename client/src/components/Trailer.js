import React from "react";

function Trailer({ movieTrailer }) {
    
  const filterMovieTrailer = movieTrailer
    .filter((data) => data.name.indexOf("Trailer") !== -1)
    .slice(0, 1);


  return (
    <>
      {filterMovieTrailer[0] === undefined ? (
        <p className="notInfo"> 정보가 없습니다. </p>
      ) : (
        <iframe
          className="youtube"
          src={`https://www.youtube.com/embed/${filterMovieTrailer[0].key}?showinfo=0`}
          // allow=" autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </>
  );
}

export default Trailer;
