if(window.name === 'zhipin'){
    window.addEventListener('load',function(){
        let login = function(){
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
        setTimeout(login,1000)
        
        let job = function(){
            let sendMessage = function(){
                let data = []
                for(let item of getJobList()){
                    let arr = Array.from(item.querySelectorAll('.job-name,.job-area,h3.company-name a,.salary,.salary ~ .tag-list li,.company-tag-list li,.job-card-footer .tag-list li,.info-desc'),v=>v.innerText)
                    data.push(arr)
                }
                chrome.runtime.sendMessage({type:'job',from:'zhipin',data})
            }
            observeJobList('div.search-job-result',sendMessage)
            sendMessage()
        }
        setTimeout(job,1000)
        
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'search'){
            let input = document.querySelector('input[name="query"].ipt-search') || document.querySelector('input[placeholder].input')

            input.value = message.data.search
            input.dispatchEvent(new Event('input',{bubbles:true,cancelable:true}))
            input.dispatchEvent(new KeyboardEvent('keydown',{keyCode:13,key:'Enter',code:'Enter',cancelable:true,bubbles:true}))
        }
    })
    chrome.runtime.onMessage.addListener((message)=>{
        if(message.from !== 'home'){
            return
        }
        if(message.type === 'job' && message.data?.click?.target === 'zhipin'){
            let mutation = new MutationObserver((records,mutation)=>{
                let arr = Array.from(records[0].addedNodes[0].querySelectorAll('.header-info .title,.intro,.desc'),v=>{
                    if(/·/.test(v.innerText)){
                        return v.innerText.slice(0,v.innerText.indexOf('·'))
                    }
                    return v.innerText
                })
                chrome.runtime.sendMessage({type:'desc',from:'zhipin',data:arr})
                mutation.disconnect()
                document.getElementsByClassName('job-title')[Number(message.data.click.index)].dispatchEvent(new MouseEvent('mouseleave'))
            })
            mutation.observe(document.getElementsByClassName('job-card-left')[Number(message.data.click.index)],{childList:true})
            document.getElementsByClassName('job-title')[Number(message.data.click.index)].dispatchEvent(new MouseEvent('mouseenter'))
        }
    })
}