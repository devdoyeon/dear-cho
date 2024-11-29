import { useEffect } from 'react'
import $ from 'jquery'
import ListWrap from 'components/ListWrap'
import soundCloudBg from 'images/soundcloudBg.jpg'
import soundCloudInfo from 'data/soundCloudInfo.json'

const SoundCloudPage = ({ scrollY }) => {
  useEffect(() => {
    if (scrollY > $('.sc-title').offset().top - (window.innerHeight - 200))
      $('.sc-title').addClass('animate')
    if (scrollY > $('.sc-wrap').offset().top - (window.innerHeight - 200))
      $('.sc-wrap').addClass('animate')
  }, [scrollY])

  const renderSCWidget = () => {
    return soundCloudInfo?.information.map(
      ({ code, color }) => {
        return (
          <div className='column card item'>
            <iframe
              className='sc-item'
              allow='autoplay'
              src={`https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${code}&color=%23${color}&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=true&visual=true&show_playcount=false`}
            ></iframe>
          </div>
        )
      },
      <></>
    )
  }

  return (
    <div className='container sc-page'>
      <h2 className='title sc-title even'>SOUNDCLOUD</h2>
      <img src={soundCloudBg} alt='SoundCloud Page Image' className='pageImg' />
      <ListWrap renderListFn={renderSCWidget} className='sc-wrap' />
      <p>모바일 환경에서는 Listen in browser를 클릭해 주셔야 음악을 재생하실 수 있습니다.</p>
    </div>
  )
}

export default SoundCloudPage
