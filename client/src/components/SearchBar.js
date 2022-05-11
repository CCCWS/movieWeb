import React, { useCallback, useEffect, useRef, useState } from "react";
import { API_KEY, API_URL, IMG_URL } from "../config";
import { useNavigate } from "react-router-dom";
import {
  SearchOutlined,
  CloseCircleOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import "./SearchBar.css";

function SearchBar() {
  const inputRef = useRef();
  const searchRef = useRef();
  const nav = useNavigate();
  const [recentSearch, setRecentSearch] = useState(false); //최근 검색어 표시 여부
  const [value, setValue] = useState(""); //입력된 검색어
  const [movie, setMovie] = useState([]); //검색한 영화
  const [tv, setTv] = useState([]); //검색한 Tv
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState(window.location.href); //현재 url이 변화하면 input 비우기
  const [localStorageItem, setLocalStorgeItem] = useState([]); //LocalStorge에 최근 검색어 관리

  const getApi = async () => {
    const MovieUrl = `${API_URL}search/movie?api_key=${API_KEY}&language=ko&query=${value}`;
    const TvUrl = `${API_URL}search/tv?api_key=${API_KEY}&language=ko&query=${value}`;
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

  // 현재 url이 변화하면 입력된 값을 초기화
  useEffect(() => {
    setUrl(window.location.href);
    setValue("");
    setRecentSearch(false);
  }, [window.location.href]);

  //한글자 이상 입력시 api 요청
  useEffect(() => {
    if (value.length > 0) {
      getApi();
    }
    if (value.length === 0) {
      setLoading(true);
    }
  }, [value]);

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const valueDelete = () => {
    setValue("");
  };

  const getLocalStorage = JSON.parse(localStorage.getItem("SearchValue"));

  const goResult = (event) => {
    if (value.length > 0) {
      event.preventDefault();
      nav(`/search/${value}`);

      //localStorage가 비어있을 경우
      if (getLocalStorage === null) {
        setLocalStorgeItem([{ value, id: new Date().getTime() }]);
        localStorage.setItem(
          "SearchValue",
          JSON.stringify([{ value, id: new Date().getTime() }])
        );

        //localStorage에 값이 있는 경우, undifined, 길이0 포함
      } else {
        //쵀대 길이가 5라면 마지막 요소 제거, 최대 5개까지 보여주기 위함
        if (getLocalStorage.length === 5) {
          getLocalStorage.pop();
        }

        //새로운 값과 기존의 값을 함침
        setLocalStorgeItem([
          { value, id: new Date().getTime() },
          ...getLocalStorage,
        ]);
        localStorage.setItem(
          "SearchValue",
          JSON.stringify([
            { value, id: new Date().getTime() },
            ...getLocalStorage,
          ])
        );
      }

      //최근 검색어 창이 열려있는 경우 == 최근 검색어를 클릭했을 경우
    } else if (recentSearch === true) {
      nav(`/search/${event.target.innerText}`);
    }
    setValue("");
    setRecentSearch(false);
  };

  //클릭한 검색어를 localStorge에서 제거후 다시 setItem
  //getItem > filter > setState > setItem
  const localStorgeRemove = (event) => {
    const item = event.target.previousSibling.title;
    const value = getLocalStorage.filter((data) => data.id !== parseInt(item));
    setLocalStorgeItem(value);
    localStorage.setItem("SearchValue", JSON.stringify(value));
  };

  //localStorge에 값이 있을때만 true
  const onFocus = () => {
    if (getLocalStorage && getLocalStorage.length > 0) {
      // console.log(getLocalStorage.length !== 0);
      setLocalStorgeItem(getLocalStorage);
      setRecentSearch(true);
    }
  };

  //localStorge에 값이 없을때만 false
  // const onBlur = () => {
  //   if (
  //     getLocalStorage === null ||
  //     getLocalStorage === undefined ||
  //     getLocalStorage.length === 0
  //   ) {
  //     // setRecentSearch(false);
  //   }
  // };

  //최근 검색어 창이 열려있을때 값을 모두 지우면 실시간으로 창이 사라짐
  // useEffect(() => {
  //   console.log("test");
  // }, [localStorageItem]);

  const handleClickOutside = ({ target }) => {
    console.log(recentSearch);
    if (
      recentSearch &&
      !searchRef.current.contains(target) &&
      !inputRef.current.contains(target)
    )
      setRecentSearch(false);
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [recentSearch]);

  // console.log(getLocalStorage);
  return (
    <form onSubmit={goResult}>
      {/* <button onClick={() => console.log(recentSearch)}>test</button> */}
      <div className="searchInputBox">
        <SearchOutlined />
        <input
          className="searchInput"
          type="search"
          placeholder={`검색어 입력`}
          value={value}
          onChange={onChange}
          onSubmit={goResult}
          onFocus={onFocus}
          // onBlur={onBlur}
          ref={inputRef}
          style={{
            width: recentSearch === true || value.length > 0 ? "100px" : null,
          }}
        />
        {value.length > 0 && (
          <CloseCircleOutlined onClick={valueDelete} className="removeValue" />
        )}
      </div>

      {/* {movie.length === 0 ? <div>검색 결과가 없음</div> : null} */}
      {value.length > 0 ? (
        <>
          {tv.length < 1 ? (
            <div className="search searchFail">결과가 없습니다.</div>
          ) : (
            <div className="search">
              {tv.map((data) => (
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
      ) : (
        <>
          {recentSearch && (
            <div
              ref={searchRef}
              className="search"
              style={{ display: recentSearch === true ? "flex" : "none" }}
            >
              {localStorageItem.map((data) => (
                <div key={data.id} className="searchInfo searchHistory">
                  <div className="searchHistoryRight" title={data.id}>
                    <div>
                      <ClockCircleOutlined />
                    </div>
                    <div onClick={goResult}>{data.value}</div>
                  </div>

                  <div onClick={localStorgeRemove}>✖</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
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
