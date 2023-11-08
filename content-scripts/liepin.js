if(window.name === 'liepin'){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.querySelector('div.jsx-2303460082.aside-photo')
            console.log(el)
            if(el !== null){
                let src = el.getElementsByTagName('img')[0].src
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(document.querySelector('button.ant-btn.ant-btn-primary.ant-btn-round.ant-btn-lg.login-submit-btn') !== null){
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
            let input = document.querySelector('input.jsx-4146333934')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))

            let button = document.querySelector('span.jsx-4146333934.search-btn')
            if(button !== null){//如果是首页，则点击按钮，招聘信息通过onload中的逻辑获取。
                button.click()
            }
            callback([input.value,'liepin'])
        }
    })
}