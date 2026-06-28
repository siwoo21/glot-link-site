// src/App.tsx
import React from 'react';

export default function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
      {/* 1. 상단 섹션 */}
      <header style={{ padding: '100px 20px', textAlign: 'center', background: '#f8f9fa' }}>
        <h1>GLOT-Link</h1>
        <p>초경량 게이밍 챗 헬퍼 - 당신의 게임을 글로벌하게.</p>
        <div style={{ marginTop: '30px' }}>
          <a href="여기에_설치파일_링크_넣기" style={{ background: '#000', color: '#fff', padding: '15px 30px', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
            Windows용 다운로드 (v1.0.0)
          </a>
        </div>
      </header>

      {/* 2. 요금제 안내 (카카오페이 심사 필수) */}
      <section style={{ padding: '60px 20px', maxWidth: '800px', margin: '0 auto' }}>
        <h2>Membership Plan</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
          <div style={{ flex: 1, border: '1px solid #ddd', padding: '20px', borderRadius: '10px' }}>
            <h3>Free</h3>
            <p>₩0 / 월</p>
            <ul style={{ fontSize: '14px' }}>
              <li>일일 번역 20회</li>
              <li>단축키 고정 (Alt+1)</li>
            </ul>
          </div>
          <div style={{ flex: 1, border: '2px solid #6366f1', padding: '20px', borderRadius: '10px', backgroundColor: '#f5f7ff' }}>
            <h3>Pro (정기구독)</h3>
            <p>₩6,900 / 월</p>
            <ul style={{ fontSize: '14px' }}>
              <li>무제한 번역</li>
              <li>게임 은어 사전 자동 보정</li>
              <li>단축키 커스텀 가능</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. 푸터 (사업자 정보 - 카카오페이 심사 통과 핵심) */}
      <footer style={{ background: '#111', color: '#ccc', padding: '40px 20px', fontSize: '12px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p><strong>상호명:</strong> [본인 사업자명 또는 이름]</p>
          <p><strong>대표자:</strong> [이름] | <strong>사업자번호:</strong> [000-00-00000]</p>
          <p><strong>통신판매업신고:</strong> [제 2026-서울-0000호] (신고 전이면 '신고 예정' 기재)</p>
          <p><strong>주소:</strong> [사업장 주소]</p>
          <p><strong>이메일:</strong> [이메일주소] | <strong>고객센터:</strong> [전화번호]</p>
          <hr style={{ borderColor: '#333', margin: '20px 0' }} />
          <div style={{ display: 'flex', gap: '15px' }}>
            <a href="#" style={{ color: '#fff' }}>이용약관</a>
            <a href="#" style={{ color: '#fff', fontWeight: 'bold' }}>개인정보처리방침</a>
            <a href="#" style={{ color: '#fff' }}>환불 및 정기결제 해지 안내</a>
          </div>
          <p style={{ marginTop: '20px' }}>© 2026 GLOT-Link. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}