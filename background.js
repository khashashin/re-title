chrome.runtime.onInstalled.addListener((details) => {
  if (chrome.contextMenus) {
    chrome.contextMenus.create({
      id: "retitle-context-menu",
      title: "Change Tab Title",
      contexts: ["page"],
    });
  }
});

if (chrome.contextMenus) {
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "retitle-context-menu") {
      chrome.action.openPopup();
    }
  });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getTabId") {
    if (sender.tab) {
      sendResponse({ tabId: sender.tab.id });
    } else {
      sendResponse({ error: "No tab information available" });
    }
  }
});

chrome.tabs.onRemoved.addListener(async (tabId) => {
  try {
    await chrome.storage.local.remove([
      `title_${tabId}`,
      `original_title_${tabId}`,
    ]);
  } catch (error) {
    console.error("Storage cleanup error:", error);
  }
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    try {
      const result = await chrome.storage.local.get([`title_${tabId}`]);
      const customTitle = result[`title_${tabId}`];

      if (customTitle) {
        setTimeout(async () => {
          try {
            await chrome.tabs.sendMessage(tabId, {
              action: "changeTitle",
              newTitle: customTitle,
            });
          } catch (error) {
            console.log("Title restoration pending content script load");
          }
        }, 500);
      }
    } catch (error) {
      console.error("Title restoration error:", error);
    }
  }
});

chrome.commands?.onCommand.addListener((command) => {
  if (command === "open-retitle") {
    chrome.action.openPopup();
  }
});
