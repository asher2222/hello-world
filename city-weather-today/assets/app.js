// Open‑Meteo 기반 대도시 오늘 날씨 보드
const grid = document.getElementById('grid');
const refreshBtn = document.getElementById('refresh');

// 주요 도시 목록 (원하면 자유롭게 추가/수정)
const CITIES = [
  { name: '서울', country: 'KR', lat: 37.5665, lon: 126.9780 },
  { name: '도쿄', country: 'JP', lat: 35.6762, lon: 139.6503 },
  { name: '뉴욕', country: 'US', lat: 40.7128, lon: -74.0060 },
  { name: '런던', country: 'GB', lat: 51.5074, lon: -0.1278 },
  { name: '파리', country: 'FR', lat: 48.8566, lon: 2.3522 },
  { name: '싱가포르', country: 'SG', lat: 1.3521, lon: 103.8198 },
  { name: '시드니', country: 'AU', lat: -33.8688, lon: 151.2093 },
  { name: '상하이', country: 'CN', lat: 31.2304, lon: 121.4737 },
  { name: '로스앤젤레스', country: 'US', lat: 34.0522, lon: -118.2437 }
];

// WMO weather codes → 설명/이모지
const WMO = {
  0: ['맑음','☀️'],
  1: ['대체로 맑음','🌤️'],
  2: ['구름 조금','⛅'],
  3: ['흐림','☁️'],
  45: ['안개','🌫️'], 48: ['서리 안개','🌫️'],
  51: ['이슬비 약','🌦️'], 53: ['이슬비','🌦️'], 55: ['이슬비 강','🌦️'],
  56: ['얼어붙는 이슬비 약','🌧️'], 57: ['얼어붙는 이슬비 강','🌧️'],
  61: ['비 약','🌧️'], 63: ['비','🌧️'], 65: ['비 강','🌧️'],
  66: ['얼어붙는 비 약','🌧️'], 67: ['얼어붙는 비 강','🌧️'],
  71: ['눈 약','🌨️'], 73: ['눈','🌨️'], 75: ['눈 강','🌨️'],
  77: ['싸락눈','🌨️'],
  80: ['소나기 약','🌦️'], 81: ['소나기','🌦️'], 82: ['소나기 강','🌧️'],
  85: ['눈 소나기 약','🌨️'], 86: ['눈 소나기 강','🌨️'],
  95: ['뇌우','⛈️'], 96: ['우박을 동반한 뇌우 약','⛈️'], 99: ['우박을 동반한 뇌우 강','⛈️']
};

function codeToText(code){
  const [txt, emoji] = WMO[code] || ['알 수 없음','❓'];
  return { txt, emoji };
}

function skelCard(){
  const div = document.createElement('div');
  div.className = 'card skel';
  return div;
}

function errCard(city, msg){
  const div = document.createElement('div');
  div.className = 'card err';
  div.innerHTML = `<strong>${city.name}, ${city.country}</strong><div>${msg}</div>`;
  return div;
}

// 도시 카드를 생성
function renderCityCard(city, result){
  const c = result.current;
  const d = result.daily;

  const { txt, emoji } = codeToText(c.weather_code);
  const title = `${city.name}, ${city.country}`;

  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <h2>${title}</h2>
    <div class="row">
      <div class="big" title="현재 기온">${emoji} ${Math.round(c.temperature_2m)}°C</div>
      <span class="badge">체감 ${Math.round(c.apparent_temperature ?? c.temperature_2m)}°C</span>
      <span class="badge">풍속 ${Math.round(c.wind_speed_10m)} km/h</span>
    </div>
    <div class="meta">${new Date(c.time).toLocaleString()} 기준 · ${txt}</div>
    <dl class="kv">
      <dt>최고</dt><dd>${Math.round(d.temperature_2m_max[0])}°C</dd>
      <dt>최저</dt><dd>${Math.round(d.temperature_2m_min[0])}°C</dd>
      <dt>강수량</dt><dd>${(d.precipitation_sum?.[0] ?? 0).toFixed(1)} mm</dd>
    </dl>
  `;
  return card;
}

async function fetchCity(city){
  const url = new URL('https://api.open-meteo.com/v1/forecast');
  url.search = new URLSearchParams({
    latitude: city.lat,
    longitude: city.lon,
    // 오늘 하루치 daily + 현재(current)만 요청
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum',
    current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
    forecast_days: 1,
    timezone: 'auto'
  });
  const res = await fetch(url.toString());
  if(!res.ok) throw new Error('API 오류: ' + res.status);
  return res.json();
}

async function load(){
  grid.classList.add('grid');
  grid.innerHTML = '';
  // 스켈레톤 먼저
  CITIES.forEach(()=> grid.appendChild(skelCard()));

  const cards = [];
  for(const [i, city] of CITIES.entries()){
    try{
      const data = await fetchCity(city);
      const card = renderCityCard(city, data);
      cards[i] = card;
    }catch(e){
      cards[i] = errCard(city, e.message);
    }
    // 순차 업데이트
    grid.replaceChild(cards[i], grid.children[i]);
  }
}

refreshBtn.addEventListener('click', load);
load();