import React, { useState } from "react";
import "./Reviwe.css";

function Review({ review }) {
  const [click, setClick] = useState();

  const review1 = review.slice(0, 3);
  const review2 = review.slice(4);

  const onClick = () => {
    setClick(!click);
  };

  return (
    <>
      <div className="reviweBox">
        {review.length === 0 ? (
          <p className="notInfo"> 정보가 없습니다. </p>
        ) : (
          <>
            <ReviewValue data={review1} />
            {click ? <ReviewValue data={review2} /> : null}
          </>
        )}
      </div>
      {review2.length > 0 ? (
        <div className="moreBtn">
          <button onClick={onClick}>{click ? "닫기" : "더보기"}</button>
        </div>
      ) : null}
    </>
  );
}

export default React.memo(Review);

const ReviewValue = ({ data }) => {
  return (
    <>
      {data.map((data, index) => (
        <>
          <div className="reviewAuthor">
            <div>{data.author}</div>
            <div>{data.created_at.slice(0, 10)}</div>
          </div>
          <p className="overview" key={index}>
            {`${data.content.slice(0, 300)} ${
              data.content.length < 300 ? "" : "..."
            }`}
          </p>
        </>
      ))}
    </>
  );
};
