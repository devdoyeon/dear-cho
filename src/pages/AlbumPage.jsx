import { useState } from 'react'
import AlbumModal from 'components/AlbumModal'
import ListWrap from 'components/ListWrap'
import albumCredit from 'data/albumCredit.json'
import albumData from 'data/albumData.json'
import { buildAlbumList, isNewRelease } from 'js/albumUtils'
import { useLanguage } from 'context/LanguageContext'
import { useScrollReveal } from 'js/useScrollReveal'

import albumBg from 'images/albumBg.jpg'

const AlbumPage = () => {
  const [modalToggle, setModalToggle] = useState(false)
  const [selected, setSelected] = useState(null)
  const { lang } = useLanguage()
  const titleRef = useScrollReveal()
  const wrapRef = useScrollReveal()

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

  return (
    <>
      <div className='container album-page' id='album'>
        <h2 ref={titleRef} className='title album-title odd'>
          ALBUM
        </h2>
        <img src={albumBg} alt='앨범 배경이미지' className='pageImg' />
        <ListWrap
          ref={wrapRef}
          renderListFn={renderAlbumList}
          className='album-wrap'
        />
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
