import React, { useEffect, useState } from "react";

import { ActorOne } from "./ActorList";
import MovieCard from "./MovieCard";
import { LoadingOutlined, CloseOutlined } from "@ant-design/icons";

import "./Modal.css";

import img from "../img/profile_none.PNG";

function Modal({ closeModal, modalOpen, actorId, API_URL, API_KEY, IMG_URL }) {
  const [actorDetail, setActorDetail] = useState();
  const [actorMovie, setActorMovie] = useState();
  const [loading, setLoading] = useState(true);
  const actor = `${API_URL}person/${actorId}?api_key=${API_KEY}`; //배우 상세정보
  const movie = `${API_URL}person/${actorId}/credits?api_key=${API_KEY}&language=ko`; //배우 출연작

  const getApi = async () => {
    setLoading(true);
    const getActor = await (await fetch(actor)).json();
    const getMovie = await (await fetch(movie)).json();

    const filterMovie = getMovie.cast.filter(
      (data) => data.release_date !== ""
    );

    const sort = filterMovie.sort(function (a, b) {
      return (
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
      );
    });

    setActorDetail(getActor);
    setActorMovie(sort);
    setLoading(false);
  };

  useEffect(() => {
    if (modalOpen) {
      getApi();
    }
  }, [modalOpen]);

  const modalClose = () => {
    closeModal(false);
  };

  const test = (event) => {
    if (event.target.parentNode.className == "detailPage") {
      modalClose();
    }
  };

  const open = modalOpen ? "modal_open" : null;

  return (
    <div className={[`modal ${open}`].join(" ")} onClick={test}>
      <div className="item">
        {loading ? (
          <div className="loading">
            <LoadingOutlined />
          </div>
        ) : (
          <>
            <button className="modalClose" onClick={modalClose}>
              <CloseOutlined />
            </button>
            <ActorOne
              data={actorDetail}
              IMG_URL={IMG_URL}
              img={img}
              onModal={true}
            />

            <div
              className="movieCard movieCardModal"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-once="true"
            >
              {actorMovie.map((data, index) => (
                <MovieCard
                  key={index}
                  {...data}
                  IMG_URL={IMG_URL}
                  onModal={true}
                  closeModal={closeModal}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default React.memo(Modal);
