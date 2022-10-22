window.onload = function() {
    displayOptionData();
}

const displayOptionData = () => {
    const inputList = document.querySelectorAll("input");

    inputList.forEach(inputs => {
        const id = inputs.id;
        chrome.storage.local.get(id, data => {
            switch(inputs.type) {
                case "text":
                    inputs.value = data[id];
                    break;
                case "checkbox":
                    inputs.checked = data[id];
                    break;
                default:
                    alert("error on displayOptionData");
                    break;
            }
        });
    });
};

document.getElementById("saveBtn").addEventListener("click", (e) => {
    const optionData = {};
    const inputList = document.querySelectorAll("input");

    inputList.forEach(inputs => {
        const id = inputs.id;
        let value;
        switch(inputs.type) {
            case "text":
                value = inputs.value;
                break;
            case "checkbox":
                value = inputs.checked;
                break;
            default:
                alert("error on saveBtnOnClick");
                break;
        }

        optionData[id] = value;
    });
    
    chrome.storage.local.set(optionData, () => alert('저장 완료'));
});

document.getElementById("debug").addEventListener("click", (e) => {
    chrome.storage.local.get('redmineUrl', data => console.log(data));
});