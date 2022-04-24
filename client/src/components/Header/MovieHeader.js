import React from "react";
import "./MovieHeader.css";

function MovieHeader({ lookInfo, lookStory, lookTrailer }) {
  const test = () => {
    window.scrollTo(0, 0);
  };
  
  return (
    <div className="movieHeader">
      <button onClick={test}>맨위로</button>
      <button onClick={lookInfo}>정보</button>
      <button onClick={lookStory}>줄거리</button>
      <button onClick={lookTrailer}>예고편</button>
      <button>출연진</button>
      <button>리뷰</button>
    </div>
  );
}

export default MovieHeader;
