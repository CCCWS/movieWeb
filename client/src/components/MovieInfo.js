import React from "react";

import Logo from "./Logo";
import MovieScore from "./MovieScore";

import { Image } from "antd";
import "./MovieInfo.css";

function MovieInfo({
  poster_path,
  popularity,
  title,
  release_date,
  runtime,
  vote_average,
  genres,
  IMG_URL,
  name,
  number_of_episodes,
  number_of_seasons,
  logoImg,
  production_countries,
}) {
  return (
    <>
      <div className="MovieInfo">
        <div>
          <Image
            className="mainPoster"
            src={poster_path ? `${IMG_URL}original${poster_path}` : null}
          />
          <div>{`❤ ${Math.round(popularity)}`}</div>
        </div>

        <div className="detailInfo ">
          <Logo logoImg={logoImg} />
          <div className={logoImg[0] === undefined ? "logoNot" : "logoHave"}>
            {title} {name}
          </div>

          {release_date === undefined ? (
            <div className="dataAndTime">{`${number_of_seasons}시즌  ${number_of_episodes}에피소드`}</div>
          ) : (
            <>
              <div className="dataAndTime">
                <div>
                  {release_date} / {runtime}분
                  {production_countries[0] == undefined
                    ? null
                    : ` / ${production_countries[0].iso_3166_1}`}
                </div>
              </div>
            </>
          )}

          <div className="averageScore">
            <div>평점</div>
            <MovieScore vote_average={vote_average} />
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

export default React.memo(MovieInfo);
