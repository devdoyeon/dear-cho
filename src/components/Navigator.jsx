import logo from 'images/dearcho.svg';

const Navigator = ({ toggle }) => {
  return (
    <div className={`nav row ${toggle ? 'active' : ''}`}>
      <img
        src={logo}
        alt='logo'
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
};

export default Navigator;
