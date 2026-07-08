// 모달 공통 접근성 동작: 배경 스크롤 잠금, ESC 닫기, 포커스 트랩, 닫힐 때 포커스 복원

import { useEffect, useRef } from 'react'

export const useModalBehavior = (open, onClose) => {
  const containerRef = useRef(null)
  const triggerRef = useRef(null)

  useEffect(() => {
    if (!open) return
    triggerRef.current = document.activeElement

    document.body.style.overflow = 'hidden'

    const focusable = containerRef.current?.querySelectorAll(
      'button, a[href], iframe, [tabindex]:not([tabindex="-1"])'
    )
    focusable?.[0]?.focus()

    const onKeyDown = e => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab' || !focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', onKeyDown)
      triggerRef.current?.focus?.()
    }
  }, [open, onClose])

  return containerRef
}
