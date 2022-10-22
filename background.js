// const {
//     Config
//   } = require('./config.js');
const Config = {
    REDMINE_URL: "http://lab.entropykorea.com"
};

chrome.runtime.onInstalled.addListener((reason) => {
    if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
        chrome.tabs.create({
            url: 'popup.html'
        });
    }
});

chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.tabs.executeScript(details.tabId, {
        code: `alert(1);`
    });
}, {
    url: [{
        // Runs on example.com, example.net, but also example.foo.com
        hostContains: "naver.com"
    }],
    
//     chrome.tabs.executeScript(details.tabId, {
//         code: 'document.getElementById("username").value = ' + Config.REDMINE_ID + '; '
//         + 'document.getElementById("password").value = ' + Config.REDMINE_PW + '; '
//         + 'document.getElementById("login-submit").click();'
//     });
// }, {
//     url: [{
//         // Runs on example.com, example.net, but also example.foo.com
//         hostContains: Config.REDMINE_URL + "/login"
//     }],
});

// chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
//     let url = tabs[0].url;
//     // use `url` here inside the callback because it's asynchronous!

// });