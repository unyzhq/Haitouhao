if(window.name === 'zhipin'){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.querySelector('li.nav-figure')
            if(el !== null){
                let src = el.getElementsByTagName('img')[0].src
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(window.location.href === 'https://www.zhipin.com/web/user/?ka=header-login'){
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data(new Data('signout',true))
                }
                chrome.runtime.sendMessage(message)
            }
        }
        setTimeout(func,1000)
    })
    chrome.runtime.onMessage.addListener((message,sender,callback)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type = 'search'){
            let input = document.querySelector('input[name="query"].ipt-search') || document.querySelector('input[placeholder].input')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))

            let button = document.querySelector('button.btn.btn-search')
            if(button !== null){//如果是首页，则点击按钮，招聘信息通过onload中的逻辑获取。
                button.click()
            }
            //如果不是搜索页，则触发Enter事件，等待内容刷新后通过callback获取。
            input.dispatchEvent(new KeyboardEvent('keydown',{keyCode:13,key:'Enter',code:'Enter',cancelable:true,bubbles:true}))
            callback([input.value,'zhipin'])
        }
    })
}