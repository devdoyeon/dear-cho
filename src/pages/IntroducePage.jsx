import { useEffect } from "react";
import $ from "jquery";
import introBg from "images/introBg.jpg";

const IntroducePage = ({ scrollY }) => {
  useEffect(() => {
    if (scrollY > $(".info-title").offset().top - (window.innerHeight - 200))
      $(".info-title").addClass("animate");
    if (scrollY > $(".info-box").offset().top - (window.innerHeight - 200))
      $(".info-box").addClass("animate");
  }, [scrollY]);

  return (
    <div className="container introducePage">
      <h2 className="title info-title even">INTRODUCE</h2>
      <img src={introBg} alt="메인이미지" className="introduceBg pageImg" />
      <div className="column info-box">
        <div className="row">
          <span>이름</span>
          <h4>조원상</h4>
        </div>
        <div className="row">
          <span>생년월일</span>
          <h4>1996.08.15</h4>
        </div>
        <div className="row">
          <span>소속사</span>
          <h4>MYSTIC STORY</h4>
        </div>
        <div className="row">
          <span>소속 그룹</span>
          <h4>LUCY</h4>
        </div>
        <div className="row">
          <span>포지션</span>
          <h4>프로듀싱 & 베이스</h4>
        </div>
      </div>
    </div>
  );
};

export default IntroducePage;
