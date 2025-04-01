chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "open_sidepanel") {
    chrome.sidePanel.setOptions({
      enabled: true,
      path: "pages/SidePanel/index.html"
    })
      .then(() => console.log("✅ 사이드패널 열림"))
      .catch((err) => console.error("❌ 사이드패널 열기 실패:", err));
  }
});
