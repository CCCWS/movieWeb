import React, { useEffect, useState } from "react";
import { API_KEY, API_URL, IMG_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import "./SearchBar.css";

function SearchBar() {
  const nav = useNavigate();
  const [value, setValue] = useState("");
  const [movie, setMovie] = useState([]);
  const [tv, setTv] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(window.location.href);

  const MovieUrl = `${API_URL}search/movie?api_key=${API_KEY}&language=ko&query=${value}`;
  const TvUrl = `${API_URL}search/tv?api_key=${API_KEY}&language=ko&query=${value}`;
  const getApi = async () => {
    setLoading(true);

    const getSearchMovie = await (await fetch(MovieUrl)).json();
    const getSearchTv = await (await fetch(TvUrl)).json();

    const filterMovie = getSearchMovie.results.filter(
      (data) => data.release_date !== ""
    );

    const filterTv = getSearchTv.results.filter(
      (data) => data.release_date !== ""
    );

    const sortTv = filterTv.sort(function (a, b) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });

    const sortMovie = filterMovie.sort(function (a, b) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });

    setTv(sortTv.slice(0, 5));
    setMovie(sortMovie.slice(0, 5));

    setLoading(false);
  };

  useEffect(() => {
    //현재 url이 변화하면 입력된 값을 초기화
    setUrl(window.location.href);
    setValue("");
  }, [window.location.href]);

  useEffect(() => {
    if (value.length > 0) {
      //한글자 이상 입력시 api 요청
      getApi();
    }
    if (value.length === 0) {
      setLoading(true);
    }
  }, [value]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const goResult = (event) => {
    if (value.length > 0) {
      event.preventDefault();
      nav(`/search/${value}`);
      setValue("");
    }
  };

  const test = (event) => {
    setValue("");
  };

  return (
    <form onSubmit={goResult}>
      <div className="searchInputBox">
        <SearchOutlined />
        <input
          className={[`searchInput ${value.length > 0 && "valueIn"}`].join(" ")}
          type="text"
          placeholder={`검색어 입력`}
          value={value}
          onChange={onChange}
          onSubmit={goResult}
        />
        {value.length > 0 && (
          <CloseCircleOutlined onClick={test} className="removeValue" />
        )}
      </div>
      {/* {movie.length === 0 ? <div>검색 결과가 없음</div> : null} */}
      {value.length > 0 ? (
        <>
          {movie.length < 1 ? (
            <div className="search searchFail">결과가 없습니다.</div>
          ) : (
            <div className="search">
              {movie.map((data) => (
                <SearchBarResult
                  key={data.id}
                  {...data}
                  IMG_URL={IMG_URL}
                  setValue={setValue}
                />
              ))}
            </div>
          )}
        </>
      ) : null}
    </form>
  );
}

export default React.memo(SearchBar);

const SearchBarResult = ({
  id,
  poster_path,
  IMG_URL,
  title,
  name,
  release_date,
  setValue,
}) => {
  const nav = useNavigate();
  const goDetail = () => {
    nav(`/detail/${id}`);
    setValue("");
  };

  return (
    <div className="searchInfo" onClick={goDetail}>
      <img
        className="searchImg"
        src={poster_path ? `${IMG_URL}w200${poster_path}` : null}
      />
      <div className="searchTitle">
        <div>
          {title} {name}
        </div>
        <div>{release_date}</div>
      </div>
    </div>
  );
};
