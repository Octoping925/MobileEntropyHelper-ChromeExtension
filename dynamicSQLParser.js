document.getElementById("parseBtn").addEventListener("click", e => {
    const dynamicSQL = document.getElementById("dynamicSQLInput").value;
    const parsedSQL = document.getElementById("parsedSQLInput");

    const textList = dynamicSQL.split("\n");

    textList.forEach(text => {
        parsedSQL.value += parse(text) + '\n';
    });
});

function parse(text) {
    let resultStr = "";
    if(!text.includes("'") || !text.includes(';')) return resultStr;

    const startIdx = text.indexOf("'");
    const endIdx = text.indexOf(";");

    if(text.substring(0, startIdx).includes('--')) return resultStr;

    const substrText = text.substring(startIdx, endIdx).replaceAll("CHR(39)", "''''");

    let inStr = false;

    for(let i = 0; i < substrText.length - 1; ++i) {
        switch(substrText[i]) {
            case "'":
                if(inStr) {
                    if(substrText[i + 1] == "'") {
                       resultStr += substrText[i++]; 
                    }
                    else inStr = false;
                }
                else inStr = true;
                break;

            case '|':
            case ' ':
                if(inStr) resultStr += substrText[i];
                break;
            
            case '-':
                if(inStr) resultStr += substrText[i];
                else if(substrText[i+1] == '-') {
                    return resultStr;
                }
                break;

            default:
                resultStr += substrText[i];
                break;
        }
    }

    return resultStr;
}