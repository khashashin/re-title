let currentTab = null;
let originalTitle = "";

document.addEventListener("DOMContentLoaded", async function () {
  const elements = {
    currentTitle: document.getElementById("currentTitle"),
    newTitleInput: document.getElementById("newTitle"),
    changeTitleBtn: document.getElementById("changeTitle"),
    resetTitleBtn: document.getElementById("resetTitle"),
    status: document.getElementById("status"),
    savedTitles: document.getElementById("savedTitles"),
    savedTitlesList: document.getElementById("savedTitlesList"),
  };

  await initializePopup(elements);
  setupEventListeners(elements);
  loadSavedTitles(elements);
});

async function initializePopup(elements) {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    currentTab = tabs[0];
    originalTitle = currentTab.title;
    elements.currentTitle.textContent = originalTitle;

    const result = await chrome.storage.local.get([`title_${currentTab.id}`]);
    if (result[`title_${currentTab.id}`]) {
      elements.newTitleInput.value = result[`title_${currentTab.id}`];
    }
  } catch (error) {
    showStatus(elements.status, "Unable to access current tab", true);
  }
}

function setupEventListeners(elements) {
  elements.changeTitleBtn.addEventListener("click", () =>
    handleChangeTitle(elements)
  );
  elements.resetTitleBtn.addEventListener("click", () =>
    handleResetTitle(elements)
  );
  elements.newTitleInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleChangeTitle(elements);
    }
  });
  elements.newTitleInput.focus();
}

function showStatus(statusEl, message, isError = false) {
  statusEl.textContent = message;
  statusEl.className = `status ${isError ? "error" : "success"}`;
  statusEl.style.display = "block";
  setTimeout(() => {
    statusEl.style.display = "none";
  }, 3000);
}

async function handleChangeTitle(elements) {
  const newTitle = elements.newTitleInput.value.trim();

  if (!newTitle) {
    showStatus(elements.status, "Please enter a title", true);
    return;
  }

  if (!currentTab) {
    showStatus(elements.status, "No active tab found", true);
    return;
  }

  const originalBtnText = elements.changeTitleBtn.textContent;
  elements.changeTitleBtn.disabled = true;
  elements.changeTitleBtn.innerHTML = 'Applying<span class="loading"></span>';

  try {
    await chrome.tabs.sendMessage(currentTab.id, {
      action: "changeTitle",
      newTitle: newTitle,
    });

    await chrome.storage.local.set({
      [`title_${currentTab.id}`]: newTitle,
      [`original_title_${currentTab.id}`]: originalTitle,
    });

    await saveToRecentTitles(newTitle);
    elements.currentTitle.textContent = newTitle;
    showStatus(elements.status, "Title applied successfully!");
    loadSavedTitles(elements);
  } catch (error) {
    showStatus(elements.status, "Failed to change title", true);
  } finally {
    elements.changeTitleBtn.disabled = false;
    elements.changeTitleBtn.textContent = originalBtnText;
  }
}

async function handleResetTitle(elements) {
  if (!currentTab) {
    showStatus(elements.status, "No active tab found", true);
    return;
  }

  const originalBtnText = elements.resetTitleBtn.textContent;
  elements.resetTitleBtn.disabled = true;
  elements.resetTitleBtn.innerHTML = 'Resetting<span class="loading"></span>';

  try {
    const result = await chrome.storage.local.get([
      `original_title_${currentTab.id}`,
    ]);
    const titleToRestore =
      result[`original_title_${currentTab.id}`] || originalTitle;

    await chrome.tabs.sendMessage(currentTab.id, {
      action: "changeTitle",
      newTitle: titleToRestore,
    });

    await chrome.storage.local.remove([
      `title_${currentTab.id}`,
      `original_title_${currentTab.id}`,
    ]);

    elements.currentTitle.textContent = titleToRestore;
    elements.newTitleInput.value = "";
    showStatus(elements.status, "Title reset successfully");
  } catch (error) {
    showStatus(elements.status, "Failed to reset title", true);
  } finally {
    elements.resetTitleBtn.disabled = false;
    elements.resetTitleBtn.textContent = originalBtnText;
  }
}

async function saveToRecentTitles(title) {
  try {
    const result = await chrome.storage.local.get(["recentTitles"]);
    let recentTitles = result.recentTitles || [];

    recentTitles = recentTitles.filter((t) => t !== title);
    recentTitles.unshift(title);

    if (recentTitles.length > 10) {
      recentTitles = recentTitles.slice(0, 10);
    }

    await chrome.storage.local.set({ recentTitles: recentTitles });
  } catch (error) {
    console.error("Failed to save recent title:", error);
  }
}

async function loadSavedTitles(elements) {
  try {
    const result = await chrome.storage.local.get(["recentTitles"]);
    const recentTitles = result.recentTitles || [];

    if (recentTitles.length > 0) {
      elements.savedTitlesList.innerHTML = "";
      recentTitles.forEach((title) => {
        const titleEl = document.createElement("div");
        titleEl.className = "saved-title";
        titleEl.textContent = title;
        titleEl.title = `Click to use: ${title}`;

        titleEl.addEventListener("click", () => {
          elements.newTitleInput.value = title;
          elements.newTitleInput.focus();
        });

        elements.savedTitlesList.appendChild(titleEl);
      });
      elements.savedTitles.style.display = "block";
    } else {
      elements.savedTitlesList.innerHTML =
        '<div class="no-saved-titles">No recent titles yet</div>';
      elements.savedTitles.style.display = "block";
    }
  } catch (error) {
    console.error("Failed to load saved titles:", error);
  }
}
