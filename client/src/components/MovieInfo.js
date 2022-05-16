import React from "react";
import { useNavigate } from "react-router-dom";
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
  first_air_date,
  origin_country,
  movie,
}) {
  const nav = useNavigate();

  const goCategort = (event) => {
    if (movie === true) {
      nav(`/category/movie/${event.target.textContent}/${event.target.title}`);
    } else {
      nav(`/category/tv/${event.target.textContent}/${event.target.title}`);
    }
  };
  return (
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
          <div className="dataAndTime">
            {`${first_air_date.slice(
              0,
              4
            )} / ${number_of_seasons}시즌  ${number_of_episodes}에피소드  ${
              origin_country.length === 0 ? null : ` / ${origin_country[0]}`
            }`}
          </div>
        ) : (
          <>
            <div className="dataAndTime">
              <div>
                {`${release_date} / ${runtime}분
                ${
                  production_countries.length === 0
                    ? null
                    : ` / ${production_countries[0].iso_3166_1}`
                }`}
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
            <div
              className="genres"
              key={data.id}
              title={data.id}
              onClick={goCategort}
            >
              {data.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default React.memo(MovieInfo);
