import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { LoadingOutlined } from "@ant-design/icons";

import AOS from "aos";
import "aos/dist/aos.css";

import { API_KEY, API_URL, IMG_URL } from "../config";
import MovieHeader from "../components/Header/MovieHeader";
import TitleLargeImg from "../components/TitleLargeImg";
import ActorList from "../components/ActorList";
import MovieInfo from "../components/MovieInfo";
import ProductionLogo from "../components/ProductionLogo";
import TrailerAndStillCut from "../components/TrailerAndStillCut";
import Review from "../components/Review";
import SeasonInfo from "../components/SeasonInfo";

import Modal from "../components/Modal";
import TrailerModal from "../components/TrailerModal";

import "./Detail.css";

function TvDetail() {
  const [movieInfo, setMovieInfo] = useState([]); //영화 정보 저장
  const [companies, setcompanies] = useState([]); //영화 제작사 저장
  const [movieActor, setMovieActor] = useState([]); //출연 배우
  const [genres, setGenres] = useState([]); //장르
  const [loading, setLoading] = useState(true); //로딩 여부
  const [movieTrailer, setMovieTrailer] = useState([]); //트레일러 영상
  const [logoImg, setLogoImg] = useState([]);
  const [review, setReview] = useState([]);

  const [stillCut, setStillCut] = useState();

  const { id } = useParams();

  const info = `${API_URL}tv/${id}?api_key=${API_KEY}&language=ko`; //영화 정보
  const actor = `${API_URL}tv/${id}/credits?api_key=${API_KEY}&language=ko`; //영화 출연 배우
  const reviews = `${API_URL}tv/${id}/reviews?api_key=${API_KEY}`; //영화 리뷰
  const trailer = `${API_URL}tv/${id}/videos?api_key=${API_KEY}&language=ko`; //트레일러 유튜브
  const logo = `${API_URL}tv/${id}/images?api_key=${API_KEY}`;

  useEffect(() => {
    getApi();
  }, [id]);

  const getApi = async () => {
    setLoading(true);
    const getInfo = await (await fetch(info)).json();
    const getActor = await (await fetch(actor)).json();
    const getTrailer = await (await fetch(trailer)).json();
    const getLogo = await (await fetch(logo)).json();
    const getreview = await (await fetch(reviews)).json();

    setReview(getreview.results);
    setStillCut(getLogo.backdrops);
    setLogoImg(getLogo.logos);
    setMovieInfo(getInfo);
    setcompanies(getInfo.production_companies);
    setGenres(getInfo.genres);
    setMovieActor(getActor.cast.slice(0, 40));
    setMovieTrailer(getTrailer.results);

    setLoading(false);
  };

  useEffect(() => {
    AOS.init();
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [TrailerModalOpen, setTrailerModalOpen] = useState(false);
  const [stillCutModalOpen, setStillCutModalOpen] = useState(false);

  const [trailerUrl, setTrailerUrl] = useState();
  const [stillCutUrl, setStillCutUrl] = useState();
  const [actorId, setActorId] = useState();

  //ActorList에서 이미지 클릭시 id와 true를 props로 전달
  //detail에서 받은 props를 Madal에 넘겨줌

  const get = JSON.parse(localStorage.getItem("recentView"));

  const setLocalData = () => {
    const filterGet = get.filter((data) => data.id !== movieInfo.id);
    localStorage.setItem(
      "recentView",
      JSON.stringify([{ ...movieInfo }, ...filterGet])
    );
  };

  useEffect(() => {
    if (loading === false) {
      if (get === null) {
        localStorage.setItem("recentView", JSON.stringify([{ ...movieInfo }]));
      } else {
        //localStorge의 데이터가 6개가 있을 경우
        if (get.length === 6) {
          //이미 항목에 있는 데이터라면 지우고 다시 추가해서 최상단으로 갱신
          if (get.filter((data) => data.id === movieInfo.id).length === 1) {
            setLocalData();

            //항목에 있는 데이터가 아니면 맨 뒤의 데이터를 지우고 새로운 데이터 추가
          } else {
            get.pop();
            setLocalData();
          }
        } else {
          //6개가 아닐경우 데이터만 추가
          setLocalData();
        }
      }
    }
  }, [loading]);

  return (
    <div className="detailPage">
      <MovieHeader />
      {loading ? (
        <div className="loading">
          <LoadingOutlined />
        </div>
      ) : (
        <>
          <Modal
            setModalOpen={setModalOpen}
            modalOpen={modalOpen}
            actorId={actorId}
            trailerUrl={trailerUrl}
            API_URL={API_URL}
            API_KEY={API_KEY}
            IMG_URL={IMG_URL}
          />

          <TrailerModal
            trailerUrl={trailerUrl}
            TrailerModalOpen={TrailerModalOpen}
            setTrailerModalOpen={setTrailerModalOpen}
            //
            stillCutUrl={stillCutUrl}
            stillCutModalOpen={stillCutModalOpen}
            setStillCutModalOpen={setStillCutModalOpen}
          />

          <div>
            <TitleLargeImg
              IMG_URL={IMG_URL}
              backdrop_path={movieInfo.backdrop_path}
              DetailPage={true}
            />
          </div>

          <div
            id="2"
            className="movieDetail"
            data-aos="fade-right"
            data-aos-duration="500"
            data-aos-once="true"
          >
            <MovieInfo
              {...movieInfo}
              IMG_URL={IMG_URL}
              genres={genres}
              logoImg={logoImg}
            />
            <SeasonInfo
              season={movieInfo.seasons}
              IMG_URL={IMG_URL}
              name={movieInfo.name}
            />
            <hr />
            <div
              id="3"
              className="movieStory"
              // data-aos="fade-up"
              // data-aos-duration="1000"
              // data-aos-once="true"
            >
              <div className="section">줄거리</div>
              {movieInfo.overview == "" ? (
                <p className="notInfo"> 정보가 없습니다. </p>
              ) : (
                <>
                  <div className="tagline">{movieInfo.tagline}</div>
                  <p className="overview">{movieInfo.overview}</p>
                </>
              )}
            </div>
            <hr />
            <div
              id="4"
              className="trailer"
              // data-aos="fade-up"
              // data-aos-duration="1000"
              // data-aos-once="true"
            >
              <TrailerAndStillCut
                movieTrailer={movieTrailer}
                setTrailerModalOpen={setTrailerModalOpen}
                setTrailerUrl={setTrailerUrl}
                ///
                stillCut={stillCut}
                setStillCutModalOpen={setStillCutModalOpen}
                setStillCutUrl={setStillCutUrl}
              />
            </div>

            <hr />

            <div
              id="5"
              className="actorBox"
              // data-aos="fade-up"
              // data-aos-duration="1000"
              // data-aos-once="true"
            >
              <div className="section">출연</div>
              <ActorList
                movieActor={movieActor}
                IMG_URL={IMG_URL}
                setModalOpen={setModalOpen}
                setActorId={setActorId}
              />
            </div>
            <hr />

            <div
              id="6"
              className="reviwe"
              // data-aos="fade-up"
              // data-aos-duration="1000"
              // data-aos-once="true"
            >
              <div className="section">리뷰</div>
              <Review review={review} />
            </div>
          </div>

          <div className="productionLogo">
            <ProductionLogo companies={companies} IMG_URL={IMG_URL} />
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(TvDetail);
