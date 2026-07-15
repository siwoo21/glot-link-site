import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import { signInWithGoogle } from '../lib/googleAuth'
import {
  getBillingMethodLabel,
  isEasyPayBilling,
  isPortOneConfigured,
  subscribeWithPortOne,
  type SubscribePaymentPhase,
} from '../lib/portonePayment'
import {
  getPlanPaymentAmountKrw,
  PORTONE_SUBSCRIPTION_ORDER_NAME,
} from '../lib/payment'
import { getSupabase, isSupabaseConfigured } from '../lib/supabase'
import { CHECKOUT_ENABLED, COMING_SOON_CHECKOUT, COMING_SOON_DETAIL } from '../lib/siteConfig'

export default function Checkout() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreeRefund, setAgreeRefund] = useState(false)
  const [phase, setPhase] = useState<SubscribePaymentPhase | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [signingIn, setSigningIn] = useState(false)

  const portOneReady = isPortOneConfigured()
  const supabaseReady = isSupabaseConfigured()
  const amount = getPlanPaymentAmountKrw('pro')
  const payLabel = getBillingMethodLabel()
  const buyerReady = Boolean(user?.email)
  const readyToPay = buyerReady && agreeTerms && agreeRefund && portOneReady
  const showDevWarnings = import.meta.env.DEV

  useEffect(() => {
    const supabase = getSupabase()
    if (!supabase) {
      setAuthLoading(false)
      return
    }

    void supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setAuthLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleGoogleSignIn = async () => {
    setSigningIn(true)
    setError(null)
    const result = await signInWithGoogle()
    if (!result.ok && result.message !== 'Google 로그인 페이지로 이동 중…') {
      setError(result.message)
      setSigningIn(false)
    }
  }

  const handleSignOut = async () => {
    const supabase = getSupabase()
    if (supabase) await supabase.auth.signOut()
    setUser(null)
  }

  const handlePay = async () => {
    setError(null)
    setSuccess(null)

    if (!user?.email) {
      setError('Google 로그인 후 결제를 진행해 주세요.')
      return
    }

    if (!agreeTerms || !agreeRefund) {
      setError('이용약관 및 정기결제·환불 안내에 동의해 주세요.')
      return
    }

    if (!portOneReady) {
      setError('결제 설정(PortOne)이 아직 연결되지 않았습니다. 관리자에게 문의해 주세요.')
      return
    }

    const result = await subscribeWithPortOne(user.id, user.email, 'pro', {
      onPhase: setPhase,
    })

    if (result.ok) {
      setSuccess(result.message)
      return
    }

    if (!result.cancelled) {
      setError(result.message)
    }
  }

  const paying = phase !== null
  const payButtonText = (() => {
    if (phase === 'billing') return '카카오페이 결제창 여는 중…'
    if (phase === 'verifying') return 'Pro 활성화 확인 중…'
    if (!user) return 'Google 로그인 후 구매하기'
    if (isEasyPayBilling()) return `카카오페이로 결제하기 (₩${amount.toLocaleString()})`
    return `${payLabel}로 결제하기 (₩${amount.toLocaleString()})`
  })()

  const stepClass = (step: number) => {
    const done =
      (step === 1 || step === 2 || step === 3) ||
      (step === 4 && buyerReady) ||
      (step === 5 && success)
    const active =
      (step === 4 && !buyerReady) ||
      (step === 4 && buyerReady && !readyToPay && !paying) ||
      (step === 5 && (readyToPay || paying) && !success)
    if (active) return 'checkout-steps__item checkout-steps__item--active'
    if (done) return 'checkout-steps__item checkout-steps__item--done'
    return 'checkout-steps__item'
  }

  if (!CHECKOUT_ENABLED) {
    return (
      <div className="checkout-page">
        <header className="checkout-header">
          <Link to="/" className="checkout-header__brand">
            <img src="/glot-mascot.svg" alt="" className="checkout-header__logo" draggable={false} />
            <span>GLOT-Link</span>
          </Link>
          <Link to="/" className="checkout-header__back">
            ← 홈으로
          </Link>
        </header>
        <main className="checkout-main">
          <div className="checkout-card" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto' }}>
            <h1 className="checkout-title">{COMING_SOON_CHECKOUT}</h1>
            <p style={{ color: '#64748b', lineHeight: 1.7, margin: '0 0 20px 0' }}>{COMING_SOON_DETAIL}</p>
            <Link
              to="/"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                borderRadius: '8px',
                background: '#4338ca',
                color: '#fff',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              홈으로 돌아가기
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <header className="checkout-header">
        <Link to="/" className="checkout-header__brand">
          <img src="/glot-mascot.svg" alt="" className="checkout-header__logo" draggable={false} />
          <span>GLOT-Link</span>
        </Link>
        <Link to="/#membership" className="checkout-header__back">
          ← 요금제로 돌아가기
        </Link>
      </header>

      <main className="checkout-main">
        <div className="checkout-steps checkout-steps--kakao" aria-label="결제 단계">
          <span className={stepClass(1)}>1. 상품 선택</span>
          <span className="checkout-steps__sep">›</span>
          <span className={stepClass(2)}>2. 구매하기</span>
          <span className="checkout-steps__sep">›</span>
          <span className={stepClass(3)}>3. 결제 페이지</span>
          <span className="checkout-steps__sep">›</span>
          <span className={stepClass(4)}>4. 구매자 정보</span>
          <span className="checkout-steps__sep">›</span>
          <span className={stepClass(5)}>5. 간편결제</span>
        </div>

        <h1 className="checkout-title">Pro 구독 결제</h1>
        <p className="checkout-subtitle">
          월 ₩{amount.toLocaleString()} 정기구독 · 카카오페이 간편결제 · Google 계정으로 로그인 후 결제
        </p>

        <div className="checkout-grid">
          <section className="checkout-card">
            <h2 className="checkout-card__title">주문 상품</h2>
            <div className="checkout-product">
              <div>
                <p className="checkout-product__name">{PORTONE_SUBSCRIPTION_ORDER_NAME}</p>
                <p className="checkout-product__desc">GLOT-Link Pro · 월 정기구독</p>
              </div>
              <p className="checkout-product__price">₩{amount.toLocaleString()}</p>
            </div>
            <ul className="checkout-product__features">
              <li>무제한 번역 · 단축키 변경</li>
              <li>실전 게임 은어 사전 자동 보정</li>
              <li>신규 은어 · 기능 우선 업데이트</li>
            </ul>
            <div className="checkout-seller">
              <p className="checkout-seller__title">판매자 정보</p>
              <p>상호: 하루우드 (GLOT-Link) · 대표: 이태호</p>
              <p>0507-1330-4441 · wqe5000@naver.com</p>
            </div>
          </section>

          <div className="checkout-stack">
            <section className="checkout-card">
              <h2 className="checkout-card__title">4. 구매자 정보</h2>

              {showDevWarnings && !supabaseReady && (
                <p className="checkout-note checkout-note--warn">
                  Supabase 환경변수(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) 설정이 필요합니다.
                </p>
              )}

              {authLoading ? (
                <p className="checkout-note">로그인 상태 확인 중…</p>
              ) : user ? (
                <div className="checkout-auth checkout-auth--signed-in">
                  <p>
                    구매자 이메일: <strong>{user.email}</strong>
                  </p>
                  <button type="button" className="checkout-link-btn" onClick={() => void handleSignOut()}>
                    다른 Google 계정으로 로그인
                  </button>
                </div>
              ) : (
                <div className="checkout-auth">
                  <p className="checkout-note">
                    회원(Google) 로그인 후 결제합니다. 심사·테스트용 Google 계정으로 로그인해 주세요.
                  </p>
                  <button
                    type="button"
                    className="checkout-btn checkout-btn--google"
                    onClick={() => void handleGoogleSignIn()}
                    disabled={signingIn || !supabaseReady}
                  >
                    Google 로그인
                  </button>
                </div>
              )}

              <div className="checkout-agreements">
                <label className="checkout-check">
                  <input
                    type="checkbox"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span>이용약관에 동의합니다. (필수)</span>
                </label>
                <label className="checkout-check">
                  <input
                    type="checkbox"
                    checked={agreeRefund}
                    onChange={(e) => setAgreeRefund(e.target.checked)}
                  />
                  <span>정기결제 및 환불 규정에 동의합니다. (필수)</span>
                </label>
                <p className="checkout-agreements__hint">
                  결제 후 7일 이내·서비스 미이용 시 전액 환불. 이용 시작 후 또는 7일 경과 시 환불 불가.
                  해지 시 다음 결제부터 중단, Pro는 현재 기간 종료까지 이용 가능.
                </p>
              </div>
            </section>

            <section className="checkout-card">
              <h2 className="checkout-card__title">5. 결제 수단 선택</h2>
              <label className="checkout-pay-method">
                <input type="radio" name="pay-method" checked readOnly />
                <span className="checkout-pay-method__badge">카카오페이</span>
                <span className="checkout-pay-method__desc">간편결제 정기구독 (월 ₩{amount.toLocaleString()})</span>
              </label>
              <p className="checkout-note">
                아래 버튼을 누르면 카카오페이 결제창(PortOne)이 열립니다.
              </p>

              {showDevWarnings && !portOneReady && (
                <p className="checkout-note checkout-note--warn">
                  PortOne 키(VITE_PORTONE_STORE_ID, VITE_PORTONE_BILLING_CHANNEL_KEY) 설정 후 결제창이
                  열립니다.
                </p>
              )}

              {error && <p className="checkout-alert checkout-alert--error">{error}</p>}
              {success && <p className="checkout-alert checkout-alert--success">{success}</p>}

              <button
                type="button"
                className="checkout-btn checkout-btn--pay checkout-btn--kakao"
                onClick={() => void handlePay()}
                disabled={paying || signingIn || Boolean(success) || !readyToPay}
              >
                {payButtonText}
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}
