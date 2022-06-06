import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

import "./CategoryResult.css";

function CategoryResultTv() {
  const nav = useNavigate();
  const { id } = useParams();
  const { value } = useParams();
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [today, setToday] = useState();

  const url = `${API_URL}discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&first_air_date.lte=${today}&language=ko&page=${page}&with_genres=${id}&region=KR`;

  const getApi = async () => {
    if (today === undefined) {
      getToday();
      console.log(url);
    }
    setLoading(true);
    const res = await (await fetch(url)).json();
    setTv(res.results);
    setLoading(false);
  };

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

  useEffect(() => {
    getApi();
  }, [page, today]);

  const goBack = () => {
    nav(-1);
  };

  return (
    <div className="category-result">
      <div className="goBack" onClick={goBack}>
        <ArrowLeftOutlined /> {value}
      </div>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <MovieCard data={tv} />
        </>
      )}
      <Pagination setPage={setPage} page={page} />
    </div>
  );
}

export default React.memo(CategoryResultTv);
