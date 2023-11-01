function createRemoteClick(fn,type,callback){
    return function(){
        try{
            chrome.tabs.query({},function(tabs){
                for(let tab of tabs){
                    chrome.tabs.sendMessage(tab.id,type,callback)
                }
            })
            fn()
        }catch(err){
            console.log(err)
        }
    }
}

// window.onload = ()=>{
//     let button = document.createElement("button")
//     button.appendChild(document.createTextNode("click times: "))
//     button.style.setProperty("width","100%")
//     button.style.setProperty("height","30px")
//     button.style.setProperty("background-color","aqua")
//     button.addEventListener("click",createRemoteClick(()=>{},{select:true,text:"Web前端"},function(t){
//         console.log(t)
//         let text = button.firstChild
//         button.innerText = text.substringData(0,12) + (Number(text.substringData(12,text.length)) + 1)
//     }))
//     document.body.appendChild(button)
// }