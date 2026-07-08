// 요소가 뷰포트에 들어오면 'animate' 클래스를 붙이는 스크롤 리빌 훅 (jQuery 대체)

import { useEffect, useRef } from 'react'

export const useScrollReveal = () => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate')
          io.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return ref
}
