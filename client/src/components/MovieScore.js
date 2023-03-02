import React from "react";
import "./MovieScore.css";

function MovieScore({ vote_average, MovieCard }) {
  console.log(vote_average);
  const vote_average_color = () => {
    if (vote_average >= 7) {
      return "vote_average_green";
    }
    if (vote_average < 7 && vote_average >= 5) {
      return "vote_average_yello";
    } else {
      return "vote_average_red";
    }
  };
  return (
    <>
      <div
        className={[
          `vote_average ${vote_average_color()} ${
            MovieCard ? "onMovieCard" : null
          }`,
        ].join(" ")}
      >
        {Math.floor(vote_average * 10)}
      </div>
    </>
  );
}

export default MovieScore;
