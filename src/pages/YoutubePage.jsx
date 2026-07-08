import { useState, useEffect, useRef } from "react";
import { getYoutubeList } from "js/api";
import coverBg from "images/coverBg.jpg";
import ListWrap from "components/ListWrap";
import { useScrollReveal } from "js/useScrollReveal";

const CACHE_KEY = "youtubeList";

const YoutubePage = () => {
  const [youtubeArr, setYoutubeArr] = useState([]);
  const loadingRef = useRef(false);
  const titleRef = useScrollReveal();
  const wrapRef = useScrollReveal();

  // force가 false면 세션 캐시를 우선 사용해 API 할당량 소모를 막는다.
  const getYoutube = async (force = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      if (!force) {
        const cached = sessionStorage.getItem(CACHE_KEY);
        if (cached) {
          setYoutubeArr(JSON.parse(cached));
          return;
        }
      }
      const result = await getYoutubeList("chochocho");
      if (typeof result !== "object" || !result?.data?.items) return;
      let items = result.data.items;
      const cloudResult = await getYoutubeList("cloudcho");
      if (typeof cloudResult === "object" && cloudResult?.data?.items) {
        items = [...items, ...cloudResult.data.items];
      }
      setYoutubeArr(items);
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(items));
    } finally {
      loadingRef.current = false;
    }
  };

  const renderCoverList = () => {
    return youtubeArr?.map(({ id, snippet }) => (
      <div className="item" key={id?.videoId}>
        <a
          href={`https://youtube.com/watch?v=${id?.videoId}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src={snippet?.thumbnails?.high?.url}
            alt="thumbnail"
            className="youtube-thumbnail"
            loading="lazy"
            decoding="async"
          />
          <p>{snippet?.title}</p>
        </a>
      </div>
    ));
  };

  useEffect(() => {
    getYoutube();
  }, []);

  return (
    <>
      <div className="container youtubePage" id="youtube">
        <h2
          ref={titleRef}
          className="title youtube-title odd"
          onClick={() => getYoutube(true)}
        >
          YOUTUBE
        </h2>
        <img src={coverBg} alt="커버 배경이미지" className="pageImg" />
        <ListWrap
          ref={wrapRef}
          renderListFn={renderCoverList}
          className="youtube-wrap"
        />
      </div>
    </>
  );
};

export default YoutubePage;
