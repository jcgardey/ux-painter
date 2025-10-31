// Called when the user clicks on the extension icon
chrome.action.onClicked.addListener(async (tab) => {
  // Check if tab exists and has an id
  if (tab.id) {
    try {
      await chrome.tabs.sendMessage(tab.id, {
        message: 'clicked_browser_action',
      });
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
});
