// LUCY가 참여한 OST 목록(Spotify 자동 수집)을 보여주는 페이지. 커버 클릭 시 Spotify로 이동

import { useEffect } from 'react'
import $ from 'jquery'
import ListWrap from 'components/ListWrap'
import ostData from 'data/ostData.json'
import ostBg from 'images/albumBg.jpg'

const OstPage = ({ scrollY }) => {
  useEffect(() => {
    if (scrollY > $('.ost-title').offset().top - (window.innerHeight - 200))
      $('.ost-title').addClass('animate')
    if (scrollY > $('.ost-wrap').offset().top - (window.innerHeight - 200))
      $('.ost-wrap').addClass('animate')
  }, [scrollY])

  const renderOstList = () => {
    return ostData.map((ost, idx) => (
      <a
        key={idx}
        href={ost.spotify}
        target='_blank'
        rel='noopener noreferrer'
        className='ost-item'
      >
        <img
          src={ost.cover}
          alt={ost.name}
          className='album-cover'
          loading='lazy'
          decoding='async'
        />
        <p className='ost-name'>{ost.name}</p>
      </a>
    ))
  }

  return (
    <div className='container ost-page'>
      <h2 className='title ost-title even'>OST</h2>
      <img src={ostBg} alt='OST 배경이미지' className='pageImg' />
      <ListWrap renderListFn={renderOstList} className='ost-wrap' />
    </div>
  )
}

export default OstPage
