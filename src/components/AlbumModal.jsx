import { useState } from "react";
import EmbedSkeleton from "components/EmbedSkeleton";
import { useModalBehavior } from "js/useModalBehavior";

// 스트리밍 플랫폼별 링크. Spotify는 정확한 앨범 URL(album.spotify), 나머지는 앨범명 검색 링크로 폴백.
const STREAMING = [
  { key: "melon", label: "Melon", build: q => `https://www.melon.com/search/total/index.htm?q=${q}` },
  { key: "spotify", label: "Spotify", build: q => `https://open.spotify.com/search/${q}` },
  { key: "youtubeMusic", label: "YT Music", build: q => `https://music.youtube.com/search?q=${q}` },
  { key: "appleMusic", label: "Apple Music", build: q => `https://music.apple.com/kr/search?term=${q}` },
];

const AlbumModal = ({ album, modalToggle, setModalToggle }) => {
  const [embedLoaded, setEmbedLoaded] = useState(false);
  const close = () => setModalToggle(false);
  const containerRef = useModalBehavior(modalToggle, close);

  const searchQuery = encodeURIComponent(`${album?.albumName ?? ""} LUCY`);
  const tracks = album?.tracks ?? [];

  const renderSongList = () => {
    return tracks.map(({ lead, title, lyrics, compose, arrange }, idx) => (
      <div className="song" key={idx}>
        {lead && <span className="lead">title</span>}
        <span className={`song-title ${lead ? "lead-song" : ""}`}>{title}</span>
        {lyrics && (
          <>
            <br />
            <span className="lyrics-by">
              <b>Lyrics by.</b> {lyrics}
            </span>
          </>
        )}
        {compose && (
          <>
            <br />
            <span className="composed-by">
              <b>Composed by.</b> {compose}
            </span>
          </>
        )}
        {arrange && (
          <>
            <br />
            <span className="arranged-by">
              <b>Arranged by.</b> {arrange}
            </span>
          </>
        )}
        <hr />
      </div>
    ));
  };

  const renderStreamingLinks = () => {
    return (
      <div className="row streaming-links">
        {STREAMING.map(({ key, label, build }) => {
          const href =
            key === "spotify" && album?.spotify
              ? album.spotify
              : build(searchQuery);
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="streaming-btn"
            >
              {label}
            </a>
          );
        })}
      </div>
    );
  };

  return (
    <div className="album-modal-bg" onClick={close}>
      <div
        className="album-modal"
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-label={album?.albumName}
      >
        <img
          src={album?.cover}
          alt="앨범 커버"
          className="album-modal-cover"
          onClick={e => e.stopPropagation()}
        />
        <div
          className="album-modal-content"
          onClick={e => e.stopPropagation()}
        >
          <button className="closeBtn" aria-label="닫기" onClick={close}>
            ✖
          </button>
          <h4 className="album-type">{album?.albumType}</h4>
          <h2 className="album-name">{album?.albumName}</h2>
          <span className="released-date">
            {album?.release?.replaceAll("/", ".")} Released
          </span>
          {renderStreamingLinks()}
          {album?.spotifyId && (
            <>
              {!embedLoaded && <EmbedSkeleton className="spotify-embed" />}
              <iframe
                className="spotify-embed"
                style={{ display: embedLoaded ? "block" : "none" }}
                src={`https://open.spotify.com/embed/album/${album.spotifyId}?theme=0`}
                title="Spotify player"
                loading="lazy"
                allow="encrypted-media"
                onLoad={() => setEmbedLoaded(true)}
              ></iframe>
            </>
          )}
          <div className="column song-list">{renderSongList()}</div>
        </div>
      </div>
    </div>
  );
};

export default AlbumModal;
