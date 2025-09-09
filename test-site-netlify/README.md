# Netlify 테스트 사이트

정적 HTML/CSS/JS 예제로, **Drag & Drop** 또는 **Git 연동**으로 Netlify에 배포할 수 있습니다.

## 구조
```
/
├─ index.html
├─ thanks.html
├─ assets/
│  ├─ style.css
│  ├─ app.js
│  └─ favicon.svg
```

## 빠른 배포 (Drag & Drop)
1. Netlify 로그인 → **Add new site → Deploy manually**
2. 이 폴더(최상단)를 통째로 브라우저에 드래그앤드롭
3. 배포된 `https://…netlify.app` 주소로 접속

## Git 연동 배포
1. GitHub에 새 저장소 생성 후 이 폴더를 커밋/푸시
2. Netlify에서 **Add new site → Import from Git** → GitHub 저장소 선택
3. 브랜치(main) 선택 후 Deploy

## Netlify Forms
- `index.html`의 `<form>`은 `data-netlify="true"` 속성으로 제출값이 수집됩니다.
- 제출 후 `/thanks.html`로 이동하며, **Netlify 대시보드 → Forms**에서 확인할 수 있습니다.
