import { useEffect, useState } from 'react'
import participationBg from 'images/participationBg.jpg'
import $ from 'jquery'
import ParticipatedSongModal from 'components/ParticipatedSongModal'
import ListWrap from 'components/ListWrap'

import partSong0 from 'images/participatedAlbumCover/0.jpg'
import partSong1 from 'images/participatedAlbumCover/1.jpg'
import partSong2 from 'images/participatedAlbumCover/2.jpg'
import partSong3 from 'images/participatedAlbumCover/3.jpg'
import partSong4 from 'images/participatedAlbumCover/4.jpg'
import partSong5 from 'images/participatedAlbumCover/5.jpg'
import partSong6 from 'images/participatedAlbumCover/6.jpg'
import partSong7 from 'images/participatedAlbumCover/7.jpg'
import partSong8 from 'images/participatedAlbumCover/8.jpg'
import partSong9 from 'images/participatedAlbumCover/9.jpg'
import partSong10 from 'images/participatedAlbumCover/10.jpg'
import partSong11 from 'images/participatedAlbumCover/11.jpg'
import partSong12 from 'images/participatedAlbumCover/12.jpg'
import partSong13 from 'images/participatedAlbumCover/13.jpg'
import partSong14 from 'images/participatedAlbumCover/14.jpg'
import partSong15 from 'images/participatedAlbumCover/15.jpg'

const ParticipationPage = ({ scrollY }) => {
  const [modalToggle, setModalToggle] = useState(false)
  const [imgInfo, setImgInfo] = useState({ img: '', idx: '' })

  const partSongArr = [
    partSong0,
    partSong1,
    partSong2,
    partSong3,
    partSong4,
    partSong5,
    partSong6,
    partSong7,
    partSong8,
    partSong9,
    partSong10,
    partSong11,
    partSong12,
    partSong13,
    partSong14,
    partSong15,
  ]

  const renderParticipatedAlbumList = () => {
    return partSongArr.map((albumCover, idx) => {
      return (
        <>
          <img
            src={albumCover}
            alt={idx}
            className='item album-cover'
            onClick={() => {
              setImgInfo(prev => {
                const clone = { ...prev }
                clone.img = albumCover
                clone.idx = idx
                return clone
              })
              setModalToggle(true)
            }}
          />
        </>
      )
    })
  }

  useEffect(() => {
    if (
      scrollY >
      $('.participation-title').offset().top - (window.innerHeight - 200)
    )
      $('.participation-title').addClass('animate')
    if (
      scrollY >
      $('.participated-song-wrap').offset().top - (window.innerHeight - 200)
    )
      $('.participated-song-wrap').addClass('animate')
  }, [scrollY])

  return (
    <>
      <div className='container participation-page'>
        <h2 className='title participation-title even'>PARTICIPATED SONG</h2>
        <img
          src={participationBg}
          alt='참여 음반 배경이미지'
          className='pageImg'
        />
        <ListWrap
          renderListFn={renderParticipatedAlbumList}
          className='participated-song-wrap'
        />
      </div>
      {modalToggle && (
        <ParticipatedSongModal
          imgInfo={imgInfo}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        />
      )}
    </>
  )
}

export default ParticipationPage
