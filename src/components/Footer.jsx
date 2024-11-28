import logo from "images/dearcho.svg";
import githubIcon from "images/snsIcon/github.svg";
import mailIcon from "images/snsIcon/mailIcon.svg";

const Footer = () => {
  return (
    <div className="footer row">
      <div className="column footer-content">
        <a
          href="https://github.com/devdoyeon/"
          target="_blank"
          className="row github"
        >
          <img src={githubIcon} alt="깃허브 아이콘" />
          <span>GitHub</span>
        </a>
        <div className="row mail">
          <img src={mailIcon} alt="메일 아이콘" />
          <span>devdoyeon@gmail.com</span>
        </div>
        <p>
          본 사이트는 개인이 만든 사이트로서
          {window.innerWidth <= 480 ? <br /> : <> </>}공식적이지 않습니다.
        </p>
        <p>
          This site is not official{window.innerWidth <= 480 ? <br /> : <> </>}
          as a personally created site.
        </p>
        <p className="for">for Wonsang Cho</p>
        <p className="copyright">
          Copyright 2024. devdoyeon all rights reserved.
        </p>
      </div>
      <img src={logo} alt="DEAR CHO 로고" className="logo" />
    </div>
  );
};

export default Footer;
