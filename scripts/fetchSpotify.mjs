// Spotify에서 앨범 커버·발매일(정규 앨범)과 OST 목록을 가져온다.
// - 앨범명·트랙명·크레딧은 src/data/albumCredit.json에서 한글 수동 관리(이 스크립트가 안 건드림).
// - 이 스크립트는 albumCredit의 spotifyId로 커버·발매일만 채워 src/data/albumData.json을 만들고,
//   LUCY가 참여한 OST를 src/data/ostData.json으로 자동 수집한다.
//
// 필요한 환경변수:
//   SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET / SPOTIFY_ARTIST_IDS(콤마 구분)
//
// 실행: node scripts/fetchSpotify.mjs   (Node 18+ 내장 fetch)

import { readFileSync, writeFileSync } from 'fs'

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET
const ARTIST_IDS = (process.env.SPOTIFY_ARTIST_IDS || '')
  .split(',')
  .map(s => s.trim())
  .filter(Boolean)
const MARKET = process.env.SPOTIFY_MARKET || 'KR'
const DATA = new URL('../src/data/', import.meta.url)

// OST로 간주할 앨범명 패턴 (드라마/웹툰 사운드트랙, 콜라보 표기)
const OST_PATTERN = /OST|soundtrack|X LUCY/i

if (!CLIENT_ID || !CLIENT_SECRET || !ARTIST_IDS.length) {
  console.error('환경변수 SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_ARTIST_IDS 가 필요합니다.')
  process.exit(1)
}

const getToken = async () => {
  const res = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) throw new Error(`토큰 발급 실패: ${res.status}`)
  return (await res.json()).access_token
}

const api = async (url, token) => {
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } })
  if (!res.ok) throw new Error(`API 실패 ${res.status}: ${url}`)
  return res.json()
}

// 2024-11-27 이후 앱은 limit 상한이 낮아 limit을 지정하지 않고 next만 따라간다.
const paginate = async (url, token) => {
  const items = []
  while (url) {
    const data = await api(url, token)
    items.push(...data.items)
    url = data.next
  }
  return items
}

const run = async () => {
  const token = await getToken()
  const credit = JSON.parse(readFileSync(new URL('albumCredit.json', DATA), 'utf-8'))

  // 1) 정규 앨범: albumCredit의 spotifyId로 커버·발매일만 조회 → { [spotifyId]: {cover, release, spotify} }
  const albumData = {}
  for (const [albumName, info] of Object.entries(credit)) {
    if (!info.spotifyId) {
      console.warn(`spotifyId 없음: ${albumName} — 건너뜀`)
      continue
    }
    const album = await api(
      `https://api.spotify.com/v1/albums/${info.spotifyId}?market=${MARKET}`,
      token
    )
    const tracks = await paginate(
      `https://api.spotify.com/v1/albums/${info.spotifyId}/tracks?market=${MARKET}`,
      token
    )
    albumData[info.spotifyId] = {
      albumNameEn: album.name || '',
      cover: album.images?.[0]?.url || '',
      release: (album.release_date || '').replaceAll('-', '/'),
      spotify: album.external_urls?.spotify || '',
      tracklistEn: tracks.map(t => t.name),
    }
  }
  writeFileSync(new URL('albumData.json', DATA), JSON.stringify(albumData, null, 2) + '\n')
  console.log(`albumData.json: ${Object.keys(albumData).length}개 앨범 (커버·발매일)`)

  // 2) OST: 각 아티스트의 album/single 중 OST 패턴만, 정규 앨범(spotifyId)은 제외
  const regularIds = new Set(Object.values(credit).map(c => c.spotifyId))
  const ostSeen = new Set()
  const ost = []
  for (const artistId of ARTIST_IDS) {
    const albums = await paginate(
      `https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single&market=${MARKET}`,
      token
    )
    for (const a of albums) {
      if (regularIds.has(a.id)) continue
      if (!OST_PATTERN.test(a.name)) continue
      if (ostSeen.has(a.name)) continue
      ostSeen.add(a.name)
      ost.push({
        name: a.name,
        release: (a.release_date || '').replaceAll('-', '/'),
        cover: a.images?.[0]?.url || '',
        spotify: a.external_urls?.spotify || '',
      })
    }
  }
  ost.sort((a, b) => (a.release < b.release ? 1 : -1))
  writeFileSync(new URL('ostData.json', DATA), JSON.stringify(ost, null, 2) + '\n')
  console.log(`ostData.json: ${ost.length}개 OST`)
}

run().catch(e => {
  console.error(e)
  process.exit(1)
})
