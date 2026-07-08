import { parseReleaseDate, isNewRelease, buildAlbumList } from './albumUtils'

describe('parseReleaseDate', () => {
  test('슬래시 구분 날짜를 파싱한다', () => {
    const date = parseReleaseDate('2020/05/08')
    expect(date.getFullYear()).toBe(2020)
    expect(date.getMonth()).toBe(4) // 0-indexed
    expect(date.getDate()).toBe(8)
  })

  test('점 구분 날짜도 파싱한다', () => {
    const date = parseReleaseDate('2020.05.08')
    expect(date.getFullYear()).toBe(2020)
  })

  test('값이 없으면 null을 반환한다', () => {
    expect(parseReleaseDate('')).toBeNull()
    expect(parseReleaseDate(undefined)).toBeNull()
  })
})

describe('isNewRelease', () => {
  test('90일 이내 발매는 NEW로 판단한다', () => {
    const recent = new Date()
    recent.setDate(recent.getDate() - 10)
    const release = `${recent.getFullYear()}/${String(recent.getMonth() + 1).padStart(2, '0')}/${String(recent.getDate()).padStart(2, '0')}`
    expect(isNewRelease(release)).toBe(true)
  })

  test('90일 이전 발매는 NEW가 아니다', () => {
    expect(isNewRelease('2020/01/01')).toBe(false)
  })

  test('미래 발매일은 NEW가 아니다', () => {
    const future = new Date()
    future.setFullYear(future.getFullYear() + 1)
    const release = `${future.getFullYear()}/01/01`
    expect(isNewRelease(release)).toBe(false)
  })

  test('발매일이 없으면 false', () => {
    expect(isNewRelease(undefined)).toBe(false)
  })
})

describe('buildAlbumList', () => {
  const credit = {
    선잠: {
      spotifyId: 'sp1',
      albumType: '2nd Single Album',
      tracks: [
        { title: '선잠', lead: true, lyrics: '조원상', compose: '조원상', arrange: '조원상' },
        { title: 'Farther and Farther', lead: false, lyrics: '', compose: '조원상', arrange: '조원상' },
      ],
    },
    Childish: {
      spotifyId: 'sp2',
      albumType: '2nd Full Album',
      tracks: [{ title: '전체관람가', lead: true, lyrics: '', compose: '', arrange: '' }],
    },
  }
  const data = {
    sp1: { cover: 'cover1.jpg', release: '2020/11/12', spotify: 'url1', albumNameEn: 'Snooze', tracklistEn: ['Snooze', 'Farther and Farther'] },
    sp2: { cover: 'cover2.jpg', release: '2026/04/29', spotify: 'url2', albumNameEn: 'Childish', tracklistEn: ['All Ages'] },
  }

  test('발매일 최신순으로 정렬한다', () => {
    const list = buildAlbumList(credit, data)
    expect(list.map(a => a.albumName)).toEqual(['Childish', '선잠'])
  })

  test('한글 모드에서는 원래 앨범명·트랙명을 유지한다', () => {
    const list = buildAlbumList(credit, data, 'ko')
    const album = list.find(a => a.spotifyId === 'sp1')
    expect(album.albumName).toBe('선잠')
    expect(album.tracks[0].title).toBe('선잠')
  })

  test('영어 모드에서는 Spotify 표기로 치환한다', () => {
    const list = buildAlbumList(credit, data, 'en')
    const album = list.find(a => a.spotifyId === 'sp1')
    expect(album.albumName).toBe('Snooze')
    expect(album.tracks[0].title).toBe('Snooze')
  })

  test('spotifyId에 대응하는 데이터가 없으면 빈 값으로 채운다', () => {
    const list = buildAlbumList({ 미배포: { spotifyId: 'missing', tracks: [] } }, data)
    const album = list.find(a => a.albumName === '미배포')
    expect(album.cover).toBe('')
    expect(album.release).toBe('')
  })

  test('트랙의 lead/크레딧 필드를 보존한다', () => {
    const list = buildAlbumList(credit, data)
    const album = list.find(a => a.spotifyId === 'sp1')
    expect(album.tracks[0].lead).toBe(true)
    expect(album.tracks[0].compose).toBe('조원상')
  })
})
