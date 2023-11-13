if(window.name === 'zhaopin'){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.querySelector('span.name-info-normal')
            if(el !== null){
                let src = document.querySelector('link[rel="shortcut icon"]').href
                let message = {
                    type: 'website',
                    from: window.name,
                    data: new Data('img',{src})
                }
                chrome.runtime.sendMessage(message)
            }else if(document.querySelector('div.zppp.zppp-wrapper.zppp-wrapper-normal') !== null){
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
            let input = document.querySelector('input#search_input_one')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))

            let button = document.querySelector('span.search_btn')
            if(button !== null){
                button.click()
            }
            //智联招聘点击首页搜素按钮不会重定向，通过callback()传递信息即可。
            let data = []
            for(let item of getJobList()){
                let arr = item.innerText.split(/\s/)
                data.push(arr)
            }
            console.log(data)
            callback({type:'job',from:'zhilian',data})
        }
    })
}