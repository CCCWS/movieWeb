import React, { useState } from "react";
import ReactPlayer from "react-player";
import "./Trailer.css";

function Trailer({ movieTrailer, setTrailerModalOpen, setTrailerUrl }) {
  const [playing, setPlaying] = useState(false);
  const filterMovieTrailer = movieTrailer
    .filter(
      (data) =>
        data.name.indexOf("예고") !== -1 || data.name.indexOf("티저") !== -1
    )
    .slice(0, 3);

  const movie = movieTrailer.length > 3 ? filterMovieTrailer : movieTrailer;

  const open = (event) => {
    handlePlayPause();
    setTrailerUrl(event.target.previousSibling.title);
    setTrailerModalOpen(true);
  };

  // const abc = () => {
  //   setPlay(true);
  // };

  const handlePlayPause = () => {
    if(playing === true){
      setPlaying(false);
    
    }
      
    console.log("t", playing);
  };

  const handlePause = () => {
    // setPlaying(false);
    console.log(playing);
  };
  return (
    <>
      <div className="trailerBox">
        {movie[0] === undefined ? (
          <p className="notInfo"> 정보가 없습니다. </p>
        ) : (
          movie.map((data) => (
            <div className="trailer" key={data.id}>
              <ReactPlayer
                title={`https://www.youtube-nocookie.com/embed/${data.key}&enablejsapi=1`}
                className="youtube"
                width="100%"
                controls={true}
                playing={playing}
                muted={true}
                onPause={handlePause}
                url={`https://www.youtube-nocookie.com/embed/${data.key}&enablejsapi=1`}
                allowFullScreen
              />
              <div onClick={open} className="trailerName">
                {data.name}
              </div>
              <button onClick={handlePlayPause}>
                {playing ? "Pause" : "Play"}
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default React.memo(Trailer);
