import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL, API_KEY } from "../config";

import "./Category.css";

function Category() {
  const nav = useNavigate();
  const [movieGenre, setMovieGenre] = useState([]);
  const [tvGenre, setTvGenre] = useState([]);
  const [click, setClick] = useState(true);

  const getApi = async () => {
    const movieGenreUrl = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=ko`;
    const tvGenreUrl = `${API_URL}genre/tv/list?api_key=${API_KEY}&language=ko`;

    const resMovie = await (await fetch(movieGenreUrl)).json();
    const resTv = await (await fetch(tvGenreUrl)).json();

    setMovieGenre(resMovie.genres);
    setTvGenre(resTv.genres);
  };

  useEffect(() => {
    getApi();
  }, []);

  const clickMovie = () => {
    setClick(true);
  };

  const clickTv = () => {
    setClick(false);
  };

  const goMovie = (event) => {
    nav(`/category/movie/${event.target.textContent}/${event.target.title}`);
  };

  const goTv = (event) => {
    nav(`/category/tv/${event.target.textContent}/${event.target.title}`);
  };
  return (
    <>
      <div>
        <div className="categort-select-btn">
          <button
            className={[`modalSectionBtn ${click ? null : "close"}`].join()}
            onClick={clickMovie}
          >
            영화
          </button>
          <button
            className={[`modalSectionBtn ${click ? "close" : null}`].join()}
            onClick={clickTv}
          >
            TV
          </button>
        </div>

        <div className="genre-box">
          {click ? (
            <>
              {movieGenre.map((data) => (
                <div
                  onClick={goMovie}
                  title={data.id}
                  className="genre-select"
                  key={data.id}
                  style={{
                    backgroundColor: `rgba(
                    ${Math.ceil(Math.random() * 230)},
                    ${Math.ceil(Math.random() * 230)},
                    ${Math.ceil(Math.random() * 230)})`,
                  }}
                >
                  {data.name}
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ))}
            </>
          ) : (
            <>
              {tvGenre.map((data) => (
                <div
                  onClick={goTv}
                  title={data.id}
                  className="genre-select"
                  key={data.id}
                  style={{
                    backgroundColor: `rgba( 
                    ${Math.ceil(Math.random() * 230)},
                    ${Math.ceil(Math.random() * 230)},
                    ${Math.ceil(Math.random() * 230)})`,
                  }}
                >
                  {data.name}
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Category;
