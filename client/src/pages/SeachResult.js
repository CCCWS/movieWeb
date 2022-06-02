import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { useInView } from "react-intersection-observer";
import { API_KEY, API_URL, IMG_URL } from "../config";
import MovieCard from "../components/MovieCard";
import { LoadingOutlined, DoubleRightOutlined } from "@ant-design/icons";

import "./SeachResult.css";

function SeachResult() {
  const [readMore, setReadMore] = useInView();
  const { id } = useParams();

  const [movie, setMovie] = useState([]);
  const [movieTotal, setMovieTotal] = useState();
  const [moviePage, setMoviePage] = useState(1);

  const [tv, setTv] = useState([]);
  const [tvTotal, setTvTotal] = useState();
  const [tvPage, setTvPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const [click, setClick] = useState(true);

  const MovieUrl = `${API_URL}search/movie?api_key=${API_KEY}&language=ko&query=${id}&page=${page}&region=KR`;
  const TvUrl = `${API_URL}search/tv?api_key=${API_KEY}&language=ko&query=${id}&page=${page}&region=KR`;

  const getApi = async () => {
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

    const filterTv = getSearchTv.results.filter(
      (data) => data.first_air_date !== ""
    );
    const sortTv = filterTv.sort(function (a, b) {
      return (
        new Date(b.first_air_date).getTime() -
        new Date(a.first_air_date).getTime()
      );
    });

    setMovie(sortMovie);
    setMovieTotal(getSearchMovie.total_results);
    setMoviePage(getSearchMovie.total_pages);

    setTv(sortTv);
    setTvTotal(getSearchTv.total_results);
    setTvPage(getSearchTv.total_pages);

    setLoading(false);
  };

  const getRedaMoreApi = async () => {
    if (click === true) {
      const getSearchMovie = await (await fetch(MovieUrl)).json();

      const filterMovie = getSearchMovie.results.filter(
        (data) => data.release_date !== ""
      );
      const sortMovie = filterMovie.sort(function (a, b) {
        return (
          new Date(b.release_date).getTime() -
          new Date(a.release_date).getTime()
        );
      });
      setMovie([...movie, ...sortMovie]);
    } else if (click === false) {
      const getSearchTv = await (await fetch(TvUrl)).json();

      const filterTv = getSearchTv.results.filter(
        (data) => data.first_air_date !== ""
      );
      const sortTv = filterTv.sort(function (a, b) {
        return (
          new Date(b.first_air_date).getTime() -
          new Date(a.first_air_date).getTime()
        );
      });
      setTv([...tv, ...sortTv]);
    }
  };

  const init = () => {
    setMovie([]);
    setTv([]);
    setLoading(true);
    setClick(true);
    setPage(1);
  };

  useEffect(() => {
    init();
  }, [id]);

  useEffect(() => {
    if (page === 1) {
      getApi();
    } else if (setReadMore === true) {
      getRedaMoreApi();
    }
  }, [page, id]);

  useEffect(() => {
    if (setReadMore === true) {
      setPage((prev) => prev + 1);
    }
  }, [setReadMore]);

  const clickTv = () => {
    setPage(1);
    setClick(false);
  };

  const clickMovie = () => {
    setPage(1);
    setClick(true);
  };

  const goTop = () => {
    window.scrollTo(0, 0);
  };

  const notFound = {
    marginLeft: "5%",
  };

  return (
    <div className="SeachResult">
      <div className="searchValue">{`"${id}" 검색 결과`}</div>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <div className="categort-select-btn">
            <button
              className={[`modalSectionBtn ${click ? null : "close"}`].join(
                " "
              )}
              onClick={clickMovie}
            >
              영화 {movieTotal}
            </button>
            <button
              className={[`modalSectionBtn ${click ? "close" : null}`].join(
                " "
              )}
              onClick={clickTv}
            >
              TV {tvTotal}
            </button>
          </div>

          {click ? (
            <>
              {movieTotal === 0 ? (
                <div style={notFound}>검색 결과가 없습니다.</div>
              ) : (
                <>
                  <MovieCard data={movie} />
                </>
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
            </>
          ) : (
            <>
              {tv.length === 0 ? (
                <div style={notFound}>검색 결과가 없습니다.</div>
              ) : (
                <>
                  <MovieCard data={tv} />
                </>
              )}

              {parseInt(tvPage) <= 1 ? null : (
                <>
                  {parseInt(page) === parseInt(tvPage) ? null : (
                    <div className="showScroll">
                      <DoubleRightOutlined rotate={90} />
                      <div ref={readMore}></div>
                    </div>
                  )}
                </>
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

export default SeachResult;
