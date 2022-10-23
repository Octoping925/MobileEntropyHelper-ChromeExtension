/**
 * 레드마인 로그인
 * @param {string} id 레드마인 아이디
 * @param {string} password 레드마인 비밀번호
 */
 const loginRedmine = (id, password) => {
    try {
        document.getElementById("username").value = id;
        document.getElementById("password").value = password;
        document.getElementById("login-submit").click();
    }
    catch (e) {
        alert("로그인 실패: " + e);
    }
}

/**
 * chrome.storage.local에서 데이터 가져오기
 */
const getOptionData = async () => {
    const optionData = await chrome.storage.local.get();
    return optionData;
};

const login = async () => {
    const optionData = await getOptionData();
    const {redmineId, redminePw, redmineAutoLogin} = optionData;

    if(redmineAutoLogin) {
        loginRedmine(redmineId, redminePw);
    }
}

login();