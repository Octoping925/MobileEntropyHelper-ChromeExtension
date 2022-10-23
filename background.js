// import Config from "./config";

chrome.runtime.onInstalled.addListener((reason) => {
    chrome.tabs.create({
        url: 'options.html'
    });

    chrome.storage.local.set({redmineUrl: "http://lab.entropykorea.com"});
});

chrome.tabs.onUpdated.addListener(async function (tabId, changeInfo, tab) {
    if (changeInfo.status == 'complete') {
        const optionData = await chrome.storage.local.get();
        const url = tab.url;

        chrome.scripting.executeScript({
            target: {tabId: tabId},
            func: loginRedmine,
            args: [optionData.redmineId, optionData.redminePw]
        });

        // if(url.includes(optionData.redmineUrl + "/login") && optionData.redmineAutoLogin == optionData.redmineAutoLogin) {
        //     const {redmineId, redminePw} = optionData;

        //     chrome.scripting.executeScript({
        //         target: {tabId: tabId},
        //         func: () => {
        //             document.getElementById("username").value = redmineId;
        //             document.getElementById("password").value = redminePw;
        //             document.getElementById("login-submit").click();
        //         }
        //     });
        // }
    }
});

/**
 * 레드마인 로그인
 * @param {string} id 레드마인 아이디
 * @param {string} password 레드마인 비밀번호
 */
 const loginRedmine = (id, password) => {
    try {
        alert(1);
        document.getElementById("username").value = id;
        document.getElementById("password").value = password;
        document.getElementById("login-submit").click();
    }
    catch (e) {
        alert("로그인 실패: " + e);
    }
}