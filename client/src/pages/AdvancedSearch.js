import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { API_URL, API_KEY, IMG_URL } from "../config";
import "./AdvancedSearch.css";

function AdvancedSearch() {
  const [loading, setLoading] = useState(true);
  const [apiData, setApiData] = useState([]);
  const [genres, setGenres] = useState();
  const [year, setYear] = useState();

  const getApi = async () => {
    setLoading(true);
    const url = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko&sort_by=popularity.desc&primary_release_year=${year}`;

    const test = `${API_URL}discover/movie?api_key=${API_KEY}&language=ko&region=KR&sort_by=popularity.desc&primary_release_date.lte=2021-05-30`;
    const res = await (await fetch(url)).json();
    setApiData(res.results);
    setLoading(false);
  };

  useEffect(() => {
    getApi();
  }, [year]);

  const onYear = (event) => {
    if (event.target.innerText === year) {
      setYear(undefined);
    } else {
      setYear(event.target.innerText);
    }
  };

  // const search = () => {
  //   getApi();
  // };

  return (
    <div className="AdvancedSearch">
      <div className="AdvancedSearch-option">
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

        <div>{year}</div>

        {/* <button onClick={search}>찾기</button> */}
      </div>

      <div className="AdvancedSearch-result">
        {loading ? null : (
          <div className="movieCard">
            {apiData.map((data, index) => (
              <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdvancedSearch;
