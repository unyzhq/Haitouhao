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
        if(message.type === 'search'){
            let input = document.querySelector('input.jsx-4146333934')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))
            input.dispatchEvent(new KeyboardEvent('keydown',{keyCode:13,key:'Enter',code:'Enter',cancelable:true,bubbles:true}))
        }
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'job' && message.data?.click?.target === 'liepin'){
            chrome.runtime.sendMessage({type:'open',from:'liepin',data:getJobList()[message.data.click.index].querySelector('a[href]').href})
        }
    })
}else if(/^https:\/\/www.liepin.com\//.test(window.location.href)){
    window.addEventListener('load',function(){
        let func = function(){
            let message = {
                type:'desc',
                from:'liepin',
                data:Array.from(document.querySelectorAll('span[class="name ellipsis-1"],span[class="salary"],div[class="job-properties"] span:first-child,dd[data-selector="job-intro-content"],div[class="name ellipsis-1"]'),v=>v.innerText)
            }
            chrome.runtime.sendMessage(message)
        }
        setTimeout(func,1000)
    })
    window.__close__ = Symbol()
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'close' && window.__close__){
            window.close()
        }
    })
}

/*
Array.from(document.querySelectorAll('span[class="name ellipsis-1"],span[class="salary"],div[class="job-properties"] span:first-child,dd[data-selector="job-intro-content"],div[class="name ellipsis-1"]'),v=>v.innerText)
(5) ['JAVA/前端/测试开发实习生', '2-2k', '深圳-龙岗区', '1、现在招收：Java，前端开发，测试（开发）工程师岗位(2021/2022届)，可以转正；\n2、2…；\n\n说明:\n1.现在招收 JAVA实习生4名，测试2名。\n2.可提供住宿（公寓宿舍），名额有限。', '深圳思特顺科技有限公司']
*/