import React from "react";

import Logo from "./Logo";

import { Image } from "antd";

function MovieDetail({
  poster_path,
  popularity,
  title,
  release_date,
  runtime,
  vote_average,
  vote_count,
  genres,
  IMG_URL,
  name,
  number_of_episodes,
  number_of_seasons,
  logoImg,
  production_countries,
}) {
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
      <div className="movieDetail">
        <div>
          <Image
            className="mainPoster"
            src={poster_path ? `${IMG_URL}original${poster_path}` : null}
          />
          <div>{`❤ ${Math.round(popularity)}`}</div>
        </div>

        <div className="detailInfo">
          <div className="detailTitle">
            <Logo logoImg={logoImg} />
            <div>{title}</div>
          </div>

          {release_date === undefined ? (
            <div className="dataAndTime">{`${number_of_seasons}시즌  ${number_of_episodes}에피소드`}</div>
          ) : (
            <>
              <div className="dataAndTime">
                <div>
                  {release_date} / {runtime}분 /{" "}
                  {production_countries[0].iso_3166_1}
                </div>
              </div>
            </>
          )}

          <div className="averageScore">
            <div>평점</div>
            <div className={[`vote_average ${vote_average_color()}`].join(" ")}>
              {vote_average}
            </div>
          </div>

          <div className="detailGenres">
            {genres.map((data) => (
              <div className="genres" key={data.id}>
                {data.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
