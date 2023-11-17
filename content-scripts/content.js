console.log(chrome.extension.getBackgroundPage())
// window.addEventListener('load',function(){
//     console.log(window.__proxy__)
//     let script = document.createElement('script')
//     script.setAttribute('id','__proxy__')
//     script.appendChild(document.createTextNode(`if(!window.__proxy__){
//         console.log('正在代理中')
//         let proxy = function(){
//             var win = window.open(window.location.href,'_blank')
//             win.open = new Proxy(win.open,{//代理window.open 拦截打开页面的操作，同时将url发送给拓展后台。
//                 apply(target,thisArg,...argumentsList){
//                     chrome.runtime.sendMessage({type:'open',from:/(?<=\.)\w+(?=\.)/.exec(window.location)[0],data:argumentsList[0]})
//                     return
//                 }
//             })
//             win.__proxy__ = true
//             win.name = window.name
//             //window.close()
//         }
//         let retry = function(){
//             if(!window.location.href){
//                 setTimeout(retry,1000)
//             }else{
//                 proxy()
//             }
//         }
//         setTimeout(retry,1000)
//     }`))
//     document.body.appendChild(script)
// });
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