import { useState, useEffect } from 'react'
import Navigator from 'components/Navigator'
import MainPage from 'pages/MainPage'
import IntroducePage from 'pages/IntroducePage'
import StatsPage from './pages/StatsPage'
import AlbumPage from 'pages/AlbumPage'
import ParticipationPage from './pages/ParticipationPage'
import OstPage from './pages/OstPage'
import YoutubePage from 'pages/YoutubePage'
import SoundCloudPage from './pages/SoundCloudPage'
import SnsPage from './pages/SnsPage'
import Footer from './components/Footer'
import LanguageToggle from './components/LanguageToggle'
import NewAlbumModal from './components/NewAlbumModal'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

function App() {
  const [toggle, setToggle] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const scrollYFn = async () => {
    const scrollYHandler = () =>
      setScrollY(window.scrollY || window.pageYOffset)
    const watch = () => window.addEventListener('scroll', scrollYHandler)
    watch()
    return () => window.removeEventListener('scroll', scrollYHandler)
  }

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 300) setToggle(true)
      else setToggle(false)
    })
  }, [])

  useEffect(() => {
    scrollYFn()
  }, [scrollY])

  return (
    <LanguageProvider>
      <div className='App'>
        <NewAlbumModal />
        <LanguageToggle />
        <Navigator toggle={toggle} />
        <MainPage />
        <IntroducePage scrollY={scrollY} />
        <StatsPage scrollY={scrollY} />
        <AlbumPage scrollY={scrollY} />
        <ParticipationPage scrollY={scrollY} />
        <OstPage scrollY={scrollY} />
        <YoutubePage scrollY={scrollY} />
        <SoundCloudPage scrollY={scrollY} />
        <SnsPage scrollY={scrollY} />
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
