// 디스코그래피 요약 통계 + 연도별 발매 타임라인. 데이터에서 자동 계산되어 새 앨범이 늘면 갱신된다.

import albumCredit from 'data/albumCredit.json'
import albumData from 'data/albumData.json'
import ostData from 'data/ostData.json'
import participatedSongInfo from 'data/participatedSongInfo.json'
import { buildAlbumList } from 'js/albumUtils'
import { useScrollReveal } from 'js/useScrollReveal'

const StatsPage = () => {
  const titleRef = useScrollReveal()
  const gridRef = useScrollReveal()
  const timelineRef = useScrollReveal()

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

  // 연도별 앨범 그룹 (오래된 → 최신)
  const albumList = buildAlbumList(albumCredit, albumData)
  const byYear = {}
  albumList.forEach(a => {
    const y = (a.release || '').slice(0, 4)
    if (y) (byYear[y] = byYear[y] || []).push(a)
  })
  const timelineYears = Object.keys(byYear).sort()

  return (
    <div className='container stats-page' id='stats'>
      <h2 ref={titleRef} className='title stats-title even'>
        DISCOGRAPHY
      </h2>
      <div ref={gridRef} className='row stats-grid'>
        {stats.map(({ num, label }) => (
          <div className='stat-item' key={label}>
            <span className='stat-num'>{num}</span>
            <span className='stat-label'>{label}</span>
          </div>
        ))}
      </div>
      <div ref={timelineRef} className='timeline'>
        {timelineYears.map(year => (
          <div className='timeline-year' key={year}>
            <span className='timeline-label'>{year}</span>
            <div className='timeline-covers'>
              {byYear[year].map(album => (
                <img
                  key={album.spotifyId || album.albumName}
                  src={album.cover}
                  alt={album.albumName}
                  title={album.albumName}
                  className='timeline-cover'
                  loading='lazy'
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StatsPage
