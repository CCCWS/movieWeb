import React from "react";
import "./Reviwe.css";

function Review({ review }) {
  const review1 = review.slice(0, 3);
  const review2 = review.slice(4);
  return (
    <>
      {review.map((data, index) => (
        <div key={index} className="reviweBox">
          <div className="reviewAuthor">
            <div>{data.author}</div>
            <div>{data.created_at.slice(0, 10)}</div>
          </div>
          <p className="overview" key={index}>
            {`${data.content.slice(0, 400)} ${
              data.content.length < 400 ? "" : "..."
            }`}
          </p>
        </div>
      ))}
    </>
  );
}

export default Review;
