// src/App.tsx
import { useState } from 'react';

export default function App() {
  // 어떤 약관 팝업을 띄울지 제어하는 상태 (null, 'terms', 'privacy', 'refund')
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'refund' | null>(null);

  // 팝업 닫기 함수
  const closeModal = () => setActiveModal(null);

  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#111', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. 상단 헤더 및 서비스 소개 */}
      <header style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', letterSpacing: '-1px' }}>GLOT-Link</h1>
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
      </header>

      {/* 1-2. 주요 기능 */}
      <section style={{ padding: '56px 20px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
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
      <section style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', flex: 1 }}>
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
      </section>

      {/* 3. 푸터 (법적 필수 정보 고정 영역) */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '40px 20px', fontSize: '12px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '25px' }}>
            <div>
              <p style={{ margin: '4px 0', color: '#f8fafc', fontSize: '14px', fontWeight: 'bold' }}>GLOT-Link (상호명: 하루우드)</p>
              <p style={{ margin: '6px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '10px', rowGap: '4px', wordBreak: 'keep-all' }}>
                <span style={{ white