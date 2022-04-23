import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { API_KEY, API_URL, IMG_URL } from "../config";

import { Space } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import MovieHeader from "../components/Header/MovieHeader";
import TitleLargeImg from "../components/TitleLargeImg";

import "./Detail.css";

function Detail() {
  const [movieInfo, setMovieInfo] = useState([]); //영화 정보 저장
  const [companies, setcompanies] = useState([]); //영화 제작사 저장
  const [movieActor, setMovieActor] = useState([]); //출연 배우
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);

  const [movieTrailer, setMovieTrailer] = useState([]);

  const { id } = useParams();

  const titleRef = useRef();
  const infoRef = useRef();
  const storyRef = useRef();
  const trailerRef = useRef();

  const info = `${API_URL}movie/${id}?api_key=${API_KEY}&language=ko`; //영화 정보
  const actor = `${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=ko`; //영화 출연 배우
  const reviews = `${API_URL}movie/${id}/reviews?api_key=${API_KEY}`; //영화 리뷰
  const test1 = `${API_URL}person/${"배우id"}?api_key=${API_KEY}`; //배우 상세정보
  const test2 = `${API_URL}person/${"배우id"}/credits?api_key=${API_KEY}`; //배우 출연작
  const test3 = `${API_URL}movie/${id}/similar?api_key=${API_KEY}`; //비슷한 영화?
  const trailer = `${API_URL}movie/${id}/videos?api_key=${API_KEY}`; //트레일러 유튜브

  useEffect(() => {
    getApi();
  }, []);

  const getApi = async () => {
    const getInfo = await (await fetch(info)).json();
    const getActor = await (await fetch(actor)).json();
    const getTrailer = await (await fetch(trailer)).json();

    setMovieInfo(getInfo);
    setcompanies(getInfo.production_companies);
    setGenres(getInfo.genres);
    setMovieActor(getActor.cast.slice(0, 40));
    setMovieTrailer(getTrailer.results);

    setLoading(false);
  };

  const lookTitle = () => {
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const lookInfo = () => {
    infoRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const lookStory = () => {
    storyRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const lookTrailer = () => {
    trailerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const filterCompanies = companies
    .filter((data) => data.logo_path !== null)
    .slice(0, 3);

  const filterMovieTrailer = movieTrailer
    .filter((data) => data.name.indexOf("Trailer") !== -1)
    .slice(0, 1);

  console.log(filterMovieTrailer);
  return (
    <div>
      <MovieHeader
        lookInfo={lookInfo}
        lookStory={lookStory}
        lookTitle={lookTitle}
        lookTrailer={lookTrailer}
      />
      {loading ? (
        <Space className="loadingImg">
          <LoadingOutlined />
        </Space>
      ) : (
        <>
          <div ref={titleRef}>
            <TitleLargeImg IMG_URL={IMG_URL} {...movieInfo} />
          </div>

          <div ref={infoRef} className="movieInfo">
            <div className="movieDetail">
              <div>
                <img src={`${IMG_URL}original${movieInfo.poster_path}`} />
                <div>{`❤ ${Math.round(movieInfo.popularity)}`}</div>
              </div>

              <div className="detailInfo">
                <div>
                  <div className="detailTitle">{movieInfo.title}</div>
                  <div className="dataAndTime">{`${movieInfo.release_date} / ${movieInfo.runtime}분`}</div>
                </div>

                <div className="averageScore">
                  <div>평균 평점</div>
                  <div className="vote_average">{movieInfo.vote_average}</div>
                  <div>투표 회원수</div>
                  <div className="vote_count">{movieInfo.vote_count}</div>
                </div>

                <div className="detailGenres">
                  {genres.map((data) => (
                    <div key={data.id}>{data.name}</div>
                  ))}
                </div>
              </div>
            </div>

            <div ref={storyRef} className="movieStory">
              <div className="section">줄거리</div>
              {movieInfo.overview == "" ? (
                <p className="notInfo"> 정보가 없습니다. </p>
              ) : (
                <>
                  <div className="tagline">{movieInfo.tagline}</div>
                  <p className="overview">{movieInfo.overview}</p>
                </>
              )}
            </div>

            <div ref={trailerRef} className="trailer">
              <div className="section">예고편</div>
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
            </div>
          </div>

          <div className="productionLogo">
            {filterCompanies.map((data) => {
              {
                return data.logo_path === null ? null : (
                  <img
                    key={data.id}
                    src={`${IMG_URL}original${data.logo_path}`}
                  />
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Detail;
