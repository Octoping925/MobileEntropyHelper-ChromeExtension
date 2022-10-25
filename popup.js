document.getElementById("openRedmineIssue").addEventListener("click", async () => {
    const redmineIssueIdx = parseInt(prompt("레드마인 번호를 입력해주세요"));
    
    if(redmineIssueIdx <= 0 || Number.isNaN(redmineIssueIdx)) {
        alert("레드마인 번호를 제대로 입력해주세요");
        return;
    }

    chrome.tabs.create({
        url: await getRedmineIssueUrl(redmineIssueIdx)
    });
});

document.getElementById("openDynamicSQLParser").addEventListener("click", () => {
    chrome.tabs.create({
        url: "dynamicSQLParser.html"
    });
});

document.getElementById("writeRedmineIssueByEmail").addEventListener("click", async () => {
    const tabData = await getTabData();
    const url = tabData.url;
    const mailSN = parseMailSNFromURL(url);

    if(mailSN === null) {
        alert("이메일 주소가 올바르지 않습니다");
        console.error(url);
    }
    
    const {mailTitle, mailBody} = await getDetailFromEmail(mailSN);
    alert(mailTitle);
    alert(mailBody);

    await writeRedmineIssue(mailTitle, mailBody);
});

/**
 * 옵션에서 입력한 레드마인 URL 얻어오기
 * @returns {string}
 */
const getRedmineUrl = async () => {
    const redmineUrlObj = await chrome.storage.local.get('redmineUrl');
    return redmineUrlObj.redmineUrl;
}

/**
 * 특정 레드마인 이슈의 URL 반환
 * @param {number} issueIdx 레드마인 이슈 번호
 * @returns {string} 레드마인 이슈 URL
 */
 const getRedmineIssueUrl = async (issueIdx) => {
    const redmineUrl = await getRedmineUrl();
    return `${redmineUrl}/issues/${issueIdx}`;
};

/**
 * 현재 탭의 정보 구하는 함수
 * @returns {string}
 */
const getTabData = async () => {
    const tabs = await chrome.tabs.query({active: true, currentWindow: true});
    const tabData = tabs[0];
    return tabData;
};

/**
 * 네이버 웍스 이메일 상세 URL에서 mailSN 구하기
 * @param {string} url 
 * @returns {number|null} mailSN 반환. URL이 올바르지 않을 경우 null 반환
 */
const parseMailSNFromURL = (url) => {
    const mailSNRegexParsedResult = url.match(new RegExp(/mailSN=\d+/)); // expected output: 'mailSN=1234'

    if(mailSNRegexParsedResult !== null) {
        const mailSN = parseInt(mailSNRegexParsedResult[0].split('=')[1]);
        return mailSN;
    }
    
    return null;
};

/**
 * 활성화 된 이메일 창에서 제목과 내용 얻기
 * @param {number} mailSN 
 * @returns {object} 이메일 제목과 내용
 */
const getDetailFromEmail = async (mailSN) => {
    const tabData = await getTabData();
    const mailData = await chrome.scripting.executeScript({
        target: {tabId: tabData.id},
        func: (mailSN) => {
            const mailTitle = document.getElementById(`TRANSLATE_SUBJECT_TARGET_${mailSN}`).innerText;
            const mailBody = document.getElementById(`TRANSLATE_BODY_TARGET_${mailSN}`).innerText;
            return {mailTitle, mailBody};
        },
        args: [mailSN]
    });
    
    return mailData[0].result;
};

/**
 * 레드마인에 일감 창 열고 내용 등록하기
 * @param {string} title 레드마인 일감 제목
 * @param {string} content 레드마인 일감 내용
 */
const writeRedmineIssue = async (title, content) => {
    const redmineUrl = await getRedmineUrl();

    chrome.tabs.create({
        url: redmineUrl + "/issues/new"
    })
    .then((tab) => {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            func: (title, content) => {
                const redmineTitle = document.getElementById("issue_subject");
                const redmineContent = document.getElementById("issue_description");

                alert(1);
                redmineTitle.value = title;
                redmineContent.value = content;
            },
            args: [title, content]
        });
    })
    .catch((e) => {
        alert("레드마인 내용 등록 중 에러 발생: " + e);
        console.error(e);
    });
};