import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { API_KEY, API_URL, IMG_URL } from "../config";
import MovieCard from "../components/MovieCard";
import { LoadingOutlined, DoubleRightOutlined } from "@ant-design/icons";

import "./SeachResult.css";

function SeachResultTv() {
  const nav = useNavigate();
  const [readMore, setReadMore] = useInView();
  const { id } = useParams();

  const [movieTotal, setMovieTotal] = useState();

  const [tv, setTv] = useState([]);
  const [tvTotal, setTvTotal] = useState();
  const [tvPage, setTvPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const MovieUrl = `${API_URL}search/movie?api_key=${API_KEY}&language=ko&query=${id}&page=${page}&region=KR`;
  const TvUrl = `${API_URL}search/tv?api_key=${API_KEY}&language=ko&query=${id}&page=${page}&region=KR`;

  const getApi = async () => {
    const getSearchMovie = await (await fetch(MovieUrl)).json();
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

    if (setReadMore === true) {
      setTv([...tv, ...sortTv]);
    } else {
      setTv(sortTv);
    }

    setMovieTotal(getSearchMovie.total_results);

    setTvTotal(getSearchTv.total_results);
    setTvPage(getSearchTv.total_pages);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setPage(1);
    getApi();
  }, [id]);

  useEffect(() => {
    getApi();
  }, [page]);

  useEffect(() => {
    if (setReadMore === true) {
      setPage((prev) => prev + 1);
    }
  }, [setReadMore]);

  const clickMovie = (event) => {
    event.preventDefault();
    nav(`/searchMovie/${id}`);
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
            <button className="modalSectionBtn  close" onClick={clickMovie}>
              영화 {movieTotal}
            </button>
            <button className="modalSectionBtn">TV {tvTotal}</button>
          </div>

          {tv.length === 0 ? (
            <div style={notFound}>검색 결과가 없습니다.</div>
          ) : (
            <div className="movieCard movieCardSearch">
              {tv.map((data, index) => (
                <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
              ))}
            </div>
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

export default SeachResultTv;
