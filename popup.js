const REDMINE_URL = "http://lab.entropykorea.com";

document.getElementById("openRedmineIssue").addEventListener("click", (e) => {
    const redmineIssueIdx = parseInt(prompt("레드마인 번호를 입력해주세요"));
    
    if(redmineIssueIdx === 0 || Number.isNaN(redmineIssueIdx)) {
        alert("레드마인 번호를 제대로 입력해주세요");
        return;
    }

    chrome.tabs.create({
        url: getRedmineIssueUrl(redmineIssueIdx)
    });
});

/**
 * 특정 레드마인 이슈의 URL 반환
 * @param {number} issueIdx 레드마인 이슈 번호
 * @returns {string} 레드마인 이슈 URL
 */
const getRedmineIssueUrl = (issueIdx) => {
    return `${REDMINE_URL}/issues/${issueIdx}`;
};