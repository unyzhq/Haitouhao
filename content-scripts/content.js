(function(){
    let web = ['zhipin','liepin','lagou','51job','zhaopin']
    for(let w of web){
        let reg = new RegExp(`^${w}`)
        if(reg.test(window.name)){//如果是通过拓展打开的，则停止。
            return
        }
    }
    //将url匹配但不是通过拓展打开的标签页排除，添加监听但返回-1.
    chrome.runtime.onMessage.addListener((message,sender,callback)=>{
        if(message.from !== 'home'){
            return
        }
        callback(-1)
    })
})()