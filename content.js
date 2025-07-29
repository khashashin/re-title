let titleObserver = null;
let currentCustomTitle = null;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "changeTitle") {
    changePageTitle(message.newTitle);
    sendResponse({ success: true });
  }
});

function changePageTitle(newTitle) {
  currentCustomTitle = newTitle;
  document.title = newTitle;
  setupTitleObserver();
}

function setupTitleObserver() {
  if (titleObserver) {
    titleObserver.disconnect();
  }

  if (!currentCustomTitle) {
    return;
  }

  titleObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === "childList" || mutation.type === "characterData") {
        if (document.title !== currentCustomTitle) {
          document.title = currentCustomTitle;
        }
      }
    });
  });

  const titleElement = document.querySelector("title");
  if (titleElement) {
    titleObserver.observe(titleElement, {
      childList: true,
      characterData: true,
      subtree: true,
    });
  }

  titleObserver.observe(document.head, {
    childList: true,
    subtree: true,
  });
}

function restoreOriginalTitle() {
  currentCustomTitle = null;
  if (titleObserver) {
    titleObserver.disconnect();
    titleObserver = null;
  }
}

window.addEventListener("load", async () => {
  try {
    const response = await chrome.runtime.sendMessage({ action: "getTabId" });
    if (response && response.tabId) {
      const result = await chrome.storage.local.get([
        `title_${response.tabId}`,
      ]);
      const storedTitle = result[`title_${response.tabId}`];

      if (storedTitle) {
        changePageTitle(storedTitle);
      }
    }
  } catch (error) {
    console.log("Title restoration deferred");
  }
});

let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    if (currentCustomTitle) {
      setTimeout(() => {
        document.title = currentCustomTitle;
      }, 100);
    }
  }
}).observe(document, { subtree: true, childList: true });

setInterval(() => {
  if (currentCustomTitle && document.title !== currentCustomTitle) {
    document.title = currentCustomTitle;
  }
}, 1000);
