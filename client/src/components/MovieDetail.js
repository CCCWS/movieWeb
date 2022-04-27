import React from "react";

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
}) {
  return (
    <>
      <div className="movieDetail">
        <div>
          <Image src={`${IMG_URL}original${poster_path}`} />
          <div>{`❤ ${Math.round(popularity)}`}</div>
        </div>

        <div className="detailInfo">
          <div>
            <div className="detailTitle">{title}</div>
            <div className="dataAndTime">{`${release_date} / ${runtime}분`}</div>
          </div>

          <div className="averageScore">
            <div>평균 평점</div>
            <div className="vote_average">{vote_average}</div>
            <div>투표 회원수</div>
            <div className="vote_count">{vote_count}</div>
          </div>

          <div className="detailGenres">
            {genres.map((data) => (
              <div key={data.id}>{data.name}</div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieDetail;
