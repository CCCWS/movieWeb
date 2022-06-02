import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { API_URL, API_KEY, IMG_URL } from "../config";
import { LoadingOutlined, DoubleRightOutlined } from "@ant-design/icons";
import MovieCard from "../components/MovieCard";
import "./AdvancedSearch.css";

function AdvancedSearch() {
  const [readMore, setReadMore] = useInView();

  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [today, setToday] = useState();
  const [totalRearch, setTotalRearch] = useState();

  const [page, setPage] = useState(1);

  const [genres, setGenres] = useState();
  const [year, setYear] = useState();
  const [type, setType] = useState("movie");
  const [release, setRelease] = useState("lte");
  const yearList = [];
  for (let i = 2022; i >= 1990; i--) yearList.push(i);

  const typeYear =
    type === "movie"
      ? `primary_release_year=${year}&primary_release_date.${release}=${today}`
      : `first_air_date_year=${year}&first_air_date.${release}=${today}`;

  const test = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko&region=KR&sort_by=popularity.desc&primary_release_date.lte=2021-05-30`;

  const getApi = async () => {
    setLoading(true);
    const url = `${API_URL}discover/${type}?api_key=${API_KEY}&language=ko&sort_by=popularity.desc&${typeYear}&page=1`;
    const res = await (await fetch(url)).json();
    setTotalRearch(res.total_results);
    setApiData(res.results);
    setLoading(false);
  };

  const readMoreGetApi = async () => {
    const url = `${API_URL}discover/${type}?api_key=${API_KEY}&language=ko&sort_by=popularity.desc&${typeYear}&page=${page}`;
    const res = await (await fetch(url)).json();
    setApiData([...apiData, ...res.results]);
    setLoading(false);
  };

  useEffect(() => {
    getToday();
  }, []);

  useEffect(() => {
    if (setReadMore === true) {
      setPage(page + 1);
    }
  }, [setReadMore]);

  useEffect(() => {
    if (setReadMore === true) {
      readMoreGetApi();
    }
  }, [page]);

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
    if (event.target.innerText === year || event.target.innerText === "ALL") {
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
      console.log(page);
      getApi();
    }
  };

  return (
    <>
      <div className="AdvancedSearch">
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
              className={year === undefined ? "year-click" : null}
            >
              ALL
            </div>

            {yearList.map((data, index) => (
              <div
                key={index}
                onClick={onYear}
                className={[
                  `${parseInt(year) === parseInt(data) ? "year-click" : null}`,
                ].join()}
              >
                {data}
              </div>
            ))}
          </section>

          <button onClick={search}>찾기</button>
        </div>

        {loading ? (
          <div className="loading-search">
            <LoadingOutlined />
          </div>
        ) : (
          <div className="AdvancedSearch-movicCard">
            <div>총 {totalRearch}개 검색</div>
            <MovieCard data={apiData} AdvancedSearch={true} />
          </div>
        )}
      </div>

      {loading ? null : (
        <div className="showScroll">
          <DoubleRightOutlined rotate={90} />
          <div ref={readMore}></div>
        </div>
      )}
    </>
  );
}

export default AdvancedSearch;
