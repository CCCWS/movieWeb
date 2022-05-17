import React, { useEffect, useState } from "react";
import "./Pagination.css";

function Pagination({ setPage, setLoading }) {
  const numberArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [number, setNumber] = useState(numberArr);
  const [currPage, setCurrPage] = useState(1);

  useEffect(() => {
    setPage(currPage);
  }, [currPage]);

  const changePage = (event) => {
    setCurrPage(event.target.innerText);
  };

  const prevPage = () => {
    if (Math.max(...number) > 10) {
      const arr = number.map((data) => parseInt(data) - 10);
      setCurrPage(parseInt(currPage) - 10);
      setNumber(arr);
    }
  };

  const nextPage = () => {
    if (Math.max(...number) <= 500) {
      const arr = number.map((data) => parseInt(data) + 10);
      setCurrPage(parseInt(currPage) + 10);
      setNumber(arr);
    }
  };

  return (
    <>
      <div className="pagination-box">
        <button onClick={prevPage}>-10</button>
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
        <button onClick={nextPage}>+10</button>
      </div>
    </>
  );
}

export default React.memo(Pagination);
