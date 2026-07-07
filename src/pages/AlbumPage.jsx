import { useState, useEffect } from 'react'
import $ from 'jquery'
import AlbumModal from 'components/AlbumModal'
import ListWrap from 'components/ListWrap'
import albumCredit from 'data/albumCredit.json'
import albumData from 'data/albumData.json'
import { buildAlbumList, isNewRelease } from 'js/albumUtils'
import { useLanguage } from 'context/LanguageContext'

import albumBg from 'images/albumBg.jpg'

const AlbumPage = ({ scrollY }) => {
  const [modalToggle, setModalToggle] = useState(false)
  const [selected, setSelected] = useState(null)
  const { lang } = useLanguage()

  const albumList = buildAlbumList(albumCredit, albumData, lang)

  const renderAlbumList = () => {
    return albumList.map(album => (
      <div
        key={album.spotifyId || album.albumName}
        className='item album-item'
        onClick={() => {
          setSelected(album)
          setModalToggle(true)
        }}
      >
        {isNewRelease(album.release) && <span className='new-badge'>NEW</span>}
        <img
          src={album.cover}
          alt={album.albumName}
          className='album-cover'
          loading='lazy'
          decoding='async'
        />
      </div>
    ))
  }

  useEffect(() => {
    if (scrollY > $('.album-title').offset().top - (window.innerHeight - 200))
      $('.album-title').addClass('animate')
    if (scrollY > $('.album-wrap').offset().top - (window.innerHeight - 200))
      $('.album-wrap').addClass('animate')
  }, [scrollY])

  return (
    <>
      <div className='container album-page'>
        <h2 className='title album-title odd'>ALBUM</h2>
        <img src={albumBg} alt='앨범 배경이미지' className='pageImg' />
        <ListWrap renderListFn={renderAlbumList} className='album-wrap' />
      </div>
      {modalToggle && selected && (
        <AlbumModal
          album={selected}
          modalToggle={modalToggle}
          setModalToggle={setModalToggle}
        />
      )}
    </>
  )
}

export default AlbumPage
