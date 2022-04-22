import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { API_KEY, API_URL, IMG_URL } from "../config";

import MovieHeader from "../components/Header/MovieHeader";
import TitleLargeImg from "../components/TitleLargeImg";

import "./Detail.css";

function Detail() {
  const [movie, setMovie] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const titleRef = useRef();
  const infoRef = useRef();
  const storyRef = useRef();

  const info = `${API_URL}movie/${id}?api_key=${API_KEY}&language=ko`; //영화 정보
  const actor = `${API_URL}movie/${id}/credits?api_key=${API_KEY}&language=ko`; //영화 출연 배우
  const reviews = `${API_URL}movie/${id}/reviews?api_key=${API_KEY}`; //영화 리뷰
  const test1 = `${API_URL}person/${"배우id"}?api_key=${API_KEY}`; //배우 상세정보
  const test2 = `${API_URL}person/${"배우id"}/credits?api_key=${API_KEY}`; //배우 출연작

  const getMovie = async () => {
    const res = await (await fetch(info)).json();
    setMovie(res);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  const lookTitle = () => {
    titleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const lookInfo = () => {
    infoRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const lookStory = () => {
    storyRef.current.scrollIntoView({ behavior: "smooth" });
  };

  console.log(movie);
  return (
    <>
      <MovieHeader
        lookInfo={lookInfo}
        lookStory={lookStory}
        lookTitle={lookTitle}
      />
      {loading ? null : (
        <>
          <div ref={titleRef}>
            <TitleLargeImg IMG_URL={IMG_URL} {...movie} />
          </div>


          
          <hr />
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <h1>d</h1>
          <div className="productionLogo">
            {movie.production_companies.map((data) => {
              {
                return data.logo_path === null ? null : (
                  <img key={data.id} src={`${IMG_URL}w200${data.logo_path}`} />
                );
              }
            })}
          </div>
        </>
      )}
    </>
  );
}

export default Detail;
