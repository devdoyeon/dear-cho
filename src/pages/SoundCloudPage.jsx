import { useEffect } from 'react'
import $ from 'jquery'
import ListWrap from 'components/ListWrap'
import soundCloudBg from 'images/soundcloudBg.jpg'
import soundCloudInfo from 'data/soundCloudInfo.json'
import { useLanguage } from 'context/LanguageContext'

const SoundCloudPage = ({ scrollY }) => {
  const { t } = useLanguage()
  useEffect(() => {
    if (scrollY > $('.sc-title').offset().top - (window.innerHeight - 200))
      $('.sc-title').addClass('animate')
    if (scrollY > $('.sc-wrap').offset().top - (window.innerHeight - 200))
      $('.sc-wrap').addClass('animate')
  }, [scrollY])

  const renderSCWidget = () => {
    return soundCloudInfo?.information.map(({ code, color }) => (
      <div className='column card item' key={code}>
        <iframe
          className='sc-item'
          title={`soundcloud-${code}`}
          loading='lazy'
          allow='autoplay'
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${code}&color=%23${color}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true&show_playcount=false`}
        ></iframe>
      </div>
    ))
  }

  return (
    <div className='container sc-page'>
      <h2 className='title sc-title even'>SOUNDCLOUD</h2>
      <img src={soundCloudBg} alt='SoundCloud Page Image' className='pageImg' />
      <ListWrap renderListFn={renderSCWidget} className='sc-wrap' />
      <p>{t.scGuide}</p>
    </div>
  )
}

export default SoundCloudPage
