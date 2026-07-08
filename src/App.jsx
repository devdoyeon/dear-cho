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
import SectionNav from './components/SectionNav'
import { LanguageProvider } from './context/LanguageContext'
import './App.css'

function App() {
  const [toggle, setToggle] = useState(false)

  useEffect(() => {
    const onScroll = () => setToggle(window.scrollY >= 300)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <LanguageProvider>
      <div className='App'>
        <NewAlbumModal />
        <LanguageToggle />
        <SectionNav />
        <Navigator toggle={toggle} />
        <MainPage />
        <IntroducePage />
        <StatsPage />
        <AlbumPage />
        <ParticipationPage />
        <OstPage />
        <YoutubePage />
        <SoundCloudPage />
        <SnsPage />
        <Footer />
      </div>
    </LanguageProvider>
  )
}

export default App
