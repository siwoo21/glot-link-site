// src/App.tsx
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

export default function App() {
  // 어떤 약관 팝업을 띄울지 제어하는 상태 (null, 'terms', 'privacy', 'refund')
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'refund' | null>(null);

  const closeModal = () => setActiveModal(null);

  const openModal = (type: 'terms' | 'privacy' | 'refund') => (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveModal(type);
  };

  useEffect(() => {
    if (!activeModal) return;

    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.overflow = 'hidden';

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [activeModal]);

  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#111', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. 상단 헤더 및 서비스 소개 */}
      <header className="hero-header" style={{ padding: '52px 20px 88px', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff' }}>
        <nav className="hero-nav" aria-label="페이지 안내">
          <a href="#features">기능</a>
          <span className="hero-nav__sep" aria-hidden="true">|</span>
          <a href="#membership">Membership</a>
        </nav>
        <div className="hero-wave-wrap" aria-hidden="true">
          <svg className="hero-wave" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <defs>
              <linearGradient id="heroWaveGradient" gradientUnits="userSpaceOnUse" x1="0" y1="600" x2="1000" y2="0">
                <stop offset="0%" stopColor="rgba(56, 189, 248, 0)" />
                <stop offset="32%" stopColor="rgba(56, 189, 248, 0.22)" />
                <stop offset="50%" stopColor="rgba(167, 139, 250, 0.55)" />
                <stop offset="68%" stopColor="rgba(56, 189, 248, 0.25)" />
                <stop offset="100%" stopColor="rgba(56, 189, 248, 0)" />
              </linearGradient>
            </defs>
            <path
              d="M -120 620 C 120 520, 280 460, 420 380 S 760 160, 1080 -40"
              fill="none"
              stroke="url(#heroWaveGradient)"
              strokeWidth="72"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="hero-header__content">
        <h1 className="hero-brand" aria-label="GLOT-Link">
          <img src="/glot-mascot.svg" alt="" className="hero-mascot" draggable={false} />
          <span className="hero-brand__name">GLOT-Link</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#e2e8f0', margin: '0 0 12px 0' }}>초경량 게이밍 챗 헬퍼 — 당신의 게임을 글로벌하게.</p>
        <p style={{ fontSize: '1rem', color: '#94a3b8', margin: '0 0 30px 0', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
          게임은 물론, 해외 커뮤니티·스트리밍·업무 채팅까지. Alt+1 한 번으로 실시간 번역하세요.
        </p>
        <div>
          <a href="#" style={{ background: '#6366f1', color: '#fff', padding: '15px 35px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', display: 'inline-block', transition: 'background 0.2s' }}>
            Windows용 다운로드 (v1.0.0)
          </a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px', marginTop: '36px' }}>
          {['Alt+1 단축키 번역', '게임·채팅 오버레이', '가볍게 실행'].map((tag) => (
            <span key={tag} style={{ padding: '6px 14px', borderRadius: '999px', fontSize: '0.85rem', color: '#cbd5e1', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
              {tag}
            </span>
          ))}
        </div>
        </div>
      </header>

      {/* 1-2. 주요 기능 */}
      <section id="features" style={{ padding: '56px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', margin: '0 0 12px 0', fontSize: '1.75rem', color: '#0f172a' }}>GLOT-Link가 하는 일</h2>
          <p style={{ textAlign: 'center', margin: '0 0 36px 0', color: '#64748b', fontSize: '0.95rem' }}>
            설치 후 Alt+1 한 번이면, 화면 위 텍스트를 바로 번역합니다. (Pro 버전은 단축키 변경 가능)
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            {[
              { title: '키 한 번 번역', desc: 'Alt+1로 채팅·자막·메시지를 즉시 번역. 게임 중에도 흐름을 끊지 않습니다.' },
              { title: '화면 위 오버레이', desc: '별도 창 없이 게임·브라우저·디스코드 위에 결과가 바로 표시됩니다.' },
              { title: '어디서든 활용', desc: '게임, 스트리밍, 해외 커뮤니티, 업무 채팅까지 폭넓게 사용할 수 있습니다.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '24px', borderRadius: '12px', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)' }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: 'bold', color: '#0f172a', fontSize: '1.05rem' }}>{item.title}</p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#475569', lineHeight: '1.65', wordBreak: 'keep-all' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. 요금제 안내 (카카오페이 심사 필수 노출 영역) */}
      <section id="membership" className="membership-section">
        <div className="membership-section__inner">
        <h2 style={{ textAlign: 'center', marginBottom: '12px', fontSize: '2rem', color: '#0f172a' }}>Membership Plan</h2>
        <p style={{ textAlign: 'center', margin: '0 0 40px 0', fontSize: '0.95rem', color: '#64748b' }}>
          게임·채팅·커뮤니티 어디서든, 필요에 맞는 버전을 선택하세요.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
          
          {/* Free 플랜 */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '300px', border: '2px solid #94a3b8', padding: '28px 30px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)' }}>
            <div style={{ minHeight: '28px', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', color: '#64748b', border: '1px solid #cbd5e1', background: '#f8fafc' }}>BASIC</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', color: '#0f172a' }}>
              Free
              <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#64748b', marginLeft: '6px' }}>버전</span>
            </h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 20px 0', color: '#1e293b', minHeight: '2.4rem' }}>
              ₩0 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#475569' }}>/ 월</span>
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, flex: 1, fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.75', wordBreak: 'keep-all' }}>
              <li style={{ marginBottom: '8px' }}>일일 번역 20회 제한 · 초과 시 경고 표시</li>
              <li style={{ marginBottom: '8px' }}>단축키 Alt + 1 고정 (변경 불가)</li>
              <li style={{ marginBottom: 0 }}>스마트 캐시 포함</li>
            </ul>
          </div>

          {/* Pro 플랜 */}
          <div style={{ display: 'flex', flexDirection: 'column', minHeight: '300px', border: '2px solid #4338ca', padding: '28px 30px', borderRadius: '12px', backgroundColor: '#eef2ff', boxShadow: '0 10px 24px rgba(67, 56, 202, 0.15)' }}>
            <div style={{ minHeight: '28px', marginBottom: '12px', display: 'flex', alignItems: 'center' }}>
              <span style={{ display: 'inline-block', background: '#4338ca', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' }}>RECOMMEND</span>
            </div>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', color: '#1e1b4b' }}>
              Pro
              <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#6366f1', marginLeft: '6px' }}>버전</span>
            </h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 20px 0', color: '#4338ca', minHeight: '2.4rem' }}>
              ₩6,900 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#475569' }}>/ 월 (정기구독)</span>
            </p>
            <ul style={{ paddingLeft: '20px', margin: 0, flex: 1, fontSize: '0.95rem', color: '#1e1b4b', lineHeight: '1.75', wordBreak: 'keep-all' }}>
              <li style={{ marginBottom: '8px' }}><strong>무제한 번역</strong> · 단축키 변경 가능</li>
              <li style={{ marginBottom: '8px' }}><strong>실전 게임 은어 사전</strong> 자동 보정</li>
              <li style={{ marginBottom: 0 }}>신규 은어 · 기능 우선 업데이트</li>
            </ul>
          </div>

        </div>

        {/* 공통 기능 설명 */}
        <div style={{ marginTop: '36px', padding: '24px 28px', borderRadius: '12px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '0.85rem', fontWeight: 'bold', color: '#4338ca', letterSpacing: '0.02em' }}>모든 버전 공통</p>
          <p style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 'bold', color: '#0f172a' }}>스마트 캐시로 더 빠른 번역</p>
          <p style={{ margin: 0, fontSize: '0.95rem', color: '#475569', lineHeight: '1.7', wordBreak: 'keep-all' }}>
            한 번 번역한 문장은 저장됩니다. 같은 내용이 다시 나와도 즉시 표시되어, Free·Pro 모두 더 빠르고 안정적으로 이용할 수 있습니다.
          </p>
        </div>
        </div>
      </section>
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '40px 20px', fontSize: '12px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '25px' }}>
            <div>
              <p style={{ margin: '4px 0', color: '#f8fafc', fontSize: '14px', fontWeight: 'bold' }}>GLOT-Link (상호명: 하루우드)</p>
              <p style={{ margin: '6px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '10px', rowGap: '4px', wordBreak: 'keep-all' }}>
                <span style={{ whiteSpace: 'nowrap' }}>대표자: 이태호</span>
                <span style={{ color: '#475569' }}>|</span>
                <span>주소: 경기도 성남시 중원구 광명로262번길 19, 102호(중앙동, 신우맨션)</span>
              </p>
              <p style={{ margin: '6px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '10px', rowGap: '4px' }}>
                <span style={{ whiteSpace: 'nowrap' }}>이메일: wqe5000@naver.com</span>
              </p>
              <p style={{ margin: '6px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '10px', rowGap: '4px' }}>
                <span style={{ whiteSpace: 'nowrap' }}>
                  고객센터: <a href="tel:0507-1330-4441" style={{ color: '#e2e8f0', textDecoration: 'none', fontWeight: 'bold' }}>0507-1330-4441</a>
                </span>
                <span style={{ color: '#475569' }}>|</span>
                <span style={{ whiteSpace: 'nowrap' }}>
                  <a href="http://pf.kakao.com/_xjxbZPX" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline', fontWeight: 'bold' }}>카카오톡 1:1 문의하기</a>
                </span>
              </p>
            </div>
            <div>
              <p style={{ margin: '4px 0', color: '#f8fafc', fontSize: '14px', fontWeight: 'bold' }}>사업자 등록 정보</p>
              <p style={{ margin: '4px 0' }}>사업자등록번호: 545-18-02753</p>
              <p style={{ margin: '4px 0' }}>통신판매업신고번호: 제 2026-성남중원-0328 호</p>
            </div>
          </div>

          <hr style={{ borderColor: '#1e293b', margin: '20px 0' }} />

          {/* 법적 필수 약관 링크 */}
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
            <button
              type="button"
              onClick={openModal('terms')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#cbd5e1', textDecoration: 'none', fontSize: '12px' }}
            >
              이용약관
            </button>
            <button
              type="button"
              onClick={openModal('privacy')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}
            >
              개인정보처리방침
            </button>
            <button
              type="button"
              onClick={openModal('refund')}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: '#cbd5e1', textDecoration: 'none', fontSize: '12px' }}
            >
              정기결제 및 환불약관
            </button>
          </div>

          <p style={{ margin: '0', color: '#64748b' }}>© 2026 GLOT-Link. All rights reserved. 본 사이트는 크롬 브라우저에 최적화되어 있습니다.</p>
        </div>
      </footer>

      {/* 약관 모달 — body에 포털 렌더링 (스크롤·레이어 문제 방지) */}
      {activeModal && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            background: 'rgba(15, 23, 42, 0.72)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '640px',
              maxHeight: '85vh',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '16px',
              background: 'rgba(255, 255, 255, 0.98)',
              boxShadow: '0 24px 48px rgba(15, 23, 42, 0.35)',
              border: '1px solid rgba(226, 232, 240, 0.9)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '1px solid #e2e8f0' }}>
              <h2 id="modal-title" style={{ margin: 0, fontSize: '1.15rem', color: '#0f172a' }}>
                {activeModal === 'terms' && '이용약관'}
                {activeModal === 'privacy' && '개인정보처리방침'}
                {activeModal === 'refund' && '정기결제 및 환불약관'}
              </h2>
              <button
                type="button"
                onClick={closeModal}
                aria-label="닫기"
                style={{
                  background: '#f1f5f9',
                  border: 'none',
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: '#475569',
                  fontSize: '1.1rem',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px 24px 28px', overflowY: 'auto', color: '#334155', fontSize: '0.9rem', lineHeight: '1.75', wordBreak: 'keep-all' }}>
              {activeModal === 'terms' && (
                <>
                  <p style={{ margin: '0 0 16px 0' }}><strong>제1조 (목적)</strong><br />본 약관은 하루우드(이하 &quot;회사&quot;)가 제공하는 GLOT-Link 서비스(이하 &quot;서비스&quot;)의 이용 조건 및 절차, 회사와 이용자의 권리·의무를 규정함을 목적으로 합니다.</p>
                  <p style={{ margin: '0 0 16px 0' }}><strong>제2조 (회사 정보)</strong><br />상호: 하루우드<br />대표자: 이태호<br />서비스명: GLOT-Link<br />고객센터: 0507-1330-4441 / wqe5000@naver.com</p>
                  <p style={{ margin: '0 0 16px 0' }}><strong>제3조 (서비스 내용)</strong><br />GLOT-Link는 Windows 환경에서 단축키(기본 Alt+1)를 통해 화면 텍스트를 실시간 번역하는 소프트웨어입니다. Free 버전과 Pro 버전을 제공하며, Pro 버전은 월 ₩6,900의 정기구독 요금이 적용됩니다.</p>
                  <p style={{ margin: '0 0 16px 0' }}><strong>제4조 (이용자의 의무)</strong><br />이용자는 서비스를 불법적인 목적으로 사용하거나, 타인의 권리를 침해하는 행위, 서비스의 정상적인 운영을 방해하는 행위를 해서는 안 됩니다.</p>
                  <p style={{ margin: 0 }}><strong>제5조 (면책)</strong><br />회사는 천재지변, 시스템 장애, 번역 API 제공사의 사정 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다. 번역 결과는 참고용이며, 이용자는 최종 확인 책임을 집니다.</p>
                </>
              )}
              {activeModal === 'privacy' && (
                <>
                  <p style={{ margin: '0 0 16px 0' }}><strong>1. 개인정보 처리자</strong><br />하루우드 (대표: 이태호) / GLOT-Link</p>
                  <p style={{ margin: '0 0 16px 0' }}><strong>2. 수집 항목 및 목적</strong><br />회사는 서비스 제공, 결제·구독 관리, 고객 문의 응대를 위해 필요한 최소한의 정보(이메일, 결제 관련 정보, 문의 내용 등)를 수집·이용할 수 있습니다.</p>
                  <p style={{ margin: '0 0 16px 0' }}><strong>3. 보유 기간</strong><br />관련 법령에 따른 보존 기간 또는 이용 목적 달성 시까지 보유하며, 목적 달성 후 지체 없이 파기합니다.</p>
                  <p style={{ margin: '0 0 16px 0' }}><strong>4. 제3자 제공</strong><br />법령에 근거한 경우를 제외하고, 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 결제 처리 시 결제대행사(PG)에 필요한 정보가 전달될 수 있습니다.</p>
                  <p style={{ margin: 0 }}><strong>5. 문의</strong><br />개인정보 관련 문의: wqe5000@naver.com / 0507-1330-4441</p>
                </>
              )}
              {activeModal === 'refund' && (
                <>
                  <p style={{ margin: '0 0 16px 0' }}><strong>제 1 조 (청약철회 및 환불 규정)</strong></p>
                  <p style={{ margin: '0 0 12px 0' }}>1. 본 서비스는 전자상거래법 및 콘텐츠산업진흥법에 따른 &apos;디지털 콘텐츠&apos; 상품으로, 사용자의 구매 즉시 효력이 개시됩니다.</p>
                  <p style={{ margin: '0 0 12px 0' }}>2. 결제 후 7일 이내에 번역 기능을 단 1회도 사용하지 않은 경우에 한하여 100% 전액 환불이 가능합니다.</p>
                  <p style={{ margin: '0 0 12px 0' }}>3. 단 1회라도 번역 기능을 이용했거나, 결제일로부터 7일이 경과한 경우에는 중도 해지 시 일할 계산 환불 및 잔여 기간에 대한 환불이 불가능합니다.</p>
                  <p style={{ margin: 0 }}>4. 중도 해지 시 다음 결제일부터 추가 결제가 진행되지 않는 &apos;구독 해지 예약&apos; 상태로 전환되며, 이미 결제된 이용 기간(30일) 동안은 Pro 권한이 정상 유지됩니다.</p>
                </>
              )}
            </div>
          </div>
        </div>,
        document.body,
      )}

    </div>
  );
}