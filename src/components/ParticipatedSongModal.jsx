import { useEffect } from 'react'
import participatedSongInfo from 'data/participatedSongInfo.json'

const ParticipatedSongModal = ({ imgInfo, modalToggle, setModalToggle }) => {
  useEffect(() => {
    if (modalToggle) document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'auto')
  }, [modalToggle])

  const songDetail = participatedSongInfo.information[imgInfo?.idx]

  return (
    <div className='album-modal-bg'>
      <div className='album-modal'>
        <img src={imgInfo?.img} alt='앨범 커버' className='album-modal-cover' />
        <div className='album-modal-content participated column'>
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
              <b>Parts of</b> {songDetail?.parts.join(', ')}
            </span>
          </div>
          {/*<div className='column song-list'>{renderSongList()}</div>*/}
        </div>
      </div>
    </div>
  )
}

export default ParticipatedSongModal
