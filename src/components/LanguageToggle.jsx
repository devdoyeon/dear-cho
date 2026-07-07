// 한국어/영어를 전환하는 좌상단 고정 토글 버튼

import { useLanguage } from 'context/LanguageContext'

const LanguageToggle = () => {
  const { lang, toggle } = useLanguage()

  return (
    <button
      className='lang-toggle'
      onClick={toggle}
      aria-label='Toggle language'
    >
      {lang === 'ko' ? 'EN' : 'KO'}
    </button>
  )
}

export default LanguageToggle
