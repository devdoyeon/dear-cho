// LUCY가 참여한 OST 목록(Spotify 자동 수집)을 보여주는 페이지. 커버 클릭 시 모달로 상세 표시

import { useState } from 'react'
import ListWrap from 'components/ListWrap'
import OstModal from 'components/OstModal'
import ostData from 'data/ostData.json'
import ostBg from 'images/ostBg.jpg'
import { useScrollReveal } from 'js/useScrollReveal'

const OstPage = () => {
  const [modalToggle, setModalToggle] = useState(false)
  const [selected, setSelected] = useState(null)
  const titleRef = useScrollReveal()
  const wrapRef = useScrollReveal()

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
      </div>
    ))
  }

  return (
    <>
      <div className='container ost-page' id='ost'>
        <h2 ref={titleRef} className='title ost-title even'>
          OST
        </h2>
        <img src={ostBg} alt='OST 배경이미지' className='pageImg' />
        <ListWrap
          ref={wrapRef}
          renderListFn={renderOstList}
          className='ost-wrap'
        />
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
