import React from "react";
import img from "../img/profile_none.PNG";

function ActorList({ movieActor, IMG_URL }) {
  return (
    <>
      <div className="actor">
        {movieActor.map((data) => (
          <div className="actorOne" key={data.id}>
            {data.profile_path === null ? (
              <>
                <div
                  className="actorImg"
                  style={{
                    backgroundImage: `url(${img})`,
                  }}
                />
              </>
            ) : (
              <>
                <div
                  className="actorImg"
                  style={{
                    backgroundImage: `url(${IMG_URL}w200${data.profile_path})`,
                  }}
                />
              </>
            )}

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
