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

export default function Checkout() {
  const [user, setUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
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

  useEffect(() => {
    if (!user) return
    const meta = user.user_metadata as Record<string, unknown> | undefined
    const fromGoogle =
      (typeof meta?.full_name === 'string' && meta.full_name) ||
      (typeof meta?.name === 'string' && meta.name) ||
      ''
    if (fromGoogle.trim() && !customerName.trim()) {
      setCustomerName(fromGoogle.trim())
    }
  }, [user, customerName])

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
      phoneNumber: phone.trim() || undefined,
      customerName: customerName.trim() || undefined,
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
    if (phase === 'billing') return `${payLabel} 결제창 여는 중…`
    if (phase === 'verifying') return 'Pro 활성화 확인 중…'
    if (!user) return 'Google 로그인 후 구매하기'
    if (isEasyPayBilling()) return `카카오페이로 Pro 구독하기 (₩${amount.toLocaleString()})`
    return `Pro 구독하기 (₩${amount.toLocaleString()})`
  })()

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
        <div className="checkout-steps" aria-label="결제 단계">
          <span className="checkout-steps__item checkout-steps__item--done">1. 상품 선택</span>
          <span className="checkout-steps__sep">›</span>
          <span className="checkout-steps__item checkout-steps__item--active">2. 구매 정보</span>
          <span className="checkout-steps__sep">›</span>
          <span className="checkout-steps__item">3. 결제</span>
        </div>

        <h1 className="checkout-title">Pro 구독 결제</h1>
        <p className="checkout-subtitle">
          월 정기구독 · {payLabel} 간편결제 · Windows 앱과 동일 계정(Google)으로 Pro 이용
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
          </section>

          <section className="checkout-card">
            <h2 className="checkout-card__title">구매자 정보</h2>

            {!supabaseReady && (
              <p className="checkout-note checkout-note--warn">
                Supabase 환경변수(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY) 설정이 필요합니다.
              </p>
            )}

            {authLoading ? (
              <p className="checkout-note">로그인 상태 확인 중…</p>
            ) : user ? (
              <div className="checkout-auth checkout-auth--signed-in">
                <p>
                  <strong>{user.email}</strong> 으로 로그인됨
                </p>
                <button type="button" className="checkout-link-btn" onClick={() => void handleSignOut()}>
                  다른 계정으로 로그인
                </button>
              </div>
            ) : (
              <div className="checkout-auth">
                <p className="checkout-note">Pro 결제는 Google 로그인 후 진행됩니다.</p>
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

            <label className="checkout-field">
              <span>구매자 이름</span>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="홍길동"
                autoComplete="name"
              />
            </label>

            <label className="checkout-field">
              <span>휴대폰 번호 (선택)</span>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="010-1234-5678"
                autoComplete="tel"
              />
            </label>

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
                결제 후 7일 이내·서비스 미이용 시 전액 환불 가능. 이용 시작 후 또는 7일 경과 시 환불 불가.
              </p>
            </div>

            {!portOneReady && (
              <p className="checkout-note checkout-note--warn">
                PortOne 키(VITE_PORTONE_STORE_ID, VITE_PORTONE_BILLING_CHANNEL_KEY) 설정 후 결제창이
                열립니다.
              </p>
            )}

            {error && <p className="checkout-alert checkout-alert--error">{error}</p>}
            {success && <p className="checkout-alert checkout-alert--success">{success}</p>}

            <button
              type="button"
              className="checkout-btn checkout-btn--pay"
              onClick={() => void handlePay()}
              disabled={paying || signingIn || Boolean(success)}
            >
              {payButtonText}
            </button>

            <p className="checkout-footer-note">
              결제 수단: {payLabel} · 판매자: 하루우드(GLOT-Link) · 문의: wqe5000@naver.com ·
              0507-1330-4441
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
