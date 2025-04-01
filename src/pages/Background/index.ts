// src/pages/Background/index.ts

// MV3 기준으로 반드시 있어야 함
chrome.runtime.onInstalled.addListener(() => {
  console.log('[background] 확장 프로그램 설치됨');
  // 초기 설정 가능: storage 초기화, welcome message 등
});

// 향후 사용될 메시지 핸들러 (optional)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'GET_VERSION') {
    sendResponse({ version: chrome.runtime.getManifest().version });
  }

  // 메시지를 비동기로 처리하고 싶다면:
  // return true;
});

// 추후 사용 가능 예시: 알림
// chrome.notifications.create({ ... });

// 향후 자동 동기화 용도 (주기적 fetch 등)
// chrome.alarms.create('syncUrls', { periodInMinutes: 30 });
// chrome.alarms.onAlarm.addListener((alarm) => {
//   if (alarm.name === 'syncUrls') {
//     fetchAndUpdateUrls(); // 구현 필요
//   }
// });

