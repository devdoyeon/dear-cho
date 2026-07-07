// 앨범 데이터(한글 크레딧 + Spotify 커버/발매일)를 spotifyId로 병합·정렬하고 NEW 여부를 계산하는 유틸

// "2020/05/08" 또는 "2020.05.08" 형태의 발매일을 Date로 파싱
export const parseReleaseDate = release => {
  if (!release) return null
  const [year, month, day] = release.replaceAll('.', '/').split('/').map(Number)
  return new Date(year, (month || 1) - 1, day || 1)
}

// 발매일이 오늘로부터 days일 이내면 신보(NEW)로 간주
export const isNewRelease = (release, days = 90) => {
  const date = parseReleaseDate(release)
  if (!date) return false
  const diff = Date.now() - date.getTime()
  return diff >= 0 && diff <= days * 24 * 60 * 60 * 1000
}

// 수동 크레딧(creditMap: 앨범명 키) + Spotify 데이터(dataMap: spotifyId 키)를 병합해
// 최신 발매순으로 정렬한 앨범 배열을 만든다.
// lang이 'en'이면 앨범명·트랙명을 Spotify 영어 표기로 치환한다(트랙은 순서로 매칭, 없으면 한글 폴백).
export const buildAlbumList = (creditMap, dataMap, lang = 'ko') => {
  const useEn = lang === 'en'
  return Object.entries(creditMap)
    .map(([krName, credit]) => {
      const data = dataMap?.[credit.spotifyId] || {}
      const tracks = (credit.tracks ?? []).map((t, i) => ({
        title: useEn && data.tracklistEn?.[i] ? data.tracklistEn[i] : t.title,
        lead: t.lead ?? false,
        lyrics: t.lyrics ?? '',
        compose: t.compose ?? '',
        arrange: t.arrange ?? '',
      }))
      return {
        albumName: useEn && data.albumNameEn ? data.albumNameEn : krName,
        spotifyId: credit.spotifyId,
        albumType: credit.albumType ?? '',
        cover: data.cover ?? '',
        release: data.release ?? '',
        spotify: data.spotify ?? '',
        tracks,
      }
    })
    .sort((a, b) => {
      const dateA = parseReleaseDate(a.release)?.getTime() ?? 0
      const dateB = parseReleaseDate(b.release)?.getTime() ?? 0
      return dateB - dateA
    })
}
