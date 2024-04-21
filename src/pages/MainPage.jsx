import main from 'images/mainPhoto.jpg';
import scrollDownIcon from 'images/scrollDown.svg';
import mainLogo from 'images/dearcho.svg'
import sign from 'images/sign.png'

const MainPage = () => {
  return (
    <div className='container main'>
        <img src={main} alt='메인이미지' className='mainImg' />
        <img src={mainLogo} alt="메인 로고" className='mainLogo' />
        <img src={sign} alt="싸인" className='sign' />
        <img
          src={scrollDownIcon}
          alt='스크롤 다운 아이콘'
          className='scroll-down-icon'
        />
    </div>
  );
};

export default MainPage;
