import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_KEY, API_URL, IMG_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

import MovieCard from "../components/MovieCard";
import Pagination from "../components/Pagination";

import { IoMdArrowRoundBack } from "react-icons/io";
import "./CategoryResult.css";

function CategoryResultTv() {
  const nav = useNavigate();
  const { id } = useParams();
  const { value } = useParams();
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const getApi = async () => {
    setLoading(true);
    const url = `${API_URL}discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&language=ko&page=${page}&with_genres=${id}`;
    const res = await (await fetch(url)).json();
    setTv(res.results);
    setLoading(false);
  };

  useEffect(() => {
    getApi();
  }, [page]);

  const goBack = () => {
    nav(-1);
  };

  return (
    <>
      <div className="goBack" onClick={goBack}>
        <IoMdArrowRoundBack /> {value}
      </div>
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <div
          className="movieCard category-result"
          // data-aos="fade-up"
          // data-aos-duration="1000"
          // data-aos-once="true"
        >
          {tv.map((data, index) => (
            <MovieCard key={index} {...data} IMG_URL={IMG_URL} />
          ))}
        </div>
      )}
      <Pagination setPage={setPage} page={page} />
    </>
  );
}

export default React.memo(CategoryResultTv);
