import { useEffect } from 'react'
import participatedSongInfo from 'data/participatedSongInfo.json'
import { useLanguage } from 'context/LanguageContext'

const ParticipatedSongModal = ({ imgInfo, modalToggle, setModalToggle }) => {
  const { t } = useLanguage()

  useEffect(() => {
    if (modalToggle) document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'auto')
  }, [modalToggle])

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setModalToggle(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setModalToggle])

  const songDetail = participatedSongInfo.information[imgInfo?.idx]

  return (
    <div className='album-modal-bg' onClick={() => setModalToggle(false)}>
      <div className='album-modal'>
        <img
          src={imgInfo?.img}
          alt='앨범 커버'
          className='album-modal-cover'
          onClick={e => e.stopPropagation()}
        />
        <div
          className='album-modal-content participated column'
          onClick={e => e.stopPropagation()}
        >
          <button className='closeBtn' onClick={() => setModalToggle(false)}>
            ✖
          </button>
          <div className='song column'>
            <span className={`song-title`}>{songDetail?.title}</span>
            <br />
            <span className='artist'>
              <b>Artist</b> {songDetail?.artist}
            </span>
            <br />
            <span className='parts'>
              <b>Parts of</b>{' '}
              {songDetail?.parts.map(part => t.parts[part] || part).join(', ')}
            </span>
          </div>
          {/*<div className='column song-list'>{renderSongList()}</div>*/}
        </div>
      </div>
    </div>
  )
}

export default ParticipatedSongModal
