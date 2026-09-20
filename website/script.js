'use strict';
const CONTACT_EMAIL = '4060emojak@naver.com';
document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('inquiry-form');
if (CONTACT_EMAIL) {
  const address = document.getElementById('contact-address');
  const link = document.createElement('a');
  link.href = 'mailto:' + CONTACT_EMAIL;
  link.textContent = CONTACT_EMAIL;
  address.replaceChildren(link);
  document.getElementById('submit').disabled = false;
  document.getElementById('form-note').textContent = '버튼을 누르면 이메일 앱이 열립니다. 내용을 확인한 후 직접 전송해 주세요. 입력한 정보는 이 사이트에 저장되지 않습니다.';
}
form.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!CONTACT_EMAIL || !form.reportValidity()) return;
  const data = new FormData(form);
  const name = String(data.get('name')).trim();
  const organization = String(data.get('organization')).trim();
  const reply = String(data.get('email')).trim();
  const message = String(data.get('message')).trim();
  if (!name || !message) {
    document.getElementById('form-status').textContent = '이름과 요청 내용을 입력해 주세요.';
    return;
  }
  const subject = '[강의 요청] ' + (organization ? organization + ' · ' : '') + name;
  const body = `김학철 전문가님께 강의를 요청드립니다.\n\n이름: ${name}\n소속: ${organization || '미기재'}\n회신 이메일: ${reply}\n\n${message}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  document.getElementById('form-status').textContent = '이메일 앱에서 전송을 완료해 주세요. 앱이 열리지 않으면 위 이메일 주소로 직접 문의해 주세요.';
});

