window.onload = ()=>{
    let url = chrome.runtime.getURL("../../background/background.html")
    window.open(url,"_blank")
}