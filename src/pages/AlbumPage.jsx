import { useState, useEffect } from "react";
import $ from "jquery";
import AlbumModal from "components/AlbumModal";
import ListWrap from "components/ListWrap";

import albumBg from "images/albumBg.jpg";
import album00 from "images/albumCover/0.jpg";
import album01 from "images/albumCover/1.jpg";
import album02 from "images/albumCover/2.jpg";
import album03 from "images/albumCover/3.jpg";
import album04 from "images/albumCover/4.jpg";
import album05 from "images/albumCover/5.jpg";
import album06 from "images/albumCover/6.jpg";
import album07 from "images/albumCover/7.jpg";
import album08 from "images/albumCover/8.jpg";
import album09 from "images/albumCover/9.jpg";
import album10 from "images/albumCover/10.jpg";
import album11 from "images/albumCover/11.jpg";
import album12 from "images/albumCover/12.jpg"

const AlbumPage = ({ scrollY }) => {
  const [modalToggle, setModalToggle] = useState(false);
  const [imgInfo, setImgInfo] = useState({ img: "", idx: "" });

  const albumArr = [
    album00,
    album01,
    album02,
    album03,
    album04,
    album05,
    album06,
    album07,
    album08,
    album09,
    album10,
    album11,
    album12
  ];

  const renderAlbumList = () => {
    return albumArr.map((albumCover, idx) => {
      return (
        <>
          <img
            src={albumCover}
            alt={idx}
            className="item album-cover"
            onClick={() => {
              setImgInfo((prev) => {
                const clone = { ...prev };
                clone.img = albumCover;
                clone.idx = idx;
                return clone;
              });
              setModalToggle(true);
            }}
          />
        </>
      );
    });
  };

  useEffect(() => {
    if (scrollY > $(".album-title").offset().top - (window.innerHeight - 200))
      $(".album-title").addClass("animate");
    if (scrollY > $(".album-wrap").offset().top - (window.innerHeight - 200))
      $(".album-wrap").addClass("animate");
  }, [scrollY]);

  return (
    <>
      <div className="container album-page">
        <h2 className="title album-title odd">ALBUM</h2>
        <img src={albumBg} alt="앨범 배경이미지" className="pageImg" />
        <ListWrap renderListFn={renderAlbumList} className='album-wrap' />
        {/*<div className="row album-list">{renderAlbumList()}</div>*/}
      </div>
      {modalToggle && (
        <AlbumModal
          imgInfo={imgInfo}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        />
      )}
    </>
  );
};

export default AlbumPage;
