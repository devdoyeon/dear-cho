import { useEffect, useState } from 'react';
import logo from 'images/dearcho.svg';

const Navigator = () => {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 300) setToggle(true);
      else setToggle(false)
    });
  }, []);

  return (
    <div className={`nav row ${toggle ? 'active' : ''}`}>
      <img src={logo} alt='logo' />
    </div>
  );
};

export default Navigator;
