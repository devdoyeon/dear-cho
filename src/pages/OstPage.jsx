// LUCY가 참여한 OST 목록(Spotify 자동 수집)을 보여주는 페이지. 커버 클릭 시 Spotify로 이동

import { useState, useEffect } from 'react'
import $ from 'jquery'
import ListWrap from 'components/ListWrap'
import OstModal from 'components/OstModal'
import ostData from 'data/ostData.json'
import ostBg from 'images/albumBg.jpg'

const OstPage = ({ scrollY }) => {
  const [modalToggle, setModalToggle] = useState(false)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (scrollY > $('.ost-title').offset().top - (window.innerHeight - 200))
      $('.ost-title').addClass('animate')
    if (scrollY > $('.ost-wrap').offset().top - (window.innerHeight - 200))
      $('.ost-wrap').addClass('animate')
  }, [scrollY])

  const renderOstList = () => {
    return ostData.map((ost, idx) => (
      <div
        key={idx}
        className='ost-item'
        onClick={() => {
          setSelected(ost)
          setModalToggle(true)
        }}
      >
        <img
          src={ost.cover}
          alt={ost.name}
          className='album-cover'
          loading='lazy'
          decoding='async'
        />
        <p className='ost-name'>{ost.name}</p>
      </div>
    ))
  }

  return (
    <>
      <div className='container ost-page'>
        <h2 className='title ost-title even'>OST</h2>
        <img src={ostBg} alt='OST 배경이미지' className='pageImg' />
        <ListWrap renderListFn={renderOstList} className='ost-wrap' />
      </div>
      {modalToggle && selected && (
        <OstModal
          ost={selected}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        />
      )}
    </>
  )
}

export default OstPage
