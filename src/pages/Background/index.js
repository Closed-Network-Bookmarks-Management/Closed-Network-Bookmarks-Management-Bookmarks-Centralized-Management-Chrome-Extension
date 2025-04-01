chrome.action.onClicked.addListener(async (tab) => {
  const url = tab.url || "";

  // 🚫 차단된 시스템 페이지에서 실행 방지
  if (/^chrome:|^chrome-extension:|^about:|^edge:/.test(url)) {
    console.warn("이 페이지에서는 확장 기능이 동작하지 않습니다:", url);
    return;
  }

  try {
    // 먼저 content script가 실행 중인지 확인
    chrome.tabs.sendMessage(tab.id, { action: "open_sidepanel" }, (res) => {
      if (chrome.runtime.lastError) {
        // content script가 아직 삽입되지 않은 경우 직접 삽입
        chrome.scripting.executeScript(
          {
            target: { tabId: tab.id },
            files: ["contentScript.bundle.js"]
          },
          () => {
            chrome.tabs.sendMessage(tab.id, { action: "open_sidepanel" });
          }
        );
      }
    });
  } catch (err) {
    console.error("확장 메시지 전송 실패:", err);
  }
});
