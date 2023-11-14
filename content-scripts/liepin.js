if(window.name === 'liepin'){
    window.addEventListener('load',function(){
        let func = function(){
            let el = document.getElementById('header-quick-menu-user-info')
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

        let job = function(){
            let sendMessage = function(){
                let data = []
                for(let item of getJobList()){
                    let arr = Array.from(item.querySelectorAll('div[title],div.job-dq-box span,span.job-salary,div.job-labels-box span,img.company-logo-white-bg,span.company-name,div.company-tags-box span'),(v=>{
                        if(v.nodeName === 'img'){
                            return ''
                        }
                        return v.innerText
                    }))
                    arr.splice(0,4, arr[0] + '【' + arr[2] + '】')
                    data.push(arr)
                }
                chrome.runtime.sendMessage({type:'job',from:'liepin',data})
            }
            observeJobList('section.content-left-section',sendMessage)
            sendMessage()
        }
        setTimeout(job,1000)
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type = 'search'){
            let input = document.querySelector('input.jsx-4146333934')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))
            input.dispatchEvent(new KeyboardEvent('keydown',{keyCode:13,key:'Enter',code:'Enter',cancelable:true,bubbles:true}))
        }
    })
}