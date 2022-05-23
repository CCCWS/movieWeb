import React, { useEffect, useState } from "react";
import {
  LeftOutlined,
  DoubleLeftOutlined,
  RightOutlined,
  DoubleRightOutlined,
} from "@ant-design/icons";

import "./Pagination.css";

function Pagination({ setPage, page }) {
  const [number, setNumber] = useState([]);
  const [numberM, setNumberM] = useState([]);

  const [currPage, setCurrPage] = useState(page);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(currPage);
  }, [currPage]);

  useEffect(() => {
    pushArr();
  }, []);

  const pushArr = () => {
    const arrP = [];
    const arrM = [];
    for (let i = 1; i <= 10; i++) {
      arrP.push(i);
    }

    for (let i = 1; i <= 5; i++) {
      arrM.push(i);
    }

    setNumber(arrP);
    setNumberM(arrM);
  };

  const changePage = (event) => {
    setCurrPage(event.target.innerText);
    console.log(currPage);
  };

  /////////////////////pc//////////////////////////
  const nextNum = () => {
    if (parseInt(currPage) !== 500) {
      if (currPage % 10 === 0) {
        const arr = number.map((data) => parseInt(data) + 10);
        setNumber(arr);
        setCurrPage(parseInt(currPage) + 1);
      } else {
        setCurrPage(parseInt(currPage) + 1);
      }
    }
  };

  const prevNum = () => {
    if (parseInt(currPage) !== 1) {
      if (currPage % 10 === 1) {
        const arr = number.map((data) => parseInt(data) - 10);
        setNumber(arr);
        setCurrPage(parseInt(currPage) - 1);
      } else {
        setCurrPage(parseInt(currPage) - 1);
      }
    }
  };

  const nextPage = () => {
    if (Math.max(...number) <= 500) {
      const arr = number.map((data) => parseInt(data) + 10);
      setCurrPage(parseInt(currPage) + 10);
      setNumber(arr);
    }
  };

  const prevPage = () => {
    if (Math.max(...number) > 10) {
      const arr = number.map((data) => parseInt(data) - 10);
      setCurrPage(parseInt(currPage) - 10);
      setNumber(arr);
    }
  };
  /////////////////////mobile//////////////////////////
  const nextNumM = () => {
    if (currPage !== 500) {
      if (currPage % 5 === 0) {
        const arr = numberM.map((data) => parseInt(data) + 5);
        setNumberM(arr);
        setCurrPage(parseInt(currPage) + 1);
      } else {
        setCurrPage(parseInt(currPage) + 1);
      }
    }
  };

  const prevNumM = () => {
    if (currPage !== 1) {
      if (currPage % 5 === 1) {
        const arr = numberM.map((data) => parseInt(data) - 5);
        setNumberM(arr);
        setCurrPage(parseInt(currPage) - 1);
      } else {
        setCurrPage(parseInt(currPage) - 1);
      }
    }
  };

  const nextPageM = () => {
    if (Math.max(...numberM) <= 500) {
      const arr = numberM.map((data) => parseInt(data) + 5);
      setCurrPage(parseInt(currPage) + 5);
      setNumberM(arr);
    }
  };

  const prevPageM = () => {
    if (Math.max(...numberM) > 5) {
      const arr = numberM.map((data) => parseInt(data) - 5);
      setCurrPage(parseInt(currPage) - 5);
      setNumberM(arr);
    }
  };

  return (
    <>
      <div className="pagination-box pc">
        <button onClick={prevPage}>
          <DoubleLeftOutlined />
        </button>
        <button onClick={prevNum}>
          <LeftOutlined />
        </button>

        {number.map((data, index) => (
          <div
            className={
              parseInt(currPage) === parseInt(data) ? "curr-page" : null
            }
            key={index}
            onClick={changePage}
          >
            {data}
          </div>
        ))}
        <button onClick={nextNum}>
          <RightOutlined />
        </button>
        <button onClick={nextPage}>
          <DoubleRightOutlined />
        </button>
      </div>

      <div className="pagination-box mobile">
        <button onClick={prevPageM}>
          <DoubleLeftOutlined />
        </button>
        <button onClick={prevNumM}>
          <LeftOutlined />
        </button>

        {numberM.map((data, index) => (
          <div
            className={
              parseInt(currPage) === parseInt(data) ? "curr-page" : null
            }
            key={index}
            onClick={changePage}
          >
            {data}
          </div>
        ))}
        <button onClick={nextNumM}>
          <RightOutlined />
        </button>
        <button onClick={nextPageM}>
          <DoubleRightOutlined />
        </button>
      </div>
    </>
  );
}

export default Pagination;
