import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useInView } from "react-intersection-observer";
import { API_KEY, API_URL, IMG_URL } from "../config";
import MovieCard from "../components/MovieCard";
import { LoadingOutlined, DoubleRightOutlined } from "@ant-design/icons";

import "./SeachResult.css";

function SeachResultMovie() {
  const nav = useNavigate();
  const [readMore, setReadMore] = useInView();

  const { id } = useParams();
  const [urlId, setUrlId] = useState();

  const [movie, setMovie] = useState([]);
  const [movieTotal, setMovieTotal] = useState();
  const [moviePage, setMoviePage] = useState(1);

  const [tvTotal, setTvTotal] = useState();

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getApi = async () => {
    if (id !== urlId) {
      setUrlId(id);
      setPage(1);
      setLoading(true);
    }
    const MovieUrl = `${API_URL}search/movie?api_key=${API_KEY}&language=ko&query=${id}&page=${page}&region=KR`;
    const TvUrl = `${API_URL}search/tv?api_key=${API_KEY}&language=ko&query=${id}&page=${page}&region=KR`;

    const getSearchMovie = await (await fetch(MovieUrl)).json();
    const getSearchTv = await (await fetch(TvUrl)).json();

    const filterMovie = getSearchMovie.results.filter(
      (data) => data.release_date !== ""
    );

    const sortMovie = filterMovie.sort(function (a, b) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });

    if (setReadMore === true) {
      setMovie([...movie, ...sortMovie]);
    } else {
      setMovie(sortMovie);
    }

    setMovieTotal(getSearchMovie.total_results);
    setMoviePage(getSearchMovie.total_pages);

    setTvTotal(getSearchTv.total_results);

    setLoading(false);
  };

  // useEffect(() => {
  //   setLoading(true);
  //   setPage(1);
  // }, []);

  useEffect(() => {
    console.log(movie);
    getApi();
  }, [id, page]);

  useEffect(() => {
    if (setReadMore === true) {
      setPage((prev) => prev + 1);
    }
  }, [setReadMore]);

  const clickTv = (event) => {
    event.preventDefault();
    nav(`/searchTv/${id}`);
  };

  const goTop = () => {
    window.scrollTo(0, 0);
  };

  const notFound = {
    minWidth: "100%",
    minHeight: "100%",
    display: "flex",
  };

  return (
    <div>
      <div className="searchValue">{`"${id}" 검색 결과`}</div>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <div className="categort-select-btn">
            <button className="modalSectionBtn">영화 {movieTotal}</button>
            <button className="modalSectionBtn close" onClick={clickTv}>
              TV {tvTotal}
            </button>
          </div>

          {movieTotal === 0 ? (
            <div style={notFound}>검색 결과가 없습니다.</div>
          ) : (
            <div className="movieCard movieCardSearch">
              {movie.map((data, index) => (
                <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
              ))}
            </div>
          )}

          {parseInt(moviePage) <= 1 ? null : (
            <>
              {parseInt(page) === parseInt(moviePage) ? null : (
                <div className="showScroll">
                  <DoubleRightOutlined rotate={90} />
                  <div ref={readMore}></div>
                </div>
              )}
            </>
          )}

          {parseInt(page) >= 2 ? (
            <div className="goTop" onClick={goTop}>
              <DoubleRightOutlined rotate={-90} />
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}

export default SeachResultMovie;
