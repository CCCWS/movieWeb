import React, { useState } from "react";
import ReactPlayer from "react-player/lazy";
import "./Trailer.css";

function Trailer({ movieTrailer, setTrailerModalOpen, setTrailerUrl }) {
  const [mute, setMute] = useState(false);
  const filterMovieTrailer = movieTrailer
    .filter(
      //다음 값이 포함된 인덱스만 필터
      (data) =>
        data.name.indexOf("예고") !== -1 || data.name.indexOf("티저") !== -1
    )
    .slice(0, 3);

  const movie = movieTrailer.length > 3 ? filterMovieTrailer : movieTrailer;
  //트레일러의 갯수가 3개 미만이라면 필터를 사용하지 않음

  const open = (event) => {
    onMute();
    setTrailerUrl(event.target.previousSibling.title);
    setTrailerModalOpen(true);
  };

  const onMute = () => {
    setMute(true); //modal창 띄울시 재생하던 영상을 음소거
  };

  const playing = () => {
    setMute(false); //다시 영상을 재생하면 음소거 해제
  };

  return (
    <>
      <div className="trailerBox">
        {movie.length === 0 ? (
          <p className="notInfo"> 정보가 없습니다. </p>
        ) : (
          movie.map((data) => (
            <div className="trailer" key={data.id}>
              <ReactPlayer
                key={data.id}
                title={`https://www.youtube-nocookie.com/embed/${data.key}`}
                className="youtube"
                width="100%"
                controls={true}
                onPlay={playing}
                muted={mute}
                url={`https://www.youtube-nocookie.com/embed/${data.key}`}
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
