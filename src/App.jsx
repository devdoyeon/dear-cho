import { useState, useEffect } from "react";
import MainPage from "pages/MainPage";
import IntroducePage from "pages/IntroducePage";
import AlbumPage from "pages/AlbumPage";
import Navigator from "components/Navigator";
import SnsPage from "./pages/SnsPage";
import Footer from './components/Footer'
import "./App.css";
import "styles/scss/common.scss";

function App() {
  const [toggle, setToggle] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const scrollYFn = async () => {
    const scrollYHandler = () =>
      setScrollY(window.scrollY || window.pageYOffset);
    const watch = () => window.addEventListener("scroll", scrollYHandler);
    watch();
    return () => window.removeEventListener("scroll", scrollYHandler);
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY >= 300) setToggle(true);
      else setToggle(false);
    });
  }, []);

  useEffect(() => {
    scrollYFn();
  }, [scrollY]);

  return (
    <div className="App">
      <Navigator toggle={toggle} />
      <MainPage />
      <IntroducePage scrollY={scrollY} />
      <AlbumPage scrollY={scrollY} />
      <SnsPage scrollY={scrollY} />
      <Footer/>
    </div>
  );
}

export default App;
