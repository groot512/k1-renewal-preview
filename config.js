/* HTTPS 운영 환경에서 공식 URL과 승인된 고지를 설정해야만 활성화됩니다. 비밀키 금지. */
window.K1_CONFIG = Object.freeze({
 signupEndpoint: '',  // 동일 출처 HTTPS POST URL (예: '/api/k1/launch-alert')
 privacyUrl: '',     // 승인된 개인정보 처리 안내 페이지
 noticeVersion: '',  // 고객 동의 화면 문구의 버전 (서버 보관)
 consentText: '',    // 검토 완료한 동의 문구
 partnerUrl: ''     // 발주자가 확인한 공식 문의 채널 URL 또는 회사 mailto
});