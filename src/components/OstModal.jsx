// OST 상세 모달. 커버·제목·발매일과 Spotify 임베드 플레이어를 보여준다(크레딧 데이터는 없음).

import { useEffect } from 'react'

const OstModal = ({ ost, modalToggle, setModalToggle }) => {
  useEffect(() => {
    if (modalToggle) document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'auto')
  }, [modalToggle])

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && setModalToggle(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setModalToggle])

  // spotify URL(open.spotify.com/album/{id})에서 임베드용 id 추출
  const albumId = ost?.spotify?.split('/album/')[1]?.split('?')[0]

  return (
    <div className='album-modal-bg' onClick={() => setModalToggle(false)}>
      <div className='album-modal'>
        <img
          src={ost?.cover}
          alt='OST 커버'
          className='album-modal-cover'
          onClick={e => e.stopPropagation()}
        />
        <div
          className='album-modal-content ost column'
          onClick={e => e.stopPropagation()}
        >
          <button className='closeBtn' onClick={() => setModalToggle(false)}>
            ✖
          </button>
          <h2 className='album-name'>{ost?.name}</h2>
          <span className='released-date'>
            {ost?.release?.replaceAll('/', '.')} Released
          </span>
          {albumId && (
            <iframe
              className='spotify-embed'
              src={`https://open.spotify.com/embed/album/${albumId}?theme=0`}
              title='Spotify player'
              loading='lazy'
              allow='encrypted-media'
            ></iframe>
          )}
          {ost?.spotify && (
            <a
              href={ost.spotify}
              target='_blank'
              rel='noopener noreferrer'
              className='ost-listen'
            >
              ▶ Listen on Spotify
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default OstModal
