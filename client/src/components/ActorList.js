import React, { useState } from "react";
import img from "../img/profile_none.PNG";

import "./ActorList.css";

function ActorList({ movieActor, IMG_URL }) {
  const [click, setClick] = useState(false);

  const actor1 = movieActor.slice(0, 8);
  const actor2 = movieActor.slice(9);

  const onClick = () => {
    setClick(!click);
  };

  const Actor = ({ data }) => {
    return (
      <>
        {data.map((data) => (
          <div className="actorOne" key={data.id}>
            <div
              className="actorImg"
              style={{
                backgroundImage:
                  data.profile_path === null
                    ? `url(${img})`
                    : `url(${IMG_URL}w200${data.profile_path})`,
              }}
            ></div>
            <div className="actorName">
              {data.name}
              <br />
              {data.character}
            </div>
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <div className="actor">
        <Actor data={actor1} />
        {click ? <Actor data={actor2} /> : null}
      </div>
      <div className="moreBtn">
        <button onClick={onClick}> {click ? "닫기" : "더보기"}</button>
      </div>
    </>
  );
}

export default ActorList;
