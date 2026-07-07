// 디스코그래피 요약 통계 섹션. 데이터에서 자동 계산되어 새 앨범이 늘면 숫자도 자동 갱신된다.

import { useEffect } from 'react'
import $ from 'jquery'
import albumCredit from 'data/albumCredit.json'
import albumData from 'data/albumData.json'
import ostData from 'data/ostData.json'
import participatedSongInfo from 'data/participatedSongInfo.json'

const StatsPage = ({ scrollY }) => {
  const albumCount = Object.keys(albumCredit).length
  const trackCount = Object.values(albumCredit).reduce(
    (sum, a) => sum + (a.tracks?.length || 0),
    0
  )
  const ostCount = ostData.length
  const partCount = participatedSongInfo.information.length
  const releaseYears = Object.values(albumData)
    .map(d => parseInt(d.release) || null)
    .filter(Boolean)
  const years = releaseYears.length
    ? new Date().getFullYear() - Math.min(...releaseYears) + 1
    : 0

  const stats = [
    { num: albumCount, label: 'Albums' },
    { num: trackCount, label: 'Tracks' },
    { num: ostCount, label: 'OST' },
    { num: partCount, label: 'Participated' },
    { num: years, label: 'Years' },
  ]

  useEffect(() => {
    if (scrollY > $('.stats-title').offset().top - (window.innerHeight - 200))
      $('.stats-title').addClass('animate')
    if (scrollY > $('.stats-grid').offset().top - (window.innerHeight - 200))
      $('.stats-grid').addClass('animate')
  }, [scrollY])

  return (
    <div className='container stats-page'>
      <h2 className='title stats-title even'>DISCOGRAPHY</h2>
      <div className='row stats-grid'>
        {stats.map(({ num, label }) => (
          <div className='stat-item' key={label}>
            <span className='stat-num'>{num}</span>
            <span className='stat-label'>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsPage
