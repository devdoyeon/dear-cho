import { useState } from 'react'
import ListWrap from 'components/ListWrap'
import EmbedSkeleton from 'components/EmbedSkeleton'
import soundCloudBg from 'images/soundcloudBg.jpg'
import soundCloudInfo from 'data/soundCloudInfo.json'
import { useLanguage } from 'context/LanguageContext'
import { useScrollReveal } from 'js/useScrollReveal'

const SoundCloudPage = () => {
  const { t } = useLanguage()
  const titleRef = useScrollReveal()
  const wrapRef = useScrollReveal()
  const [loaded, setLoaded] = useState({})

  const renderSCWidget = () => {
    return soundCloudInfo?.information.map(({ code, color }) => (
      <div className='column card item' key={code}>
        {!loaded[code] && <EmbedSkeleton className='sc-item' />}
        <iframe
          className='sc-item'
          style={{ display: loaded[code] ? 'block' : 'none' }}
          title={`soundcloud-${code}`}
          loading='lazy'
          allow='autoplay'
          onLoad={() => setLoaded(prev => ({ ...prev, [code]: true }))}
          src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${code}&color=%23${color}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true&show_playcount=false`}
        ></iframe>
      </div>
    ))
  }

  return (
    <div className='container sc-page' id='soundcloud'>
      <h2 ref={titleRef} className='title sc-title even'>
        SOUNDCLOUD
      </h2>
      <img src={soundCloudBg} alt='SoundCloud 배경' className='pageImg' />
      <ListWrap ref={wrapRef} renderListFn={renderSCWidget} className='sc-wrap' />
      <p>{t.scGuide}</p>
    </div>
  )
}

export default SoundCloudPage
