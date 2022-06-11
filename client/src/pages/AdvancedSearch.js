import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { API_URL, API_KEY } from "../config";
import {
  LoadingOutlined,
  DoubleRightOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
import SelectBox from "../components/SelectBox";
import MovieCard from "../components/MovieCard";
import GoTop from "../components/GoTop";
import "./AdvancedSearch.css";

function AdvancedSearch() {
  const [readMore, setReadMore] = useInView();

  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [today, setToday] = useState();
  const [totalRearch, setTotalRearch] = useState();
  const [totalPage, setTotalPage] = useState();
  const [page, setPage] = useState(1);
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState([]);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [year, setYear] = useState([]);
  const [type, setType] = useState("movie");
  const [release, setRelease] = useState("lte");
  const [yearList, setYearList] = useState([]);

  const [scoreGte, setScoreGte] = useState("");
  const [scoreLte, setScoreLte] = useState("");

  const [selectValue, setSelectValue] = useState(0);

  const [optionOpen, setOptionOpen] = useState(false);
  const sortName = [
    {
      name: "인기순",
      sort: "popularity.desc",
    },
    {
      name: "최신순",
      sort:
        type === "movie"
          ? release === "lte"
            ? "primary_release_date.desc"
            : "primary_release_date.asc"
          : release === "lte"
          ? "first_air_date.desc"
          : "first_air_date.asc",
    },
    {
      name: "점수순",
      sort: "vote_average.desc",
    },
  ];

  const typeYear =
    type === "movie"
      ? `primary_release_year=${year.join(
          ","
        )}&primary_release_date.${release}=${today}`
      : `first_air_date_year=${year}&first_air_date.${release}=${today}`;

  const url = `${API_URL}discover/${type}?api_key=${API_KEY}&language=ko&sort_by=${sortBy}&${typeYear}&with_genres=${genre.join(
    ","
  )}&vote_average.gte=${
    scoreGte !== "" ? scoreGte / 10 : ""
  }&vote_average.lte=${scoreLte !== "" ? scoreLte / 10 : ""}`;

  const url1 = `${API_URL}discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=ko&region=KR`;

  const getGenres = async () => {
    const url = `${API_URL}genre/${type}/list?api_key=${API_KEY}&language=ko`;
    const res = await (await fetch(url)).json();
    setGenres(res.genres);
  };

  const getApi = async () => {
    setLoading(true);
    const getUrl = `${url}&page=1`;
    const res = await (await fetch(getUrl)).json();
    setTotalRearch(res.total_results);
    setTotalPage(res.total_pages);
    setApiData(res.results);
    setLoading(false);
  };

  const readMoreGetApi = async () => {
    const getUrl = `${url}&page=${page}`;
    const res = await (await fetch(getUrl)).json();
    setApiData([...apiData, ...res.results]);
    setLoading(false);
  };

  const init = () => {
    setScoreGte("");
    setScoreLte("");
    setYear([]);
    setGenre([]);
    setPage(1);
    setRelease("lte");
  };

  useEffect(() => {
    getToday();
  }, []);

  useEffect(() => {
    getApi();
  }, [today, year, genre, scoreGte, scoreLte]);

  useEffect(() => {
    init();
    getGenres();
  }, [type]);

  useEffect(() => {
    pushYear();
    setYear([]);
  }, [release]);

  useEffect(() => {
    if (totalRearch !== undefined) {
      setPage(1);
      getApi();
    }
  }, [sortBy]);

  useEffect(() => {
    if (setReadMore === true) {
      setPage((prev) => prev + 1);
    }
  }, [setReadMore]);

  useEffect(() => {
    if (setReadMore === true) {
      readMoreGetApi();
    }
  }, [page]);

  const pushYear = () => {
    const year = [];
    const start = release === "lte" ? 2022 : 2030;
    const end = release === "lte" ? 1991 : 2022;
    for (let i = start; i >= end; i--) {
      year.push(i);
    }
    setYearList(year);
  };

  const getToday = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${
      date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
    }`;
    const day = `${
      date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
    }`;

    setToday(`${year}-${month}-${day}`);
  };

  const onType = (event) => {
    setType(event.target.id);
  };

  const onYear = (event) => {
    if (event.target.innerText === "ALL") {
      setYear([]);
    } else {
      if (year.includes(String(event.target.innerText))) {
        setYear(year.filter((data) => data !== String(event.target.innerText)));
      } else {
        if (type === "movie") {
          setYear([...year, event.target.innerText]);
        } else {
          setYear([event.target.innerText]);
        }
      }
    }
  };

  const onGenre = (event) => {
    if (event.target.innerText === "ALL") {
      setGenre([]);
    } else {
      if (genre.includes(String(event.target.id))) {
        setGenre(genre.filter((data) => data !== String(event.target.id)));
      } else {
        setGenre([...genre, event.target.id]);
      }
    }
  };

  const onRelease = (event) => {
    setRelease(event.target.id);
  };

  const onGte = (event) => {
    if (0 <= event.target.value && event.target.value <= 100) {
      setScoreGte(event.target.value);
    }
  };

  const onLte = (event) => {
    if (0 <= event.target.value && event.target.value <= 100) {
      setScoreLte(event.target.value);
    }
  };

  const onOption = () => {
    setOptionOpen(!optionOpen);
  };

  return (
    <>
      <div className="AdvancedSearch">
        <div
          className={[
            `AdvancedSearch-option-box ${
              optionOpen === true ? "AdvancedSearch-option-box-open" : null
            }`,
          ].join(" ")}
        >
          <div className="AdvancedSearch-option ">
            <section className="AdvancedSearch-section">
              <h3>분류</h3>
              <hr />

              <button
                onClick={onType}
                className={[
                  `${type === "movie" ? "AdvancedSearch-click" : null}`,
                ]}
                id="movie"
              >
                영화
              </button>

              <button
                onClick={onType}
                className={[`${type === "tv" ? "AdvancedSearch-click" : null}`]}
                id="tv"
              >
                TV
              </button>
            </section>

            <section className="AdvancedSearch-section">
              <h3>상태</h3>
              <hr />

              <button
                onClick={onRelease}
                className={[
                  `${release === "lte" ? "AdvancedSearch-click" : null}`,
                ]}
                id="lte"
              >
                공개됨
              </button>

              <button
                onClick={onRelease}
                className={[
                  `${release === "gte" ? "AdvancedSearch-click" : null}`,
                ]}
                id="gte"
              >
                공개예정
              </button>
            </section>

            <section className="AdvancedSearch-section">
              <h3>장르</h3>
              <hr />
              <div className="AdvancedSearch-genres">
                <button
                  onClick={onGenre}
                  className={genre.length === 0 ? "AdvancedSearch-click" : null}
                >
                  ALL
                </button>
                {genres.map((data, index) => (
                  <button
                    key={index}
                    onClick={onGenre}
                    id={data.id}
                    className={[
                      `${
                        genre.includes(String(data.id))
                          ? "AdvancedSearch-click"
                          : null
                      }`,
                    ]}
                  >
                    {data.name}
                  </button>
                ))}
              </div>
            </section>

            <section className="AdvancedSearch-section">
              <h3>연도</h3>
              <hr />
              <div className="AdvancedSearch-year">
                <button
                  onClick={onYear}
                  className={year.length === 0 ? "AdvancedSearch-click" : null}
                >
                  ALL
                </button>

                {yearList.map((data, index) => (
                  <button
                    key={index}
                    onClick={onYear}
                    className={[
                      `${
                        year.includes(String(data))
                          ? "AdvancedSearch-click"
                          : null
                      }`,
                    ]}
                  >
                    {data}
                  </button>
                ))}
              </div>
            </section>

            <div className="AdvancedSearch-section">
              <h3>점수</h3>
              <hr />
              <div className="AdvancedSearch-score">
                <input value={scoreGte} onChange={onGte} placeholder="0이상" />
                <div> ~ </div>
                <input
                  value={scoreLte}
                  onChange={onLte}
                  placeholder="100이하"
                />
              </div>
            </div>

            <button className="AdvancedSearch-btn" onClick={init}>
              초기화
            </button>
          </div>
          <button onClick={onOption} className="AdvancedSearch-option-btn">
            {optionOpen === true ? <CaretUpOutlined /> : <CaretDownOutlined />}
          </button>
        </div>

        {loading ? (
          <div className="loading-search">
            <LoadingOutlined />
          </div>
        ) : (
          <div className="AdvancedSearch-movicCard">
            <div className="AdvancedSearch-header">
              <div>총 {totalRearch}개 검색</div>
              <SelectBox
                data={sortName}
                setSelectValue={setSelectValue}
                selectValue={selectValue}
                setSortBy={setSortBy}
                getApi={getApi}
                type={type}
                AdvancedSearch={true}
              />
            </div>
            <MovieCard data={apiData} AdvancedSearch={true} />
          </div>
        )}
      </div>

      {loading ? null : (
        <>
          {totalPage === 0 || totalPage <= page ? null : (
            <div className="showScroll">
              <DoubleRightOutlined rotate={90} />
              <div ref={readMore}></div>
            </div>
          )}
        </>
      )}

      <GoTop />
    </>
  );
}

export default AdvancedSearch;
