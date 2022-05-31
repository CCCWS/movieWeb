import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { API_URL, API_KEY, IMG_URL } from "../config";
import { LoadingOutlined, DoubleRightOutlined } from "@ant-design/icons";
import "./AdvancedSearch.css";

function AdvancedSearch() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [today, setToday] = useState();

  const [page, setPage] = useState(1);

  const [genres, setGenres] = useState();
  const [year, setYear] = useState();
  const [type, setType] = useState("movie");
  const [release, setRelease] = useState();

  const getApi = async () => {
    setLoading(true);
    const typeYear =
      type === "movie"
        ? `primary_release_year=${year}&primary_release_date.${release}=${today}`
        : `first_air_date_year=${year}&first_air_date.${release}=${today}`;

    const url = `${API_URL}discover/${type}?api_key=${API_KEY}&language=ko&sort_by=popularity.desc&${typeYear}&page=${page}`;
    const test = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko&region=KR&sort_by=popularity.desc&primary_release_date.lte=2021-05-30`;
    const res = await (await fetch(url)).json();
    setApiData(res.results);
    setLoading(false);
  };

  useEffect(() => {
    getApi();
    getToday();
  }, []);

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }`;
    const day = `${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getMonth()
    }`;

    setToday(`${year}-${month}-${day}`);
  };

  const onType = (event) => {
    setType(event.target.id);
  };

  const onYear = (event) => {
    if (event.target.innerText === year) {
      setYear(undefined);
    } else {
      setYear(event.target.innerText);
    }
  };

  const onRelease = (event) => {
    setRelease(event.target.id);
  };

  const search = () => {
    if (type !== undefined) {
      getApi();
    }
  };

  return (
    <div className="AdvancedSearch">
      <div className="AdvancedSearch-left">
        <div className="AdvancedSearch-option">
          <section className="AdvancedSearch-section">
            <h3>분류</h3>
            <hr />

            <div
              onClick={onType}
              className={[`${type === "movie" ? "year-click" : null}`]}
              id="movie"
            >
              영화
            </div>

            <div
              onClick={onType}
              className={[`${type === "tv" ? "year-click" : null}`]}
              id="tv"
            >
              TV
            </div>
          </section>

          <section className="AdvancedSearch-section">
            <h3>상태</h3>
            <hr />

            <div
              onClick={onRelease}
              className={[`${release === "lte" ? "year-click" : null}`]}
              id="lte"
            >
              공개됨
            </div>

            <div
              onClick={onRelease}
              className={[`${release === "gte" ? "year-click" : null}`]}
              id="gte"
            >
              공개예정
            </div>
          </section>

          <section className="AdvancedSearch-section">
            <h3>연도</h3>
            <hr />
            <div
              onClick={onYear}
              value={2022}
              className={[`${year === "2023" ? "year-click" : null}`].join()}
            >
              2023
            </div>
            <div
              onClick={onYear}
              value={2022}
              className={[`${year === "2022" ? "year-click" : null}`].join()}
            >
              2022
            </div>
            <div
              onClick={onYear}
              value={2015}
              className={[` ${year === "2015" ? "year-click" : null}`].join()}
            >
              2015
            </div>
            <div
              onClick={onYear}
              value={2015}
              className={[` ${year === "2016" ? "year-click" : null}`].join()}
            >
              2016
            </div>
            <div
              onClick={onYear}
              value={2015}
              className={[` ${year === "2017" ? "year-click" : null}`].join()}
            >
              2017
            </div>
          </section>

          <button onClick={search}>찾기</button>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <MovieCard data={apiData} AdvancedSearch={true} />
        </>
      )}
    </div>
  );
}

export default AdvancedSearch;
