if(/^lagou/.test(window.name)){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.querySelector('li.user_dropdown')
            if(el !== null){
                let src = document.querySelector('link[rel="Shortcut Icon"]').href
                let message = {
                    type: 'website',
                    from: /^lagou/.exec(window.name)[0],
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(document.querySelector('a.login') !== null){
                let message = {
                    type: 'website',
                    from: /^lagou/.exec(window.name)[0],
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
            let input = document.querySelector('input#search_input') || document.querySelector('input.search-input__1smvz')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))

            let button = document.querySelector('input#search_button')
            if(button !== null){//如果是首页，则点击按钮，招聘信息通过onload中的逻辑获取。
                button.click()
            }
            //如果不是搜索页，则触发Enter事件，等待内容刷新后通过callback获取。
            input.dispatchEvent(new KeyboardEvent('keydown',{keyCode:13,key:'Enter',code:'Enter',cancelable:true,bubbles:true}))
            callback([input.value,'lagou'])
        }
    })
}