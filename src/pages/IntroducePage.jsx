import introBg from "images/introBg.jpg";
import { useLanguage } from "context/LanguageContext";
import { useScrollReveal } from "js/useScrollReveal";

const IntroducePage = () => {
  const { t } = useLanguage();
  const titleRef = useScrollReveal();
  const boxRef = useScrollReveal();

  return (
    <div className="container introduce-page" id="introduce">
      <h2 ref={titleRef} className="title info-title even">
        INTRODUCE
      </h2>
      <img src={introBg} alt="메인이미지" className="introduceBg pageImg" />
      <div ref={boxRef} className="column info-box">
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
