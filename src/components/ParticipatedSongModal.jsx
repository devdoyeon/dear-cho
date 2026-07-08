import participatedSongInfo from 'data/participatedSongInfo.json'
import { useLanguage } from 'context/LanguageContext'
import { useModalBehavior } from 'js/useModalBehavior'

const ParticipatedSongModal = ({ imgInfo, modalToggle, setModalToggle }) => {
  const { t } = useLanguage()
  const close = () => setModalToggle(false)
  const containerRef = useModalBehavior(modalToggle, close)

  const songDetail = participatedSongInfo.information[imgInfo?.idx]

  return (
    <div className='album-modal-bg' onClick={close}>
      <div
        className='album-modal'
        ref={containerRef}
        role='dialog'
        aria-modal='true'
        aria-label={songDetail?.title}
      >
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
          <button className='closeBtn' aria-label='닫기' onClick={close}>
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
        </div>
      </div>
    </div>
  )
}

export default ParticipatedSongModal
