import logo from "images/dearcho.svg";
import githubIcon from "images/snsIcon/github.svg";
import mailIcon from "images/snsIcon/mailIcon.svg";
import { useLanguage } from "context/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  return (
    <div className="footer row">
      <div className="column footer-content">
        <a
          href="https://github.com/devdoyeon/"
          target="_blank"
          rel="noopener noreferrer"
          className="row github"
        >
          <img src={githubIcon} alt="깃허브 아이콘" />
          <span>GitHub</span>
        </a>
        <div className="row mail">
          <img src={mailIcon} alt="메일 아이콘" />
          <span>devdoyeon@gmail.com</span>
        </div>
        <p>{t.footerNotice}</p>
        <p className="for">for Wonsang Cho</p>
        <p className="copyright">
          Copyright 2025. devdoyeon all rights reserved.
        </p>
      </div>
      <img src={logo} alt="DEAR CHO 로고" className="logo" />
    </div>
  );
};

export default Footer;
