// src/App.tsx
// TS6133 에러 방지를 위해 사용하지 않는 React import는 제외했습니다.

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#111', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. 상단 헤더 및 서비스 소개 */}
      <header style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', letterSpacing: '-1px' }}>GLOT-Link</h1>
        <p style={{ fontSize: '1.2rem', color: '#e2e8f0', margin: '0 0 12px 0' }}>초경량 게이밍 챗 헬퍼 — 당신의 게임을 글로벌하게.</p>
        <p style={{ fontSize: '1rem', color: '#94a3b8', margin: '0 0 30px 0', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
          게임은 물론, 해외 커뮤니티·스트리밍·업무 채팅까지. Alt+T 한 번으로 실시간 번역하세요.
        </p>
        <div>
          <a href="#" style={{ background: '#6366f1', color: '#fff', padding: '15px 35px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', display: 'inline-block', transition: 'background 0.2s' }}>
            Windows용 다운로드 (v1.0.0)
          </a>
        </div>
      </header>

      {/* 2. 요금제 안내 (카카오페이 심사 필수 노출 영역) */}
      <section style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', flex: 1 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '12px', fontSize: '2rem', color: '#0f172a' }}>Membership Plan</h2>
        <p style={{ textAlign: 'center', margin: '0 0 40px 0', fontSize: '0.95rem', color: '#64748b' }}>
          게임·채팅·커뮤니티 어디서든, 필요에 맞는 버전을 선택하세요.
        </p>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Free 플랜 */}
          <div style={{ flex: 1, minWidth: '280px', border: '1px solid #94a3b8', padding: '30px', borderRadius: '12px', backgroundColor: '#fff', boxShadow: '0 4px 12px rgba(15, 23, 42, 0.08)' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', color: '#0f172a' }}>
              Free
              <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#64748b', marginLeft: '6px' }}>버전</span>
            </h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 20px 0', color: '#1e293b' }}>
              ₩0 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#475569' }}>/ 월</span>
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: '#1e293b', lineHeight: '1.75', wordBreak: 'keep-all' }}>
              <li style={{ marginBottom: '8px' }}>일일 번역 20회 제한 · 초과 시 경고 표시</li>
              <li>단축키 Alt + 1 고정 (변경 불가)</li>
            </ul>
          </div>

          {/* Pro 플랜 */}
          <div style={{ flex: 1, minWidth: '280px', border: '2px solid #4338ca', padding: '30px', borderRadius: '12px', backgroundColor: '#eef2ff', boxShadow: '0 10px 24px rgba(67, 56, 202, 0.15)' }}>
            <div style={{ display: 'inline-block', background: '#4338ca', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>RECOMMEND</div>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0', color: '#1e1b4b' }}>
              Pro
              <span style={{ fontSize: '0.75rem', fontWeight: 'normal', color: '#6366f1', marginLeft: '6px' }}>버전</span>
            </h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 20px 0', color: '#4338ca' }}>
              ₩6,900 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#475569' }}>/ 월 (정기구독)</span>
            </p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: '#1e1b4b', lineHeight: '1.75', wordBreak: 'keep-all' }}>
              <li style={{ marginBottom: '8px' }}><strong>무제한 번역</strong> · Alt+T 등 단축키 커스텀</li>
              <li><strong>실전 게임 은어 사전</strong> 자동 보정</li>
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
                <span style={{ whiteSpace: 'nowrap' }}>대표자: 이태호</span>
                <span style={{ color: '#475569' }}>|</span>
                <span>주소: 경기도 성남시 중원구 광명로262번길 19, 102호(중앙동, 신우맨션)</span>
              </p>
              <p style={{ margin: '6px 0', display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', columnGap: '10px', rowGap: '4px' }}>
                <span style={{ whiteSpace: 'nowrap' }}>이메일: wqe5000@naver.com</span>
                <span style={{ color: '#475569' }}>|</span>
                <span style={{ whiteSpace: 'nowrap' }}>
                  고객센터: <a href="http://pf.kakao.com/_xjxbZPX" target="_blank" rel="noopener noreferrer" style={{ color: '#38bdf8', textDecoration: 'underline', fontWeight: 'bold' }}>카카오톡 1:1 문의하기</a>
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
            <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>이용약관</a>
            <a href="#" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>개인정보처리방침</a>
            <a href="#" style={{ color: '#cbd5e1', textDecoration: 'none' }}>정기결제 및 환불약관</a>
          </div>

          <p style={{ margin: '0', color: '#64748b' }}>© 2026 GLOT-Link. All rights reserved. 본 사이트는 크롬 브라우저에 최적화되어 있습니다.</p>
        </div>
      </footer>

    </div>
  );
}
