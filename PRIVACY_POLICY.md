# Privacy Policy for Re-Title Chrome Extension

**Last updated: July 30, 2025**

## Overview

Re-Title ("we," "our," or "the extension") is committed to protecting your privacy. This Privacy Policy explains how the Re-Title Chrome extension handles information when you use our service.

## Information We Do NOT Collect

Re-Title is designed with privacy in mind. We do not collect, store, transmit, or share any personal information or browsing data. Specifically:

- **No personal information** (names, emails, addresses, phone numbers)
- **No browsing history** or website content
- **No search queries** or typed text (except custom titles you create)
- **No tracking** across websites or sessions
- **No analytics** or usage statistics
- **No cookies** or web beacons
- **No financial information**
- **No location data**

## Information Stored Locally

The extension stores the following information **locally on your device only**:

### Custom Tab Titles

- Tab titles you create using the extension
- Original tab titles (to enable the reset function)
- Recently used titles for quick access

### Storage Details

- All data is stored using Chrome's local storage API
- Data never leaves your device
- Data is automatically deleted when tabs are closed
- You can clear all data by removing the extension

## How We Use Your Information

Since we don't collect any personal information, there is no personal data to use, share, or process.

The locally stored custom titles are used solely to:

- Display your custom tab titles
- Maintain titles during page navigation and reloads
- Provide a list of recently used titles for convenience
- Allow you to reset titles to their original state

## Data Sharing and Third Parties

We do not share any information with third parties because:

- No data is collected or transmitted from your device
- The extension operates entirely offline
- No external servers or services are contacted
- No third-party analytics or tracking tools are used

## Data Security

Your data security is ensured through:

- **Local-only storage**: All data remains on your device
- **No network transmission**: No data is sent over the internet
- **Chrome's security model**: Data is protected by Chrome's extension security framework
- **Automatic cleanup**: Data is automatically removed when tabs are closed

## Your Rights and Control

You have complete control over your data:

### Access Your Data

- All stored data is accessible through the extension interface
- View your recent titles in the extension popup

### Delete Your Data

- Remove individual custom titles by resetting specific tabs
- Clear all recent titles by using the extension normally (older titles are automatically removed)
- Uninstall the extension to remove all stored data

### Export Your Data

Since data is stored locally and consists only of custom titles you created, you can manually note down any titles you wish to preserve before uninstalling.

## Permissions Explained

The extension requests the following permissions for functionality:

### activeTab

- **Purpose**: Access the current tab to read and modify its title
- **Data accessed**: Only the tab's title and basic tab information
- **Usage**: Only when you explicitly use the extension

### storage

- **Purpose**: Store your custom titles locally on your device
- **Data stored**: Custom tab titles and recently used titles
- **Location**: Local device storage only

### scripting

- **Purpose**: Inject code to change and maintain tab titles
- **Function**: Ensures custom titles persist during page navigation
- **Scope**: Only affects tab titles, no other page content

### contextMenus

- **Purpose**: Add right-click menu option for easy access
- **Function**: Provides "Change Tab Title" context menu item
- **Data access**: None

### Host Permissions

- **Purpose**: Work on any website you visit
- **Limitation**: Only modifies tab titles when explicitly requested
- **Data access**: No access to page content, cookies, or personal information

## Children's Privacy

Re-Title does not collect any information from users of any age. The extension is safe for users under 13 as no personal information is gathered, stored, or transmitted.

## Changes to This Policy

We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last updated" date at the top of this policy. Since the extension doesn't collect personal information, changes will primarily relate to clarifications or new features that maintain our privacy-first approach.

## Contact Information

If you have questions about this Privacy Policy, please contact us at:

**Email**: [Your Email Address]
**GitHub**: [Your GitHub Repository URL]

## Data Protection Rights

Depending on your location, you may have certain rights regarding your personal data. However, since Re-Title doesn't collect personal information, these rights are inherently protected:

- **Right to access**: No personal data is collected
- **Right to rectification**: You control all stored titles
- **Right to erasure**: Uninstall the extension to remove all data
- **Right to portability**: Custom titles can be manually noted if desired
- **Right to object**: No data processing to object to

## Technical Implementation

For transparency, here's how privacy is technically ensured:

### Local Storage Only

```javascript
// Example: Data is stored locally using Chrome's storage API
chrome.storage.local.set({
  [`title_${tabId}`]: customTitle,
});
```

### No Network Requests

The extension contains no code that makes network requests, API calls, or contacts external servers.

### Minimal Permissions

Only essential permissions are requested, and each permission is used solely for its stated purpose.

## Compliance

This extension is designed to comply with:

- **GDPR** (General Data Protection Regulation)
- **CCPA** (California Consumer Privacy Act)
- **COPPA** (Children's Online Privacy Protection Act)
- **Chrome Web Store Privacy Requirements**

Compliance is achieved through our privacy-by-design approach of not collecting personal information.

---

**Summary**: Re-Title is a privacy-focused extension that stores only your custom tab titles locally on your device. We don't collect, transmit, or share any personal information or browsing data.
