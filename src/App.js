import './App.css';
import { useState, useEffect } from 'react';
import Navigator from 'components/Navigator';
import MainPage from './pages/MainPage';
import IntroducePage from 'pages/IntroducePage';

function App() {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 300) setToggle(true);
      else setToggle(false);
    });
  }, []);

  return (
    <div className='App'>
      {<Navigator toggle={toggle} />}
      {<MainPage />}
      {<IntroducePage />}
    </div>
  );
}

export default App;
