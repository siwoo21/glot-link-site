/** Public launch gates — enable via Vercel env when payment + download are ready. */

function flag(name: string): boolean {
  return import.meta.env[name] === 'true'
}

export const DOWNLOAD_ENABLED = flag('VITE_DOWNLOAD_ENABLED')
export const CHECKOUT_ENABLED = flag('VITE_CHECKOUT_ENABLED')

export const APP_VERSION_LABEL = 'v0.1.12'

export const COMING_SOON_DOWNLOAD = 'Windows 다운로드 준비 중'
export const COMING_SOON_CHECKOUT = 'Pro 구독 — 결제 연동 준비 중'
export const COMING_SOON_DETAIL =
  '결제·배포 준비가 완료되면 다운로드와 Pro 구독이 순차적으로 열립니다. 문의: wqe5000@naver.com'
