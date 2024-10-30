import { useState, useEffect } from "react";
import $ from "jquery";
import { getYoutubeList } from "js/api";
import coverBg from "images/coverBg.jpg";
import ListWrap from "components/ListWrap";

const YoutubePage = ({ scrollY }) => {
  const [youtubeArr, setYoutubeArr] = useState([]);
  let prevent = false;

  useEffect(() => {
    if (scrollY > $(".youtube-title").offset().top - (window.innerHeight - 200))
      $(".youtube-title").addClass("animate");
    if (scrollY > $(".youtube-wrap").offset().top - (window.innerHeight - 200))
      $(".youtube-wrap").addClass("animate");
  }, [scrollY]);

  const getYoutube = async () => {
    if (prevent) return;
    prevent = true;
    setTimeout(() => {
      prevent = false;
    }, 200);
    const result = await getYoutubeList('chochocho');
    if (typeof result === "object") {
      setYoutubeArr(result?.data?.items);
      const cloudResult = await getYoutubeList('cloudcho')
      if (typeof cloudResult === 'object') {
        setYoutubeArr(prev => {
          let clone = [...prev];
          clone = [...prev, ...cloudResult.data.items]
          return clone;
        })
      }
    }
  };

  const renderCoverList = () => {
    return youtubeArr?.map(({ id, snippet }) => {
      return (
        <>
          <div className="item">
            <a
              href={`https://youtube.com/watch?v=${id?.videoId}`}
              target="_blank"
            >
              <img
                src={snippet?.thumbnails?.high?.url}
                alt="thumbnail"
                className="youtube-thumbnail"
              />
              <p>{snippet?.title}</p>
            </a>
          </div>
        </>
      );
    });
  };

  useEffect(() => {
    getYoutube();
  }, []);

  return (
    <>
      <div className="container youtubePage">
        <h2 className="title youtube-title even" onClick={getYoutube}>
          YOUTUBE
        </h2>
        <img src={coverBg} alt="커버 배경이미지" className="pageImg" />
        <ListWrap renderListFn={renderCoverList} className="youtube-wrap" />
      </div>
    </>
  );
};

export default YoutubePage;
