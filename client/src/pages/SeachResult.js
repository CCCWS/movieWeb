import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL, IMG_URL } from "../config";
import MovieCard from "../components/MovieCard";
import { LoadingOutlined } from "@ant-design/icons";
import Pagination from "../components/Pagination";
import "./SeachResult.css";

function SeachResult() {
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

  const MovieUrl = `${API_URL}search/movie?api_key=${API_KEY}&language=ko&query=${id}&page=${page}&primary_release_year=`;
  const TvUrl = `${API_URL}search/tv?api_key=${API_KEY}&language=ko&query=${id}&page=${page}`;

  const getApi = async () => {
    setLoading(true);

    const getSearchMovie = await (await fetch(MovieUrl)).json();
    const getSearchTv = await (await fetch(TvUrl)).json();

    const filterMovie = getSearchMovie.results.filter(
      (data) => data.release_date !== ""
    );

    const filterTv = getSearchTv.results.filter(
      (data) => data.first_air_date !== ""
    );

    const sortTv = filterTv.sort(function (a, b) {
      return (
        new Date(b.first_air_date).getTime() -
        new Date(a.first_air_date).getTime()
      );
    });

    const sortMovie = filterMovie.sort(function (a, b) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
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

  useEffect(() => {
    setPage(1);
    setClick(true);
  }, [id]);

  useEffect(() => {
    getApi();
  }, [id, page]);

  useEffect(() => {
    setPage(1);
  }, [click]);

  console.log(movie, page);

  const clickMovie = () => {
    setClick(true);
  };

  const clickTv = () => {
    setClick(false);
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
            <button
              className={[`modalSectionBtn ${click ? null : "close"}`].join()}
              onClick={clickMovie}
            >
              영화 {movieTotal}
            </button>
            <button
              className={[`modalSectionBtn ${click ? "close" : null}`].join()}
              onClick={clickTv}
            >
              TV {tvTotal}
            </button>
          </div>

          {click === true ? (
            <>
              {movieTotal === 0 ? (
                <div style={notFound}>검색 결과가 없습니다.</div>
              ) : (
                <div className="movieCard ">
                  {movie.map((data, index) => (
                    <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <>
              {tv.length === 0 ? (
                <div style={notFound}>검색 결과가 없습니다.</div>
              ) : (
                <div className="movieCard ">
                  {tv.map((data, index) => (
                    <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* {movie.length > 0 || tv.length > 0 ? (
            <div>
              <div className="searchMovie">영화 {movieTotal}</div>
              <hr />
              {movieTotal === 0 ? (
                <div style={notFound}>검색 결과가 없습니다.</div>
              ) : (
                <div className="movieCard ">
                  {movie.map((data, index) => (
                    <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
                  ))}
                </div>
              )}

              <div>
                <div className="searchTv">TV {tv.length}</div>
                <hr />

                {tv.length === 0 ? (
                  <div style={notFound}>검색 결과가 없습니다.</div>
                ) : (
                  <div className="movieCard ">
                    {tv.map((data, index) => (
                      <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div style={notFound}>검색 결과가 없습니다.</div>
          )} */}
          <Pagination
            setPage={setPage}
            page={page}
            totalPage={click ? moviePage : tvPage}
            search={true}
          />
        </>
      )}
    </div>
  );
}

export default React.memo(SeachResult);
