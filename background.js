chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "studySync",
      title: "StudySync: Analyze Content",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "studySync") {
      chrome.tabs.sendMessage(tab.id, {
        action: "analyzeSelection",
        text: info.selectionText
      });
    }
  });