import React from "react";
import img from "../img/profile_none.PNG";

function ActorList({ movieActor, IMG_URL }) {
  const test = movieActor.slice(0, 8);

  return (
    <>
      <div className="actor">
        {movieActor.map((data) => (
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
      </div>
    </>
  );
}

export default ActorList;
