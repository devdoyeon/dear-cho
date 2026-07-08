// OST 상세 모달. 커버·제목·발매일과 Spotify 임베드 플레이어를 보여준다(크레딧 데이터는 없음).

import { useState } from 'react'
import EmbedSkeleton from 'components/EmbedSkeleton'
import { useModalBehavior } from 'js/useModalBehavior'

const OstModal = ({ ost, modalToggle, setModalToggle }) => {
  const [embedLoaded, setEmbedLoaded] = useState(false)
  const close = () => setModalToggle(false)
  const containerRef = useModalBehavior(modalToggle, close)

  // spotify URL(open.spotify.com/album/{id})에서 임베드용 id 추출
  const albumId = ost?.spotify?.split('/album/')[1]?.split('?')[0]

  return (
    <div className='album-modal-bg' onClick={close}>
      <div
        className='album-modal'
        ref={containerRef}
        role='dialog'
        aria-modal='true'
        aria-label={ost?.name}
      >
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
          <button className='closeBtn' aria-label='닫기' onClick={close}>
            ✖
          </button>
          <h2 className='album-name'>{ost?.name}</h2>
          <span className='released-date'>
            {ost?.release?.replaceAll('/', '.')} Released
          </span>
          {albumId && (
            <>
              {!embedLoaded && <EmbedSkeleton className='spotify-embed' />}
              <iframe
                className='spotify-embed'
                style={{ display: embedLoaded ? 'block' : 'none' }}
                src={`https://open.spotify.com/embed/album/${albumId}?theme=0`}
                title='Spotify player'
                loading='lazy'
                allow='encrypted-media'
                onLoad={() => setEmbedLoaded(true)}
              ></iframe>
            </>
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
