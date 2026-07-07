// 사이트 전역 언어(ko/en) 상태와 번역 텍스트를 제공하는 Context

import { createContext, useContext, useState } from 'react'
import { translations } from 'data/i18n'

const LanguageContext = createContext(null)

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('ko')
  const toggle = () => setLang(prev => (prev === 'ko' ? 'en' : 'ko'))

  return (
    <LanguageContext.Provider value={{ lang, toggle, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
