# GLOT-Link 홈페이지

> **주의:** 제3자 연락처·내부 ID·API 키·로컬 경로·테스트 계정 등은 **커밋하지 않는다.** 필요하면 사용자에게 먼저 물어볼 것.

## 레포

- Vite + React 랜딩 페이지 — 메인: `src/App.tsx`
- 배포: https://glot-link-site.vercel.app

## 작업 맥락

- Membership에 Pro(₩6,900/월) 요금제 있음
- **다운로드·결제:** `VITE_DOWNLOAD_ENABLED` / `VITE_CHECKOUT_ENABLED`가 `true`일 때만 활성 (기본 비활성 → 곧 출시 UI)
- 결제 준비 후 Vercel 환경변수로 플래그 켜기
- 결제 로직은 별도 Windows 앱 레포에 있음 (이 레포에 넣지 않음)

## 개발

```bash
npm install
npm run dev
npm run build
```
