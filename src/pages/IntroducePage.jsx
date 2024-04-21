import { useEffect, useState } from 'react';
// import SwiperCore, { Navigation } from 'swiper';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper.css';
// import 'swiper/css/navigation';
// import YouTube from 'react-youtube';
// import { isBrowser, isMobile } from 'react-device-detect';

const IntroducePage = () => {
  // SwiperCore.use([Navigation]);

  // const idArr = [
  //   '6b-2rqPr6gE',
  //   'EuTwMSnwYeI',
  //   '_L55mXoIRjk',
  //   'HPXald8Nr2g',
  //   'UhETtNInxIs',
  // ];

  const [info, setInfo] = useState('');

  useEffect(() => {
    console.log(info);
  }, [info]);

  return (
    <div className='container intro'>
      <h2 className='title'>INFO</h2>
      <div className='column info-box'>
        <div
          className='row'
          onMouseEnter={() => setInfo('name')}
          onMouseLeave={() => setInfo('')}>
          <span>이름</span>
          <h4>조원상</h4>
        </div>
        <div
          className='row'
          onMouseEnter={() => setInfo('birth')}
          onMouseLeave={() => setInfo('')}>
          <span>생년월일</span>
          <h4>1996.08.15</h4>
        </div>
        <div
          className='row'
          onMouseEnter={() => setInfo('company')}
          onMouseLeave={() => setInfo('')}>
          <span>소속사</span>
          <h4>MYSTIC STORY</h4>
        </div>
        <div
          className='row'
          onMouseEnter={() => setInfo('group')}
          onMouseLeave={() => setInfo('')}>
          <span>소속 그룹</span>
          <h4>LUCY</h4>
        </div>
        <div
          className='row'
          onMouseEnter={() => setInfo('position')}
          onMouseLeave={() => setInfo('')}>
          <span>포지션</span>
          <h4>프로듀싱 / 베이스</h4>
        </div>
      </div>
      {/* <h2 className='title'>YOUTUBE</h2>
      <Swiper
        className='main-swiper'
        loop={true}
        modules={[Navigation]}
        centeredSlides={true}
        allowTouchMove={!isBrowser}
        navigation={isBrowser}>
        {idArr?.map(id => {
          return (
            <SwiperSlide>
              <YouTube
                videoId={id}
                opts={{
                  width: `${window.innerWidth - 600}`,
                  height: `${window.innerHeight - 400}`,
                  playerVars: {
                    modestbranding: 0,
                  },
                }}
              />
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </div>
  );
};

export default IntroducePage;
