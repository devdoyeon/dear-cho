// 사이트 진입 시 최신 앨범이 NEW(90일 이내)면 홍보하는 모달. 닫으면 localStorage에 기억해 재방문 시 숨긴다.

import { useState, useEffect } from 'react'
import albumCredit from 'data/albumCredit.json'
import albumData from 'data/albumData.json'
import { buildAlbumList, isNewRelease } from 'js/albumUtils'
import { useLanguage } from 'context/LanguageContext'

const STORAGE_KEY = 'dismissedAlbum'

const NewAlbumModal = () => {
  const { lang } = useLanguage()
  const [show, setShow] = useState(false)
  const latest = buildAlbumList(albumCredit, albumData, lang)[0]

  // 마운트 시 1회 판정: 최신 앨범이 NEW이고 아직 닫은 적 없으면 표시
  useEffect(() => {
    if (
      latest &&
      isNewRelease(latest.release) &&
      localStorage.getItem(STORAGE_KEY) !== latest.spotifyId
    ) {
      setShow(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden'
    return () => (document.body.style.overflow = 'auto')
  }, [show])

  const close = () => {
    if (latest?.spotifyId) localStorage.setItem(STORAGE_KEY, latest.spotifyId)
    setShow(false)
  }

  useEffect(() => {
    const onKey = e => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!show || !latest) return null

  return (
    <div className='promo-modal-bg' onClick={close}>
      <div className='promo-modal' onClick={e => e.stopPropagation()}>
        <button className='promo-close' onClick={close}>
          ✖
        </button>
        <span className='promo-label'>NEW ALBUM</span>
        <img src={latest.cover} alt={latest.albumName} className='promo-cover' />
        <h2 className='promo-name'>{latest.albumName}</h2>
        <span className='promo-date'>
          {latest.release?.replaceAll('/', '.')} Released
        </span>
        {latest.spotify && (
          <a
            href={latest.spotify}
            target='_blank'
            rel='noopener noreferrer'
            className='promo-listen'
          >
            ▶ Listen on Spotify
          </a>
        )}
      </div>
    </div>
  )
}

export default NewAlbumModal
