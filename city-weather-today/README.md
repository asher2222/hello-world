# 대도시 오늘 날씨 (Netlify용 정적 사이트)

Open‑Meteo 공개 API를 이용해 서울/도쿄/뉴욕 등 주요 도시의 **오늘** 날씨를 보여주는 정적 사이트입니다.
- 현재 기온/체감온도/풍속 (current)
- 일일 최고/최저/강수량 (daily, forecast_days=1)

## 배포 (Drag & Drop)
1) Netlify 로그인 → **Add new site → Deploy manually**
2) 이 폴더(최상위)를 드래그앤드롭 (루트에 `index.html` 존재)
3) `https://…netlify.app` 주소로 확인

## 배포 (GitHub 연동)
- 저장소에 커밋 후 Netlify **Import from Git** → 브랜치 선택 → Deploy

## 참고
- API: https://open-meteo.com/en/docs
- 파라미터: `current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m`
- `daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum`
- `forecast_days=1&timezone=auto` 로 각 도시 **로컬 날짜 기준의 오늘**만 가져옵니다.
- 상용 이용은 Open‑Meteo 정책 확인

라이선스/출처 표기: Open‑Meteo (CC BY 4.0)
