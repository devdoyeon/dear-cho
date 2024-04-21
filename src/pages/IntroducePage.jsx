import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.css';
import 'swiper/css/navigation';
import YouTube from 'react-youtube';
import { isBrowser } from 'react-device-detect';
import { useEffect } from 'react';

const IntroducePage = () => {
  SwiperCore.use([Navigation]);

  const idArr = [
    '6b-2rqPr6gE',
    'EuTwMSnwYeI',
    '_L55mXoIRjk',
    'HPXald8Nr2g',
    'UhETtNInxIs',
  ];

  useEffect(() => {
    console.log(isBrowser)
  },[isBrowser])

  return (
    <div className='container intro'>
      <h2 className='title'>YOUTUBE</h2>
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
      </Swiper>
    </div>
  );
};

export default IntroducePage;
