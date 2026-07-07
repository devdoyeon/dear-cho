import { useEffect } from "react";
import $ from "jquery";
import introBg from "images/introBg.jpg";
import { useLanguage } from "context/LanguageContext";

const IntroducePage = ({ scrollY }) => {
  const { t } = useLanguage();

  useEffect(() => {
    if (scrollY > $(".info-title").offset().top - (window.innerHeight - 200))
      $(".info-title").addClass("animate");
    if (scrollY > $(".info-box").offset().top - (window.innerHeight - 200))
      $(".info-box").addClass("animate");
  }, [scrollY]);

  return (
    <div className="container introduce-page">
      <h2 className="title info-title even">INTRODUCE</h2>
      <img src={introBg} alt="메인이미지" className="introduceBg pageImg" />
      <div className="column info-box">
        <div className="row">
          <span>{t.introLabels.name}</span>
          <h4>{t.introValues.name}</h4>
        </div>
        <div className="row">
          <span>{t.introLabels.birth}</span>
          <h4>1996.08.15</h4>
        </div>
        <div className="row">
          <span>{t.introLabels.agency}</span>
          <h4>MYSTIC STORY</h4>
        </div>
        <div className="row">
          <span>{t.introLabels.group}</span>
          <h4>LUCY</h4>
        </div>
        <div className="row">
          <span>{t.introLabels.position}</span>
          <h4>{t.introValues.position}</h4>
        </div>
      </div>
    </div>
  );
};

export default IntroducePage;
