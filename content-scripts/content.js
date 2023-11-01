window.onload = ()=>{

}
//request sendMessage参数二(传递对象) sendResponse sendMessage参数三(回调函数)
chrome.runtime.onMessage.addListener((request,sender,sendResponse)=>{
    let obj = {title:document.title}
    console.log(obj,obj.toString())
    sendResponse(obj.keys()[0] + " : ",obj.title)
})