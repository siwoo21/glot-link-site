// src/App.tsx
// TS6133 에러 방지를 위해 사용하지 않는 React import는 제외했습니다.

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#111', backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. 상단 헤더 및 서비스 소개 */}
      <header style={{ padding: '80px 20px', textAlign: 'center', background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', color: '#fff' }}>
        <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', letterSpacing: '-1px' }}>GLOT-Link</h1>
        <p style={{ fontSize: '1.2rem', color: '#cbd5e1', margin: '0 0 30px 0' }}>초경량 게이밍 챗 헬퍼 - 당신의 게임을 글로벌하게.</p>
        <div>
          <a href="#" style={{ background: '#6366f1', color: '#fff', padding: '15px 35px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem', display: 'inline-block', transition: 'background 0.2s' }}>
            Windows용 다운로드 (v1.0.0)
          </a>
        </div>
      </header>

      {/* 2. 요금제 안내 (카카오페이 심사 필수 노출 영역) */}
      <section style={{ padding: '60px 20px', maxWidth: '900px', margin: '0 auto', flex: 1 }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px', fontSize: '2rem' }}>Membership Plan</h2>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
          
          {/* Free 플랜 */}
          <div style={{ flex: 1, minWidth: '280px', border: '1px solid #e2e8f0', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0' }}>Free</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 20px 0', color: '#475569' }}>₩0 <span style={{ fontSize: '1rem', fontWeight: 'normal' }}>/ 월</span></p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: '#475569', lineHeight: '2' }}>
              <li>일일 번역 20회 제한 (초과 시 노란색 경고 표시)</li>
              <li>단축키 'Alt + 1' 고정 (변경 불가능)</li>
              <li>글로벌 캐시 적용 (중복 단어 API 소모 차단)</li>
            </ul>
          </div>

          {/* Pro 플랜 */}
          <div style={{ flex: 1, minWidth: '280px', border: '2px solid #6366f1', padding: '30px', borderRadius: '12px', backgroundColor: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(99, 102, 241, 0.1)' }}>
            <div style={{ display: 'inline-block', background: '#6366f1', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>RECOMMEND</div>
            <h3 style={{ fontSize: '1.5rem', margin: '0 0 10px 0' }}>Pro</h3>
            <p style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: '0 0 20px 0', color: '#6366f1' }}>₩6,900 <span style={{ fontSize: '1rem', fontWeight: 'normal', color: '#475569' }}>/ 월 (정기구독)</span></p>
            <ul style={{ paddingLeft: '20px', fontSize: '0.95rem', color: '#334155', lineHeight: '2' }}>
              <li><strong>무제한 번역</strong> (Alt+T 등 단축키 커스텀 가능)</li>
              <li><strong>실전 게임 은어 사전</strong> 자동 보정</li>
              <li>30일마다 자동 정기 결제 (언제든 해지 가능)</li>
            </ul>
          </div>

        </div>
      </section>

      {/* 3. 푸터 (법적 필수 정보 고정 영역) */}
      <footer style={{ background: '#0f172a', color: '#94a3b8', padding: '40px 20px', fontSize: '12px', borderTop: '1px solid #1e293b' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '25px' }}>
            <div>
              <p style={{ margin: '4px 0', color: '#f8fafc', fontSize: '14px', fontWeight: 'bold' }}>GLOT-Link (상호명: [실제 상호명 또는 본인 이름])</p>
              <p style={{ margin: '4px 0' }}>대표자: [대표자 성명] | 주소: [사업장 주소지]</p>
              <p style={{ margin: '4px 0' }}>이메일: [고객문의용 이메일] | 고객센터: [전화번호 또는 카카오톡 채널 링크]</p>
            </div>
            <div>
              <p style={{ margin: '4px 0', color: '#f8fafc', fontSize: '14px', fontWeight: 'bold' }}>사업자 등록 정보</p>
              <p style={{ margin: '4px 0' }}>사업자등록번호: [000-00-00000]</p>
              <p style={{ margin: '4px 0' }}>통신판매업신고번호: [제 2026-서울강남-0000호] (신고 전이면 '신고 예정')</p>
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