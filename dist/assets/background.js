chrome.action.onClicked.addListener(async e=>{if(e.id)try{await chrome.tabs.sendMessage(e.id,{message:"clicked_browser_action"})}catch(r){console.error("Error sending message:",r)}});
//# sourceMappingURL=background.js.map
