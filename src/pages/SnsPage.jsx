import { useEffect } from 'react';
import $ from 'jquery';
import ListWrap from '../components/ListWrap';
import snsInfo from 'data/snsInfo.json';
import SnsImg from 'images/SnsBg.jpg';
import instagram from 'images/snsIcon/instagram.svg';
import twitter from 'images/snsIcon/twitter.svg';
import facebook from 'images/snsIcon/facebook.svg';
import youtube from 'images/snsIcon/youtube.svg';
import soundcloud from 'images/snsIcon/soundcloud.svg';

const SnsPage = ({ scrollY }) => {
  useEffect(() => {
    if (scrollY > $('.sns-title').offset().top - (window.innerHeight - 200))
      $('.sns-title').addClass('animate');
    if (scrollY > $('.card-wrap').offset().top - (window.innerHeight - 200))
      $('.card-wrap').addClass('animate');
  }, [scrollY]);

  const renderSNSInfo = () => {
    return snsInfo?.information.map(
      ({ type, name, link }) => {
        return (
          <a href={link} target='_blank' className='row card item'>
            <img
              src={
                type === 'instagram'
                  ? instagram
                  : type === 'facebook'
                    ? facebook
                    : type === 'twitter'
                      ? twitter
                      : type === 'youtube'
                        ? youtube
                        : soundcloud
              }
              alt={`샘플`}
            />
            <div>
              <h3>{type.toUpperCase()}</h3>
              <p>@{name}</p>
            </div>
          </a>
        );
      },
      <></>
    );
  };

  return (
    <div className='container sns-page'>
      <h2 className='title sns-title odd'>SNS & MEDIA</h2>
      <img src={SnsImg} alt='SNS Page Image' className='pageImg' />
      <ListWrap renderListFn={renderSNSInfo} className='card-wrap' />
    </div>
  );
};

export default SnsPage;
