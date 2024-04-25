import albumInfo from "data/albumInfo.json";
import { useEffect } from "react";

const AlbumModal = ({ imgInfo, modalToggle, setModalToggle }) => {
  useEffect(() => {
    if (modalToggle) document.body.style.overflow = "hidden";
    return () => document.body.style.overflow = "auto";
  }, [modalToggle]);

  const albumDetail =
    albumInfo.information[
      imgInfo?.idx < 10 ? `0${imgInfo?.idx}` : imgInfo?.idx
    ];

  const renderSongList = () => {
    return albumDetail?.tracklist?.map(
      ({ lead, title, lyrics, compose, arrange }) => {
        return (
          <div className="song">
            {lead && <span className="lead">title</span>}
            <span className={`song-title ${lead ? "lead-song" : ""}`}>
              {title}
            </span>
            <br />
            {lyrics === "" ? (
              <></>
            ) : (
              <>
                <span className="lyrics-by">
                  <b>Lyrics by.</b> {lyrics}
                </span>
                <br />
              </>
            )}
            <span className="composed-by">
              <b>Composed by.</b> {compose}
            </span>
            <br />
            <span className="arranged-by">
              <b>Arranged by.</b> {arrange}
            </span>
            <hr />
          </div>
        );
      },
    );
  };

  return (
    <div className="album-modal-bg">
      <div className="album-modal">
        <img src={imgInfo?.img} alt="앨범 커버" className="album-modal-cover" />
        <div className="album-modal-content">
          <button className="closeBtn" onClick={() => setModalToggle(false)}>
            ✖
          </button>
          <h4 className="album-type">{albumDetail?.albumType}</h4>
          <h2 className="album-name">{albumDetail?.albumName}</h2>
          <span className="released-date">
            {albumDetail?.release?.replaceAll("/", ".")} Released
          </span>
          <div className="column song-list">{renderSongList()}</div>
        </div>
      </div>
    </div>
  );
};

export default AlbumModal;
