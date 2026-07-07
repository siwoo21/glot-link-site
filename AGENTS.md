# GLOT-Link 홈페이지

> **주의:** 제3자 연락처·내부 ID·API 키·로컬 경로·테스트 계정 등은 **커밋하지 않는다.** 필요하면 사용자에게 먼저 물어볼 것.

## 레포

- Vite + React 랜딩 페이지 — 메인: `src/App.tsx`
- 배포: https://glot-link-site.vercel.app

## 작업 맥락

- Membership에 Pro(₩6,900/월) 요금제 있음
- **없는 것:** 구매하기 버튼, 웹 결제 경로, 실제 다운로드 URL
- PG 심사용 **상품 선택 → 구매하기 → 결제창** 경로 필요
- 결제 로직은 별도 Windows 앱 레포에 있음 (이 레포에 넣지 않음)

## 개발

```bash
npm install
npm run dev
npm run build
```
