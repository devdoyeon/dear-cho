// 우측 세로 도트 섹션 네비게이션. 현재 섹션을 하이라이트하고 클릭 시 부드럽게 스크롤한다.

import { useState, useEffect } from 'react'

const SECTIONS = [
  { id: 'main', label: 'Home' },
  { id: 'introduce', label: 'Introduce' },
  { id: 'stats', label: 'Discography' },
  { id: 'album', label: 'Album' },
  { id: 'participated', label: 'Participated' },
  { id: 'ost', label: 'OST' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'soundcloud', label: 'SoundCloud' },
  { id: 'sns', label: 'SNS' },
]

const SectionNav = () => {
  const [active, setActive] = useState('main')

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { threshold: 0.5 }
    )
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = id =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  useEffect(() => {
    const onKeyDown = e => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'IFRAME') return
      if (document.querySelector('.album-modal-bg, .promo-modal-bg')) return

      e.preventDefault()
      const idx = SECTIONS.findIndex(({ id }) => id === active)
      const nextIdx =
        e.key === 'ArrowDown'
          ? Math.min(idx + 1, SECTIONS.length - 1)
          : Math.max(idx - 1, 0)
      goTo(SECTIONS[nextIdx].id)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  return (
    <nav className='section-nav'>
      {SECTIONS.map(({ id, label }) => (
        <button
          key={id}
          className={`section-dot ${active === id ? 'active' : ''}`}
          onClick={() => goTo(id)}
          aria-label={label}
        >
          <span className='section-label'>{label}</span>
        </button>
      ))}
    </nav>
  )
}

export default SectionNav
