chrome.runtime.onInstalled.addListener((reason) => {
    chrome.tabs.create({
        url: 'options.html'
    });

    chrome.storage.local.set({redmineUrl: "http://lab.entropykorea.com"});
});