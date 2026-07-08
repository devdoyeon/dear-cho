import ListWrap from '../components/ListWrap';
import snsInfo from 'data/snsInfo.json';
import SnsImg from 'images/SnsBg.png';
import instagram from 'images/snsIcon/instagram.svg';
import twitter from 'images/snsIcon/twitter.svg';
import facebook from 'images/snsIcon/facebook.svg';
import youtube from 'images/snsIcon/youtube.svg';
import soundcloud from 'images/snsIcon/soundcloud.svg';
import { useScrollReveal } from 'js/useScrollReveal';

const SNS_ICON = { instagram, twitter, facebook, youtube, soundcloud };

const SnsPage = () => {
  const titleRef = useScrollReveal();
  const wrapRef = useScrollReveal();

  const renderSNSInfo = () => {
    return snsInfo?.information.map(({ type, name, link }, idx) => (
      <a
        key={idx}
        href={link}
        target='_blank'
        rel='noopener noreferrer'
        className='row card item'
      >
        <img src={SNS_ICON[type] || soundcloud} alt={type} />
        <div>
          <h3>{type.toUpperCase()}</h3>
          <p>@{name}</p>
        </div>
      </a>
    ));
  };

  return (
    <div className='container sns-page' id='sns'>
      <h2 ref={titleRef} className='title sns-title odd'>
        SNS & MEDIA
      </h2>
      <img src={SnsImg} alt='SNS Page Image' className='pageImg' />
      <ListWrap ref={wrapRef} renderListFn={renderSNSInfo} className='card-wrap' />
    </div>
  );
};

export default SnsPage;
